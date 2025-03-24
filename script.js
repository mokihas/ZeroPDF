// File upload and tool selection logic
document.getElementById('uploadBtn').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    alert(`File selected: ${file.name}`);
    // Add logic to process the file
  }
});

const toolCards = document.querySelectorAll('.tool-card');
toolCards.forEach(card => {
  card.addEventListener('click', () => {
    const tool = card.getAttribute('data-tool');
    alert(`Selected tool: ${tool}`);
    // Add logic to handle the selected tool
  });
});
// Toggle Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
