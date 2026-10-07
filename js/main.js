/* ==========================================================================
   THASNI S - PORTFOLIO INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initHeaderScroll();
  initTypingEffect();
  initSkillObserver();
  initProjectModals();
  initResumeModal();
  initCertModal();
  initProjectFilters();
  initCopyToClipboard();
  initContactForm();
  initMobileMenu();
});

/* --- Ambient Particle Background Canvas --- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 45);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '#10b981' : '#8b5cf6';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* --- Navigation Scroll Glass Effect --- */
function initHeaderScroll() {
  const header = document.querySelector('.header-nav');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- Rotating Typing Animation --- */
function initTypingEffect() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  const roles = [
    'Python Full Stack Developer',
    'FastAPI & Next.js Specialist',
    'AI & OCR Integration Engineer',
    'RESTful API & Database Developer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 70;
  const erasingDelay = 40;
  const newRoleDelay = 2200;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, newRoleDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? erasingDelay : typingDelay);
    }
  }

  type();
}

/* --- Animated Skill Bars Observer --- */
function initSkillObserver() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth;
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* --- Project Details Modal Data & Controller --- */
const projectDetailsData = {
  legaltech: {
    title: 'LegalTech Platform – Law Firm & Case Management System',
    category: 'LegalTech / Enterprise Web App',
    technologies: ['Python', 'FastAPI', 'Next.js 16', 'React 19', 'MySQL', 'SQLAlchemy', 'Alembic', 'JWT', 'Google Gemini AI', 'RapidOCR', 'OpenCV', 'Razorpay', 'WebSockets', 'Docker'],
    overview: 'Full-stack legal practice management platform engineered using FastAPI, Next.js 16, and SQLAlchemy, featuring e-Courts India API integration for CNR tracking and court schedule synchronization.',
    keyFeatures: [
      'Engineered a full-stack legal practice management platform using FastAPI, Next.js 16, and SQLAlchemy, integrating e-Courts India APIs for CNR tracking and court schedule synchronization.',
      'Integrated Google Gemini AI, RapidOCR, PyTesseract, and OpenCV, reducing document processing time by 75%.',
      'Implemented robust JWT authentication, role-based access control (RBAC), and WebSocket real-time messaging.',
      'Integrated Razorpay payments with 99.9% billing accuracy, automated invoice generation, Google Calendar synchronization, and Docker deployment.'
    ]
  },
  parking: {
    title: 'Parking and E-Dine Portal',
    category: 'Hospitality / E-Dine Portal',
    technologies: ['Python', 'Django', 'React.js', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    overview: 'Full-stack hotel and restaurant web portal enabling customers to explore hotels, facilities, and food menus through an intuitive user interface.',
    keyFeatures: [
      'Developed a full-stack hotel and restaurant web portal enabling customers to explore hotels, facilities, and food menus through an intuitive user interface.',
      'Implemented online table reservations with real-time booking management.',
      'Integrated real-time valet parking availability tracking for customer convenience.',
      'Built a food pre-ordering module to reduce waiting time and improve dining experience.'
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const detailBtns = document.querySelectorAll('.btn-details');

  if (!modalOverlay) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsData[projectId];
      if (data) {
        openModal(data);
      }
    });
  });

  function openModal(data) {
    document.getElementById('modal-header-tag').textContent = data.category;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-overview').textContent = data.overview;

    // Render Tech Tags
    const techContainer = document.getElementById('modal-tech-stack');
    techContainer.innerHTML = '';
    data.technologies.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    // Render Bullet Points
    const bulletsContainer = document.getElementById('modal-bullets');
    bulletsContainer.innerHTML = '';
    data.keyFeatures.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      bulletsContainer.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- Project Category Filter --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- Copy to Clipboard & Toast Notifications --- */
function initCopyToClipboard() {
  const copyBtns = document.querySelectorAll('.btn-copy');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* --- Interactive Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;

    showToast(`Thank you ${name}! Your message has been sent successfully.`);
    form.reset();
  });
}

/* --- Mobile Menu Drawer Toggle --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = 'var(--nav-height)';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(7, 10, 18, 0.95)';
      navLinks.style.padding = '24px';
      navLinks.style.borderBottom = '1px solid var(--border-color)';
    }
  });
}

/* --- Interactive Resume Modal Controller --- */
function initResumeModal() {
  const modalOverlay = document.getElementById('resume-modal');
  const modalClose = document.getElementById('resume-modal-close');
  const printBtn = document.getElementById('print-resume-btn');
  const triggerBtns = [
    document.getElementById('view-resume-nav'),
    document.getElementById('view-resume-btn'),
    document.getElementById('view-resume-hero')
  ];

  if (!modalOverlay) return;

  triggerBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- Certificate Lightbox Modal Controller --- */
function initCertModal() {
  const modalOverlay = document.getElementById('cert-modal');
  const modalClose = document.getElementById('cert-modal-close');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const certBtns = document.querySelectorAll('.btn-cert-view, .cert-img');

  if (!modalOverlay) return;

  certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-cert') || btn.getAttribute('src');
      const title = btn.getAttribute('data-title') || 'Certificate View';
      if (src) {
        modalImg.src = src;
        modalTitle.textContent = title;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
