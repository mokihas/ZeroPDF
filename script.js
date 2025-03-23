function uploadPDF() {
    const fileInput = document.getElementById('pdfUpload');
    const statusText = document.getElementById('status');
    
    if (fileInput.files.length === 0) {
        statusText.innerText = 'Please select a PDF file.';
        return;
    }
    
    const file = fileInput.files[0];
    statusText.innerText = `Uploading: ${file.name}...`;
    
    setTimeout(() => {
        statusText.innerText = 'Upload successful!';
    }, 2000);
}
