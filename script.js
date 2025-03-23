// Initialize Supabase
const SUPABASE_URL = "https://iqearuedtjsmgbuihiuh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZWFydWVkdGpzbWdidWloaXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MTQzNjAsImV4cCI6MjA1ODI5MDM2MH0.mT4Tuu8jIo16QDEx6xI0sE7RVgED3dlCsToJacCY6HU";
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Select elements from the DOM
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const fileList = document.getElementById("fileList");

// Upload PDF to Supabase Storage
async function uploadPDF() {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage.from("pdf-files").upload(fileName, file);

    if (error) {
        console.error("Upload failed:", error.message);
        alert("Error uploading file. Please try again.");
    } else {
        alert("File uploaded successfully!");
        fetchFileList(); // Refresh file list
    }
}

// Fetch List of Files in Storage
async function fetchFileList() {
    const { data, error } = await supabase.storage.from("pdf-files").list();
    
    if (error) {
        console.error("Error fetching files:", error.message);
        return;
    }

    fileList.innerHTML = ""; // Clear previous list
    data.forEach(file => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${file.name} 
            <button onclick="downloadPDF('${file.name}')">Download</button>
        `;
        fileList.appendChild(listItem);
    });
}

// Download PDF from Supabase Storage
async function downloadPDF(fileName) {
    const { data, error } = await supabase.storage.from("pdf-files").getPublicUrl(fileName);
    
    if (error) {
        console.error("Error getting file URL:", error.message);
        alert("Error downloading file.");
    } else {
        window.open(data.publicUrl, "_blank");
    }
}

// Event Listener for Upload Button
uploadButton.addEventListener("click", uploadPDF);

// Fetch files on page load
fetchFileList();
