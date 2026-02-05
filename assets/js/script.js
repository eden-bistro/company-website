// ==============================
// MOBILE NAV TOGGLE
// ==============================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });
}

// ==============================
// SMOOTH SCROLL (INTERNAL LINKS)
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    if (mobileMenu?.classList.contains('show')) {
      mobileMenu.classList.remove('show');
    }
  });
});

// ==============================
// FADE-IN ANIMATION
// ==============================
const faders = document.querySelectorAll('section, .card, .skill-item, .feature');

const appearOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
);

faders.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  appearOnScroll.observe(el);
});

// ==============================
// STICKY HEADER EFFECT
// ==============================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    header.style.background = 'rgba(255,255,255,0.95)';
  } else {
    header.style.boxShadow = 'none';
    header.style.background =
      'linear-gradient(90deg,rgba(120,197,230,0.418),rgba(61,145,223,0.377))';
  }
});

// ==============================
// BACK TO TOP BUTTON
// ==============================
const backBtn = document.createElement('button');
backBtn.id = 'backToTop';
backBtn.textContent = '↑';

Object.assign(backBtn.style, {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  padding: '10px 14px',
  border: 'none',
  background: '#1f6feb',
  color: '#fff',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'none',
  zIndex: '999'
});

document.body.appendChild(backBtn);

window.addEventListener('scroll', () => {
  backBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==============================
// ACTIVE NAV LINK HIGHLIGHT
// ==============================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
});

// ==============================
// CONTACT FORM (VALIDATION ONLY)
// ==============================
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form && formMsg) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill all fields.';
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      formMsg.textContent = 'Please provide a valid email.';
      return;
    }

    // EmailJS integration goes here
    formMsg.textContent = 'Thanks — your message has been received (demo).';
    form.reset();
  });
}

// ==============================
// NEWSLETTER (DEMO)
// ==============================
const newsletter = document.getElementById('newsletter');

if (newsletter) {
  newsletter.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks for subscribing (demo).');
    newsletter.reset();
  });
}
