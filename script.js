document.getElementById("splitButton").addEventListener("click", async function () {
    const fileInput = document.getElementById("pdfFile");
    if (fileInput.files.length === 0) {
        alert("Please upload a PDF file.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function () {
        const pdfData = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        const splitType = document.getElementById("splitType").value;
        let pagesToExtract = [];

        if (splitType === "range") {
            const rangeInput = document.getElementById("rangeInput").value;
            const [start, end] = rangeInput.split("-").map(Number);
            for (let i = start; i <= end; i++) pagesToExtract.push(i);
        } else if (splitType === "specific") {
            pagesToExtract = document.getElementById("specificPages").value.split(",").map(Number);
        } else if (splitType === "interval") {
            const interval = parseInt(document.getElementById("intervalInput").value);
            for (let i = 1; i <= pdf.numPages; i += interval) {
                pagesToExtract.push(i);
            }
        }

        if (pagesToExtract.length === 0) {
            alert("Invalid input. Please check your split options.");
            return;
        }

        const { PDFDocument } = PDFLib;
        const newPdfDoc = await PDFDocument.create();
        const copiedPages = await newPdfDoc.copyPages(pdf, pagesToExtract.map(p => p - 1));
        copiedPages.forEach(page => newPdfDoc.addPage(page));

        const newPdfBytes = await newPdfDoc.save();
        const blob = new Blob([newPdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "split_document.pdf";
        link.click();
    };
    reader.readAsArrayBuffer(file);
});
