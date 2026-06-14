/* ═══════════════════════════════════════
   UJJAWAL SAINI — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA  ← EDIT THIS
   ─────────────────────────────────────────────────────────────
   Each project is keyed by its YouTube video id.
   Tweak the writeups, code snippets and links to match reality:
     • blurb   — one line shown nowhere (kept for reference)
     • tech    — tech tags shown in the modal
     • body    — array of {h: heading, p: paragraph} case-study sections
     • code    — { lang: 'C#' | 'Luau' | ..., text: `...` }  (optional)
     • links   — array of { label, url, primary? }  (optional)
   Replace any "#" link with a real GitHub repo / live demo URL.
   ───────────────────────────────────────────────────────────── */
const PROJECTS = {
  eNFfwNVrDO0: {
    title: 'Vehicle System',
    tech: ['Roblox Engine', 'Luau', 'Physics'],
    body: [
      { h: 'Overview', p: 'A fully physics-based vehicle controller with realistic acceleration, steering and a satisfying drift mechanic — not a fake tween, but actual constraint-driven physics.' },
      { h: 'The challenge', p: 'Keeping the car stable at high speed while still allowing controlled drifts meant carefully balancing grip, suspension and angular forces so it never felt floaty or out of control.' },
      { h: 'How I built it', p: 'I drove the wheels with VectorForce / AlignOrientation constraints, modelled per-wheel grip, and added a drift state that reduces lateral friction on input. The whole thing is modular so new vehicle types just plug in new tuning values.' },
    ],
    code: {
      lang: 'Luau',
      text: `-- Per-frame grip model: reduce lateral friction while drifting
local function applyGrip(chassis, isDrifting)
    local vel = chassis.AssemblyLinearVelocity
    local right = chassis.CFrame.RightVector
    local lateral = right:Dot(vel) * right

    local grip = isDrifting and DRIFT_GRIP or NORMAL_GRIP
    local counter = -lateral * grip * chassis.AssemblyMass
    chassis:ApplyImpulse(counter)
end`,
    },
    links: [
      { label: 'View Code', url: '#' },
    ],
  },

  qHz2qdRn9FQ: {
    title: 'HoverBoard Mechanics',
    tech: ['Roblox Engine', 'Luau', 'Physics'],
    body: [
      { h: 'Overview', p: 'Smooth hoverboard movement — the board floats above the ground, tilts into turns, and bobs naturally as the player rides.' },
      { h: 'The challenge', p: 'Hovering looks simple but feels terrible if the float is rigid. The trick was making the ride feel weightless and responsive without the board clipping into terrain or jittering.' },
      { h: 'How I built it', p: 'A raycast samples the ground height each frame and feeds a spring force that holds the board at a target hover height, with damping to kill oscillation. Tilt is driven by velocity so the board leans into movement.' },
    ],
    code: {
      lang: 'Luau',
      text: `-- Spring-damper that keeps the board floating at HOVER_HEIGHT
local hit = workspace:Raycast(board.Position, Vector3.new(0, -10, 0), params)
if hit then
    local distance = (board.Position - hit.Position).Y
    local offset   = HOVER_HEIGHT - distance
    local velocityY = board.AssemblyLinearVelocity.Y
    local force = (offset * STIFFNESS) - (velocityY * DAMPING)
    board:ApplyImpulse(Vector3.new(0, force * board.AssemblyMass, 0))
end`,
    },
    links: [
      { label: 'View Code', url: '#' },
    ],
  },

  FfcwRnzSwo4: {
    title: 'Math Game',
    tech: ['Unity Engine', 'C#', '2D'],
    body: [
      { h: 'Overview', p: 'A 2D math game with a twist: you <em>are</em> a number, and that number is your weight. Bigger number, heavier you — so you tip seesaws, hold down switches, and shove open doors just by existing. You grow and shrink by grabbing and dropping digits as you play. It\'s math you <em>feel</em>, not math you get quizzed on.' },
      { h: 'The challenge', p: 'The hard part was design, not code. Getting math to actually feel like a game took a ton of brainstorming and a lot of dead ends.' },
      { h: 'How I built it', p: 'Every mechanic — adders, springs, seesaws, weight gates — lives in its own prefab that just works the moment it touches the player. No central wiring. I could build levels by dragging prefabs into a scene and they\'d react on their own.' },
    ],
    links: [
      { label: 'View Code', url: 'https://github.com/ujsain/The-Journey-Of-Zero', primary: true },
    ],
  },

  'g_4jja5_s-A': {
    title: 'Knife Combat & AI',
    tech: ['Roblox Engine', 'Luau', 'State Machine', 'AI'],
    body: [
      { h: 'Overview', p: 'A knife combat system paired with AI bots that hunt, chase and attack the player — all driven by a clean finite state machine.' },
      { h: 'The challenge', p: 'Bots needed to feel deliberate, not twitchy: smoothly transitioning between patrolling, chasing and attacking without getting stuck or flip-flopping between states.' },
      { h: 'How I built it', p: 'Each bot runs a state machine (Idle → Patrol → Chase → Attack) with clear enter/update/exit hooks per state and transition guards based on distance and line of sight. Combat shares the same hitbox + cooldown logic the player uses, so behavior stays consistent.' },
    ],
    code: {
      lang: 'Luau',
      text: `-- Minimal FSM driving each bot
local Bot = {}
Bot.__index = Bot

function Bot:setState(name)
    if self.state == name then return end
    if self.states[self.state] then self.states[self.state].exit(self) end
    self.state = name
    self.states[name].enter(self)
end

function Bot:update(dt)
    self.states[self.state].update(self, dt)
end`,
    },
    links: [
      { label: 'View Code', url: '#' },
    ],
  },

  _XRBRZ4g_vA: {
    title: 'Mobile Game UI',
    tech: ['Unity Engine', 'C#', 'UI/UX'],
    body: [
      { h: 'Overview', p: 'A complete UI for a mobile game in Unity — menus, transitions and reusable components, all written from scratch.' },
      { h: 'The challenge', p: 'Mobile UI has to be snappy and readable on small screens, animate smoothly, and stay maintainable as new screens get added. Hard-coding each screen would have become unmanageable fast.' },
      { h: 'How I built it', p: 'I built a small framework of reusable components (buttons, panels, popups) plus a tween/animation module that any screen can call. A simple UI manager handles showing, hiding and stacking screens so flows stay consistent.' },
    ],
    links: [],
  },

  '01Fkofs51dQ': {
    title: 'Snake Game + RL AI',
    tech: ['Unity Engine', 'C#', 'Reinforcement Learning', 'ML-Agents'],
    body: [
      { h: 'Overview', p: 'A Snake game built in Unity, then turned into an AI playground. The snakes steer continuously (Slither.io-style, not the grid version), and I trained reinforcement-learning agents to drive them — chasing food, dodging walls, and avoiding each other in a shared arena.' },
      { h: 'The challenge', p: 'The agent never gets told where the food is. Each snake "sees" through 20 raycasts fanning out in front of it, each reporting what it\'s looking at — food, a wall, or a rival snake — and how far. Turning that raw vision into smart movement, with nothing but a single steering output and a sparse reward, was the hard part.' },
      { h: 'How I built it', p: 'Each snake observes its raycasts plus its own position, and acts through one continuous steer while always moving forward. Rewards are dead simple: +3 for eating, −2 for hitting a wall, −3 for crashing into another snake. I trained it with PPO in ML-Agents over a couple million steps, then exported to ONNX to run in-game. Several snakes share the arena and compete, so they learn to handle a board that\'s always moving — not a static one.' },
    ],
    links: [
      { label: 'View Code', url: 'https://github.com/ujsain/SnakeGame', primary: true },
    ],
  },

  fpLVqa5t63E: {
    title: 'Knockout Mechanics',
    tech: ['Roblox Engine', 'Luau', 'Physics'],
    body: [
      { h: 'Overview', p: 'A recreation of the core mechanics from the popular Knockout game — solid physics, arrow/aim mechanics and satisfying rotation, all built with clean, modular code.' },
      { h: 'The challenge', p: 'Getting the launch and knockback to feel powerful and fair at the same time, with rotation and arc that read clearly to the player as they aim.' },
      { h: 'How I built it', p: 'Aiming maps input to a launch vector with a visualized arrow, and impacts apply impulse + angular velocity scaled by charge. Each mechanic lives in its own module so they can be reused or swapped independently.' },
    ],
    code: {
      lang: 'Luau',
      text: `-- Charged launch: impulse + spin scale with how long you held
local function launch(target, direction, charge)
    local power = math.clamp(charge, MIN_POWER, MAX_POWER)
    target:ApplyImpulse(direction.Unit * power * target.AssemblyMass)
    target:ApplyAngularImpulse(Vector3.new(0, power * SPIN, 0))
end`,
    },
    links: [
      { label: 'View Code', url: '#' },
    ],
  },

  kUziMj68Og0: {
    title: 'Cyberpunk UI',
    tech: ['Roblox Engine', 'Lua', 'UI/UX'],
    body: [
      { h: 'Overview', p: 'Effect-heavy UI work for a cyberpunk-styled game — glitches, scanlines and neon accents that sell an immersive, high-tech atmosphere.' },
      { h: 'The challenge', p: 'Layering lots of visual effects while keeping the interface readable and performant. Also got to know about several Roblox engine constraints compared to Unity.' },
      { h: 'How I built it', p: 'I built this the agentic way — used Opus 4.5 to lay out about 80% of the UI, then did the polishing and the creative touches myself to make it more visually appealing.' },
    ],
    links: [],
  },

  '2lh-PS8I5L4': {
    title: 'Skydiving',
    tech: ['Roblox Engine', 'Luau', 'Physics'],
    body: [
      { h: 'Overview', p: 'A Roblox skydiving game. You board a plane, jump out, fly your body through ring gates on the way down, then pop a glider to land on the podium.' },
      { h: 'The challenge', p: 'Free-fall needed to feel fast and heavy but still fully steerable, and going from free-fall into the glider had to feel smooth, not snap. Tricky part: Roblox keeps resetting your velocity every frame, so I had to take flight off the engine and run it myself.' },
      { h: 'How I built it', p: 'Two custom controllers — one for free-fall, one for the glider — sharing the same body-tilt so the switch looks seamless. Each writes velocity directly every frame: gravity-ish fall ramping to a capped speed, WASD to steer. Opening the glider hands control over, clamps your fall, pops you up a little, and pushes you sideways through CFrame so the engine can\'t fight it. New gliders are just a config — fall speed, tilt, wind — no new code.' },
    ],
    links: [
      { label: 'View Code', url: 'https://github.com/ujsain/SkyDiving', primary: true },
    ],
  },

  '8fWLdfKFmJY': {
    title: 'Fighting Game',
    tech: ['Unity Engine', 'C#', 'Combat'],
    body: [
      { h: 'Overview', p: 'A 1v1 fighting game where you take on an AI opponent. Both fighters move on a single plane (like a classic side-on fighter). You\'ve got punch and kick combos, block, crouch, jump, and a special projectile attack.' },
      { h: 'The challenge', p: 'Getting combat to feel good. Hits need to land reliably, combos need to chain when you time them right, and getting hit shouldn\'t lock you in place forever. Most of the work was tuning these small things.' },
      { h: 'How I built it', p: 'Everything runs on a state machine, both the player and the enemy AI. Each attack is its own state, and combos chain by jumping to the next attack if you press again inside the combo window. Hit detection uses weapon colliders that turn on/off through animation events, so damage only happens during the actual swing. A small "already hit" list stops one swing from hitting twice. On a clean hit you get knockback, camera shake, and a hit effect. The enemy has its own state machine — it walks toward you, attacks when close, picks random attacks, and throws a projectile sometimes. The special attack slows time and desaturates the screen for a second before the projectile fires.' },
    ],
    links: [
      { label: 'View Code', url: 'https://github.com/ujsain/MFFightGame/tree/main', primary: true },
    ],
  },
};

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

// ─── Copy email to clipboard ───
function copyEmail(el) {
  navigator.clipboard.writeText('ujjsaini@gmail.com');
  const arrow = el.querySelector('.contact-link-arrow');
  const original = arrow.textContent;
  arrow.textContent = '✓';
  arrow.style.color = 'var(--accent-gold)';
  setTimeout(() => {
    arrow.textContent = original;
    arrow.style.color = '';
  }, 1800);
}

// ─── Scroll reveal animations ───
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

  if (cores < 4 || isMobile) return false;
  if (conn) {
    if (conn.saveData) return false;
    if (conn.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return false;
  }
  return true;
}

// Swap thumbnails for muted autoplay iframes on powerful devices
if (canAutoloadVideos()) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const thumb = entry.target;
        const card = thumb.closest('.project-card');
        const videoId = card.dataset.id;
        if (!videoId) return;

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

        card.classList.add('video-active');
        videoObserver.unobserve(thumb);
      }
    });
  }, { threshold: 0.1, rootMargin: '200px 0px' });

  document.querySelectorAll('.project-thumb').forEach(thumb => videoObserver.observe(thumb));
}

// ─── Project detail modal ───
const videoModal = document.getElementById('videoModal');
const modalPlayer = document.getElementById('modalPlayer');
const modalTitle = document.getElementById('modalTitle');
const modalTech = document.getElementById('modalTech');
const modalBody = document.getElementById('modalBody');
const modalCodeWrap = document.getElementById('modalCodeWrap');
const modalCodeLabel = document.getElementById('modalCodeLabel');
const modalCode = document.getElementById('modalCode');
const modalLinks = document.getElementById('modalLinks');
const modalScroll = videoModal.querySelector('.video-modal-scroll');

function openProject(id) {
  const data = PROJECTS[id];
  if (!data) return;

  // Title
  modalTitle.textContent = data.title;

  // Video
  modalPlayer.innerHTML = `<iframe
    src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>`;

  // Tech tags
  modalTech.innerHTML = (data.tech || [])
    .map(t => `<span class="vm-tech-tag">${t}</span>`)
    .join('');

  // Case-study body (allows inline <em> emphasis from the data)
  modalBody.innerHTML = (data.body || [])
    .map(s => `<div class="vm-section"><h4>${s.h}</h4><p>${s.p}</p></div>`)
    .join('');

  // Code snippet (optional)
  if (data.code && data.code.text) {
    modalCodeLabel.textContent = data.code.lang || 'Code';
    modalCode.textContent = data.code.text;
    modalCodeWrap.hidden = false;
  } else {
    modalCodeWrap.hidden = true;
  }

  // Links (optional) — drop unset placeholder ("#") links automatically
  const links = (data.links || []).filter(l => l.url && l.url !== '#');
  modalLinks.innerHTML = links
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="vm-link ${l.primary ? 'vm-link-primary' : ''}">${l.label}</a>`)
    .join('');
  modalLinks.style.display = links.length ? '' : 'none';

  // Reset scroll to top and open
  if (modalScroll) modalScroll.scrollTop = 0;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.id));

  // Add a "View Code" button to the card if the project has a real repo link
  const data = PROJECTS[card.dataset.id];
  const codeLink = (data && data.links || []).find(l => l.url && l.url !== '#');
  const actions = card.querySelector('.project-actions');
  if (codeLink && actions) {
    const a = document.createElement('a');
    a.href = codeLink.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'project-code-link';
    a.innerHTML = `<svg class="code-icon" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg><span>View Code</span>`;
    a.addEventListener('click', (e) => e.stopPropagation()); // don't open the modal
    actions.appendChild(a);
  }
});

function closeVideoModal() {
  videoModal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { modalPlayer.innerHTML = ''; }, 300);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});
