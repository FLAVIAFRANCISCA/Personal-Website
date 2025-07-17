// Matrix-style binary rain effect 
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height, columns, drops;
const binaryChars = ['0', '1'];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  columns = Math.floor(width / 20);
  drops = Array(columns).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0ff';
  ctx.font = '18px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
    ctx.fillText(text, i * 20, drops[i] * 20);

    if (drops[i] * 20 > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawMatrix();

// Contact Form Modal
function showModal(title, message) {
  const modal = document.getElementById('feedbackModal');
  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalDesc');
  const closeBtn = document.getElementById('modalCloseBtn');

  titleEl.textContent = title;
  descEl.textContent = message;
  modal.classList.add('active');

  closeBtn.onclick = () => modal.classList.remove('active');
  window.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };
}

// 🔧 Set backend URL explicitly
const backendURL = 'https://flavia-tsho-tsho.onrender.com';

// Contact form handling
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  try {
    const response = await fetch(`${backendURL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      showModal('Message Sent!', result.message || 'Thanks for reaching out!');
      form.reset();
    } else {
      throw new Error(result.message || 'Something went wrong');
    }
  } catch (err) {
    showModal('Oops! Something went wrong.', 'Please try again later or reach out via LinkedIn.');
  }
});

// Video Modal Logic
const demoButtons = document.querySelectorAll('.demo-btn');
const videoModal = document.getElementById('videoModal');
const projectVideo = document.getElementById('projectVideo');
const videoCloseBtn = document.getElementById('videoCloseBtn');

demoButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const videoSrc = card.getAttribute('data-video-src');
    projectVideo.src = videoSrc;
    videoModal.classList.add('show');
  });
});

videoCloseBtn.addEventListener('click', () => {
  videoModal.classList.remove('show');
  projectVideo.pause();
  projectVideo.currentTime = 0;
});

window.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove('show');
    projectVideo.pause();
    projectVideo.currentTime = 0;
  }
});
