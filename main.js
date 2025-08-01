const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blockSize = 80;
const textures = {};

const blocks = [
  'grass',
  'dirt',
  'stone',
  'wood',
  'cow'
];

// Load all textures
let loaded = 0;
blocks.forEach(block => {
  const img = new Image();
  img.src = `assets/${block}.png`;
  img.onload = () => {
    textures[block] = img;
    loaded++;
    if (loaded === blocks.length) {
      drawTestWorld();
    }
  };
  img.onerror = () => console.error(`❌ Failed to load ${block}.png`);
});

function drawTestWorld() {
  // Simple 5x5 block grid to test
  const layout = [
    ['grass', 'grass', 'grass', 'grass', 'grass'],
    ['dirt', 'dirt', 'stone', 'wood', 'cow'],
    ['stone', 'wood', 'cow', 'grass', 'dirt'],
    ['cow', 'cow', 'cow', 'cow', 'cow'],
    ['stone', 'stone', 'stone', 'stone', 'stone']
  ];

  for (let y = 0; y < layout.length; y++) {
    for (let x = 0; x < layout[y].length; x++) {
      const block = layout[y][x];
      ctx.drawImage(textures[block], x * blockSize, y * blockSize, blockSize, blockSize);
    }
  }
}
