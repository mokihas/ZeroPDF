document.getElementById('splitButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfInput');
    const startPage = parseInt(document.getElementById('startPage').value);
    const endPage = parseInt(document.getElementById('endPage').value);

    // Check if a file is selected
    if (!fileInput.files.length) {
        alert("Please select a PDF file.");
        return;
    }

    // Validate page range input
    if (isNaN(startPage) || isNaN(endPage) || startPage < 1 || endPage < 1 || startPage > endPage) {
        alert("Please enter a valid page range.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = async function (event) {
        const uint8Array = new Uint8Array(event.target.result);

        try {
            // Use pdf.js to load the PDF document
            const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
            const totalPages = pdf.numPages;

            if (startPage < 1 || endPage > totalPages) {
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

        } catch (error) {
            console.error("Error processing PDF:", error);
            alert("An error occurred while processing the PDF.");
        }
    };

    reader.readAsArrayBuffer(file);
});
