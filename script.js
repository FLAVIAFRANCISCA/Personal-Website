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

// Video Modal 
const demoButtons = document.querySelectorAll('.demo-btn');
const videoModal = document.getElementById('videoModal');
const projectVideo = document.getElementById('projectVideo');
const videoCloseBtn = document.getElementById('videoCloseBtn');

demoButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const videoSrc = card.getAttribute('data-video-src');
    projectVideo.src = videoSrc;
    videoModal.classList.add('active'); 
  });
});

videoCloseBtn.addEventListener('click', () => {
  videoModal.classList.remove('active');
  projectVideo.pause();
  projectVideo.currentTime = 0;
});

window.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    projectVideo.pause();
    projectVideo.currentTime = 0;
  }
});

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

// EmailJS Contact Form Submission
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const templateParams = {
    from_name: form.elements['from_name'].value.trim(),
    from_email: form.elements['from_email'].value.trim(),
    message: form.elements['message'].value.trim()
  };

  try {
    await emailjs.send('service_4fwfgzt', 'template_7upmncq', templateParams);

    await emailjs.send('service_4fwfgzt', 'template_kb3gwk4', {
      to_name: templateParams.from_name,
      to_email: templateParams.from_email
    });

    showModal('Message Sent!', 'Thank you for reaching out; I’ll get back to you soon!');
    form.reset();
  } catch (error) {
    console.error('EmailJS Error:', error);
    showModal('Oops! Something went wrong.', 'Please try again later or reach out via LinkedIn.');
  }
});
