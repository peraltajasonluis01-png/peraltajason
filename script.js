// Interactive features for Jason Peralta's GitHub Page

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const copyEmailCard = document.getElementById('copyEmailCard');
  const copyBadge = document.getElementById('copyBadge');
  const emailDisplay = document.getElementById('emailDisplay');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section scrollspy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });

  // Interactive Email Copy
  if (copyEmailCard && copyBadge) {
    const email = copyEmailCard.getAttribute('data-email');
    if (emailDisplay) {
      emailDisplay.textContent = email;
    }

    copyEmailCard.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyBadge.textContent = 'Copied!';
        copyBadge.style.background = 'rgba(52, 211, 153, 0.2)';
        copyBadge.style.color = '#34d399';

        setTimeout(() => {
          copyBadge.textContent = 'Click to Copy';
          copyBadge.style.background = 'rgba(56, 189, 248, 0.12)';
          copyBadge.style.color = 'var(--cyan-bright)';
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        window.location.href = `mailto:${email}`;
      }
    });
  }
});
