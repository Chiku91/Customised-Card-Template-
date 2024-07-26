document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const cardTemplateImg = document.getElementById('cardTemplate');

  // Set canvas size to match image dimensions
  canvas.width = cardTemplateImg.width;
  canvas.height = cardTemplateImg.height;

  let textProperties = {
      text: 'New Text',
      fontSize: 24,
      fontColor: '#000000',
      fontStyle: 'Arial',
      x: 50,
      y: 100
  };

  let history = [];
  let currentIndex = -1;

  // Function to draw text on canvas
  function drawText() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw card template image as background
      ctx.drawImage(cardTemplateImg, 0, 0);
      // Draw text on top
      ctx.font = `${textProperties.fontSize}px ${textProperties.fontStyle}`;
      ctx.fillStyle = textProperties.fontColor;
      ctx.fillText(textProperties.text, textProperties.x, textProperties.y);
  }

  // Initial draw
  drawText();

  // Add Text Button Event
  document.getElementById('addTextBtn').addEventListener('click', () => {
      const newText = prompt('Enter new text:');
      if (newText !== null) {
          history.push({ ...textProperties });
          currentIndex++;
          textProperties.text = newText;
          drawText();
          
          // Replace "new text" paragraph with user-entered text
          document.getElementById('newTextBtn').textContent = newText;
      }
  });

  // Undo Button Event
  document.getElementById('undoBtn').addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          textProperties = { ...history[currentIndex] };
          drawText();
          document.getElementById('newTextBtn').textContent = textProperties.text;
      }
  });

  // Redo Button Event
  document.getElementById('redoBtn').addEventListener('click', () => {
      if (currentIndex < history.length - 1) {
          currentIndex++;
          textProperties = { ...history[currentIndex] };
          drawText();
          document.getElementById('newTextBtn').textContent = textProperties.text;
      }
  });

  // Change Color Button Event
  document.getElementById('colorBtn').addEventListener('click', () => {
      const newColor = prompt('Enter new color (hex format):');
      if (newColor !== null) {
          history.push({ ...textProperties });
          currentIndex++;
          textProperties.fontColor = newColor;
          drawText();
      }
  });

  // Font Style Dropdown Event
  document.getElementById('fontStyleDropdown').addEventListener('change', () => {
      history.push({ ...textProperties });
      currentIndex++;
      textProperties.fontStyle = document.getElementById('fontStyleDropdown').value;
      drawText();
  });

  // Font Size Dropdown Event
  document.getElementById('fontSizeDropdown').addEventListener('change', () => {
      history.push({ ...textProperties });
      currentIndex++;
      textProperties.fontSize = parseInt(document.getElementById('fontSizeDropdown').value, 10);
      drawText();
  });
});
