document.getElementById('splitButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfInput');
    const startPage = parseInt(document.getElementById('startPage').value);
    const endPage = parseInt(document.getElementById('endPage').value);

    if (!fileInput.files.length) {
        alert("Please select a PDF file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async function (event) {
        const uint8Array = new Uint8Array(event.target.result);

        // Use pdf.js to load the PDF document
        const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
        const totalPages = pdf.numPages;

        if (startPage < 1 || endPage > totalPages || startPage > endPage) {
            alert("Invalid page range.");
            return;
        }

        const pdfDoc = await PDFLib.PDFDocument.create();
        
        // Copy the selected pages from the source PDF
        for (let i = startPage; i <= endPage; i++) {
            const [copiedPage] = await pdfDoc.copyPages(pdf, [i - 1]);
            pdfDoc.addPage(copiedPage);
        }

        // Save the new PDF document
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });

        // Create download link
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "split_pdf.pdf";
        downloadLink.style.display = "block";
        downloadLink.textContent = "Download Split PDF";
    };

    reader.readAsArrayBuffer(file);
});
