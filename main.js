import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';

function exportPdf(mode) {
    const cv = document.getElementById('cv');
    const isDark = mode === 'dark';

    document.body.classList.add('exporting');

    if (!isDark) {
        document.body.classList.add('printing');
    }

    const baseOpt = {
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: 0,
            backgroundColor: isDark ? '#0f0f13' : '#ffffff',
        },
    };

    let canvas;
    html2pdf()
        .set(baseOpt)
        .from(cv)
        .toCanvas()
        .get('canvas')
        .then(function (c) {
            canvas = c;
        })
        .then(function () {
            const pdf = new jsPDF('portrait', 'mm', 'a4');
            const pageWidth = 210;
            const pageHeight = 297;
            const bottomMargin = 6;
            const topPadNextPages = 10;

            const pxPerMm = canvas.width / pageWidth;
            const page1SliceH = (pageHeight - bottomMargin) * pxPerMm;
            const otherSliceH = (pageHeight - bottomMargin - topPadNextPages) * pxPerMm;

            const bgColor = isDark ? [15, 15, 19] : [255, 255, 255];

            let yPos = 0;
            let pageNum = 0;

            while (yPos < canvas.height) {
                if (pageNum > 0) pdf.addPage();
                pageNum++;

                pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                const isFirst = pageNum === 1;
                const maxSlice = isFirst ? page1SliceH : otherSliceH;
                const sliceH = Math.min(maxSlice, canvas.height - yPos);
                const yOffset = isFirst ? 0 : topPadNextPages;

                const strip = document.createElement('canvas');
                strip.width = canvas.width;
                strip.height = sliceH;
                const ctx = strip.getContext('2d');
                ctx.drawImage(canvas, 0, yPos, canvas.width, sliceH, 0, 0, canvas.width, sliceH);

                const imgData = strip.toDataURL('image/jpeg', 0.98);
                const imgHeightMm = sliceH / pxPerMm;

                pdf.addImage(imgData, 'JPEG', 0, yOffset, pageWidth + 0.5, imgHeightMm);

                yPos += sliceH;
            }

            const filename = isDark ? 'Dawid_Ferus_CV_dark.pdf' : 'Dawid_Ferus_CV.pdf';
            pdf.save(filename);

            document.body.classList.remove('exporting', 'printing');
        });
}

document.getElementById('export-light').addEventListener('click', () => exportPdf('light'));
document.getElementById('export-dark').addEventListener('click', () => exportPdf('dark'));
