// script.js

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle && navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({behavior: 'smooth'});
    }
    if(mobileMenu.classList.contains('show')){
      mobileMenu.classList.remove('show');
    }
  });
});

// Fade-in animations
const faders = document.querySelectorAll('section, .card, .skill-item, .feature');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = 'translateY(0px)';
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.style.opacity = 0;
  fader.style.transform = 'translateY(30px)';
  fader.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  appearOnScroll.observe(fader);
});

// Sticky header
const nav = document.querySelector('header');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50){
    nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    nav.style.position = 'sticky';
    nav.style.top = '0';
    nav.style.background = 'rgba(255,255,255,0.95)';
    nav.style.transition = 'background 0.3s ease, box-shadow 0.3s ease';
  } else {
    nav.style.boxShadow = 'none';
    nav.style.background = 'linear-gradient(90deg,rgba(120,197,230,0.418),rgba(61,145,223,0.377))';
  }
});

// Back-to-top button
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
backBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Highlight current section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if(window.scrollY >= sectionTop){
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === '#' + current){
      link.classList.add('active');
    }
  });
});

// Contact form
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form && form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){ formMsg.textContent = 'Please fill all fields.'; return; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ formMsg.textContent = 'Please provide a valid email.'; return; }
  formMsg.textContent = 'Thanks — your message has been received (demo).';
  form.reset();
});

// Newsletter demo
const news = document.getElementById('newsletter');
news && news.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks for subscribing (demo).');
  news.reset();
});

