/* ═══════════════════════════════════════
   USAIN — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════ */

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Mobile nav toggle ───
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('active');
}

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('active');
  });
});

// ─── Copy Discord handle to clipboard ───
function copyDiscord(el) {
  navigator.clipboard.writeText('us1piece');
  const copyText = el.querySelector('.discord-copy');
  copyText.textContent = 'Copied!';
  copyText.style.color = 'var(--accent)';
  setTimeout(() => {
    copyText.textContent = 'click to copy';
    copyText.style.color = '';
  }, 2000);
}

// ─── Scroll reveal animations ───
// Elements with class "reveal" fade in when they enter the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Animated stat counters ───
// Numbers count up when they scroll into view
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 30);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current + '+';
      }, 40);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(el => statObserver.observe(el));

// ─── Adaptive video loading ───
// Detect if device can handle inline video previews
function canAutoloadVideos() {
  const cores = navigator.hardwareConcurrency || 2;
  const conn = navigator.connection;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Need 4+ cores, not on mobile, and decent connection
  if (cores < 4 || isMobile) return false;
  if (conn) {
    // Skip on slow connections (2g, slow-2g, 3g) or data saver
    if (conn.saveData) return false;
    if (conn.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return false;
  }
  return true;
}

// Swap thumbnails for autoplay iframes on powerful devices
// Load them lazily — only when scrolled into view
if (canAutoloadVideos()) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const thumb = entry.target;
        const card = thumb.closest('.project-card');
        const videoId = card.dataset.video;
        if (!videoId) return;

        // Replace img + play button with muted autoplay iframe
        const img = thumb.querySelector('img');
        const play = thumb.querySelector('.project-play');
        if (img) img.remove();
        if (play) play.remove();

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('loading', 'lazy');
        thumb.appendChild(iframe);

        // Mark card as video-active (no play button needed)
        card.classList.add('video-active');

        videoObserver.unobserve(thumb);
      }
    });
  }, { threshold: 0.1, rootMargin: '200px 0px' });

  document.querySelectorAll('.project-thumb').forEach(thumb => videoObserver.observe(thumb));
}

// ─── Video lightbox modal ───
const videoModal = document.getElementById('videoModal');
const modalPlayer = document.getElementById('modalPlayer');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const videoId = card.dataset.video;
    if (!videoId) return;

    const title = card.querySelector('.project-info h3').textContent;
    const desc = card.querySelector('.project-info p').textContent;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    // Create fresh iframe each time
    modalPlayer.innerHTML = `<iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>`;

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeVideoModal() {
  videoModal.classList.remove('active');
  document.body.style.overflow = '';
  // Destroy iframe to stop video
  setTimeout(() => { modalPlayer.innerHTML = ''; }, 300);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});
