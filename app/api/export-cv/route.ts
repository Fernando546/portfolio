import { NextRequest, NextResponse } from "next/server";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { PDFDocument, rgb } from "pdf-lib";

// Convert hex color to pdf-lib rgb
function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return rgb(r, g, b);
}

// Vercel serverless function config
export const maxDuration = 30;

async function getBrowser() {
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        const executablePath = await chromium.executablePath();
        return puppeteerCore.launch({
            args: chromium.args,
            executablePath,
            headless: true,
        });
    } else {
        const possiblePaths = [
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
            process.env.CHROME_PATH || "",
        ].filter(Boolean);

        try {
            const puppeteer = await import("puppeteer");
            return puppeteer.default.launch({
                headless: true,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage",
                    "--font-render-hinting=none",
                ],
            });
        } catch {
            for (const chromePath of possiblePaths) {
                try {
                    return await puppeteerCore.launch({
                        headless: true,
                        executablePath: chromePath,
                        args: [
                            "--no-sandbox",
                            "--disable-setuid-sandbox",
                            "--disable-dev-shm-usage",
                            "--font-render-hinting=none",
                        ],
                    });
                } catch {
                    continue;
                }
            }
            throw new Error("No Chrome installation found. Install puppeteer or set CHROME_PATH.");
        }
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode") === "light" ? "light" : "dark";

    // Determine the base URL from the request
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    let browser;
    try {
        browser = await getBrowser();

        const page = await browser.newPage();
        await page.setViewport({ width: 900, height: 1200 });

        await page.goto(`${baseUrl}/cv`, {
            waitUntil: "networkidle0",
            timeout: 30000,
        });

        // Theme colors
        const bgColor = mode === "light" ? "#ffffff" : "#16161d";
        const leftColColor = mode === "light" ? "#ffffff" : "#16161d";
        const rightColColor = mode === "light" ? "#f8f9fa" : "#1c1c27";
        const headerGradient = mode === "light"
            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 140, 248, 0.04))"
            : "";

        await page.addStyleTag({
            content: `
                /* Hide custom cursor */
                *[style*="pointer-events: none"][style*="position: fixed"],
                *[style*="pointer-events:none"][style*="position:fixed"] {
                    display: none !important;
                }

                /* Page margins: none on page 1, top margin on page 2+ */
                @page { margin: 8mm 0 0 0; }
                @page :first { margin: 0; }

                html {
                    background-color: ${bgColor} !important;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }

                body {
                    background-color: ${bgColor} !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }

                .export-bar { display: none !important; }

                ${headerGradient ? `.cv-header { background: ${headerGradient} !important; }` : ""}
            `,
        });

        // Apply export mode and hide overlays
        await page.evaluate((themeMode: string) => {
            document.body.classList.add("exporting");
            if (themeMode === "light") {
                document.body.classList.add("printing");
            }

            // Hide fixed pointer-events-none elements (custom cursor)
            document.querySelectorAll("*").forEach((el) => {
                const style = window.getComputedStyle(el);
                if (
                    style.position === "fixed" &&
                    style.pointerEvents === "none" &&
                    el.tagName !== "STYLE" &&
                    el.tagName !== "LINK"
                ) {
                    (el as HTMLElement).style.display = "none";
                }
            });

            // Reset container styles
            const cv = document.getElementById("cv");
            if (cv) {
                cv.style.margin = "0";
                cv.style.borderRadius = "0";
                cv.style.border = "none";
                cv.style.boxShadow = "none";
                cv.style.maxWidth = "100%";
            }
        }, mode);

        // Get the grid column ratio from the rendered page
        const columnRatio = await page.evaluate(() => {
            const body = document.querySelector(".cv-body") as HTMLElement;
            if (!body) return 0.615;
            const cols = body.querySelectorAll(".cv-column");
            if (cols.length < 2) return 0.615;
            const leftWidth = (cols[0] as HTMLElement).getBoundingClientRect().width;
            const totalWidth = body.getBoundingClientRect().width;
            return leftWidth / totalWidth;
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "0", right: "0", bottom: "0", left: "0" },
            preferCSSPageSize: false,
        });

        await browser.close();
        browser = undefined;

        // Post-process PDF: paint colored rectangles over the white @page margins
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pages = pdfDoc.getPages();
        const marginMm = 8;
        const marginPt = marginMm * 2.8346; // mm to PDF points

        const leftColor = hexToRgb(leftColColor);
        const rightColor = hexToRgb(rightColColor);

        // Paint colored margin on page 2+
        for (let i = 1; i < pages.length; i++) {
            const pg = pages[i];
            const { width, height } = pg.getSize();
            const leftWidth = width * columnRatio;
            const rightWidth = width - leftWidth;

            pg.drawRectangle({
                x: 0,
                y: height - marginPt,
                width: leftWidth,
                height: marginPt,
                color: leftColor,
            });

            pg.drawRectangle({
                x: leftWidth,
                y: height - marginPt,
                width: rightWidth,
                height: marginPt,
                color: rightColor,
            });
        }

        const finalPdf = await pdfDoc.save();

        return new NextResponse(Buffer.from(finalPdf), {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="CV_Dawid_Ferus_${mode}.pdf"`,
            },
        });
    } catch (error) {
        if (browser) await browser.close();
        console.error("PDF generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}
