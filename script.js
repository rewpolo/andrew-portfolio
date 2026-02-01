const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const carouselControls = document.querySelectorAll('.carousel-control');

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
  themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  localStorage.setItem('theme', theme);
};

const initialTheme = localStorage.getItem('theme') || 'light';
setTheme(initialTheme);

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = newsletterForm.querySelector('.form-message');
  const emailInput = newsletterForm.querySelector('input[name="email"]');

  if (!emailInput.value) {
    message.textContent = 'Please enter a valid email address.';
    return;
  }

  message.textContent = `Thanks! We'll send updates to ${emailInput.value}.`;
  newsletterForm.reset();
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = contactForm.querySelector('.form-message');
  const data = new FormData(contactForm);

  if (!data.get('consent')) {
    message.textContent = 'Please provide consent so we can respond.';
    return;
  }

  message.textContent = `Thanks, ${data.get('name') || 'there'}! We'll be in touch soon.`;
  contactForm.reset();
});

let activeIndex = 0;
const showTestimonial = (index) => {
  testimonials.forEach((card, idx) => {
    card.classList.toggle('is-active', idx === index);
  });
};

carouselControls.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.dir;
    activeIndex = direction === 'next'
      ? (activeIndex + 1) % testimonials.length
      : (activeIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(activeIndex);
  });
});

setInterval(() => {
  activeIndex = (activeIndex + 1) % testimonials.length;
  showTestimonial(activeIndex);
}, 7000);
