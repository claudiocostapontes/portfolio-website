document.addEventListener('DOMContentLoaded', initPortfolio);

function initPortfolio() {
  // Dynamic CSS import (adjust path as needed)
  const cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = '../css/style.css'; // Assuming CSS path relative to js/main.js
  document.head.appendChild(cssLink);

  // Smooth scroll navigation
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Contact form event listener
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate form submission
      const formData = new FormData(contactForm);
      console.log('Form submitted:', Object.fromEntries(formData));
      alert('Thank you for your message! It has been sent.');
      contactForm.reset();
    });
  }

  // Scroll animations
  setupScrollAnimations();

  // Load and render dynamic sections (projects)
  loadProjects();
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

async function loadProjects() {
  try {
    const response = await fetch('../data/projects.json'); // Adjust path as needed
    if (!response.ok) throw new Error('Failed to fetch projects');
    const projects = await response.json();

    const container = document.querySelector('#projects .projects-container');
    if (container && projects.length > 0) {
      container.innerHTML = projects.map((project) => `
        <div class="project-card animate-on-scroll">
          <img src="${project.image}" alt="${project.name}" loading="lazy">
          <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank" rel="noopener">View Project</a>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading projects:', error);
    const container = document.querySelector('#projects .projects-container');
    if (container) {
      container.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>';
    }
  }
}