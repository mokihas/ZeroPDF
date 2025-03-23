document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("pdfInput");
    const uploadButton = document.getElementById("uploadButton");

    uploadButton.addEventListener("click", function () {
        if (fileInput.files.length === 0) {
            alert("Please select a PDF file to upload.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("pdfFile", file);

        // Simulate a file upload process (replace this with actual backend integration)
        alert(`File "${file.name}" uploaded successfully!`);
    });
});
