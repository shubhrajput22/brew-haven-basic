// Loading Screen
  window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.style.display = 'none', 800);
    }, 500); // Small delay to ensure smooth feel
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Menu tabs
  function showTab(id, btn) {
    document.querySelectorAll('.menu-grid').forEach(g => g.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  }

  // Mobile menu
  function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    document.getElementById('mobileNav').classList.remove('open');
    document.body.style.overflow = '';
  }

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Floating ambient aroma particles
  function createParticles() {
    const container = document.getElementById('particles');
    // Fewer particles for a cleaner, premium look
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      // Slower, varying durations for a floating steam effect
      p.style.animationDuration = (Math.random() * 15 + 15) + 's';
      p.style.animationDelay = (Math.random() * 15) + 's';
      // Larger, softer shapes
      const size = Math.random() * 40 + 20;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      container.appendChild(p);
    }
  }
  createParticles();

  // Form handler
  async function handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.btn-submit');
    const originalBtnHTML = btn.innerHTML;
    
    // Loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> &nbsp;Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    try {
      const formData = new FormData(form);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        // Success state
        btn.innerHTML = '✓ Message Sent! We\'ll be in touch.';
        btn.style.background = 'linear-gradient(135deg, #2D5A27, #1B3B17)';
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      // Error state
      btn.innerHTML = '✕ Failed to send. Please try again.';
      btn.style.background = 'linear-gradient(135deg, #D32F2F, #B71C1C)';
    }

    setTimeout(() => {
      btn.innerHTML = originalBtnHTML;
      btn.style.background = '';
      btn.style.opacity = '1';
      btn.disabled = false;
    }, 4000);
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.style.color = scrollPos >= top && scrollPos < bottom ? 'var(--brown)' : '';
      }
    });
  });