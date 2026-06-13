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
    tech: ['Roblox', 'Luau', 'Physics'],
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
      { label: 'Watch on YouTube', url: 'https://youtu.be/eNFfwNVrDO0', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  qHz2qdRn9FQ: {
    title: 'HoverBoard Mechanics',
    tech: ['Roblox', 'Luau', 'Physics'],
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
      { label: 'Watch on YouTube', url: 'https://youtu.be/qHz2qdRn9FQ', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  FfcwRnzSwo4: {
    title: 'Math Game',
    tech: ['Unity', 'C#', '2D'],
    body: [
      { h: 'Overview', p: 'A 2D educational math game built in Unity and C#. Players solve problems through gameplay rather than plain quizzes — I wanted learning to actually feel like a game.' },
      { h: 'The challenge', p: 'Making math engaging meant tying every question to a real mechanic and keeping difficulty adaptive so players stay in the sweet spot between bored and frustrated.' },
      { h: 'How I built it', p: 'A question generator scales difficulty based on the player\'s recent accuracy, and a clean event-driven UI reacts to answers with feedback and scoring. The content is data-driven, so new problem types are easy to add.' },
    ],
    code: {
      lang: 'C#',
      text: `// Adaptive difficulty: nudge the range based on recent accuracy
public Question NextQuestion(float recentAccuracy)
{
    if (recentAccuracy > 0.8f) _level++;
    else if (recentAccuracy < 0.4f) _level = Mathf.Max(1, _level - 1);

    int max = 5 * _level;
    int a = Random.Range(1, max), b = Random.Range(1, max);
    return new Question(a, b, a + b);
}`,
    },
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/FfcwRnzSwo4', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  'g_4jja5_s-A': {
    title: 'Knife Combat & AI',
    tech: ['Roblox', 'Luau', 'State Machine', 'AI'],
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
      { label: 'Watch on YouTube', url: 'https://youtu.be/g_4jja5_s-A', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  _XRBRZ4g_vA: {
    title: 'Mobile Game UI',
    tech: ['Unity', 'C#', 'UI/UX'],
    body: [
      { h: 'Overview', p: 'A complete UI for a mobile game in Unity — menus, transitions and reusable components, all written from scratch rather than dropped in from an asset pack.' },
      { h: 'The challenge', p: 'Mobile UI has to be snappy and readable on small screens, animate smoothly, and stay maintainable as new screens get added. Hard-coding each screen would have become unmanageable fast.' },
      { h: 'How I built it', p: 'I built a small framework of reusable components (buttons, panels, popups) plus a tween/animation module that any screen can call. A simple UI manager handles showing, hiding and stacking screens so flows stay consistent.' },
    ],
    code: {
      lang: 'C#',
      text: `// Reusable animated panel — any screen just calls Show()/Hide()
public class UIPanel : MonoBehaviour
{
    [SerializeField] float duration = 0.25f;

    public void Show() => StartCoroutine(Animate(0f, 1f, true));
    public void Hide() => StartCoroutine(Animate(1f, 0f, false));

    IEnumerator Animate(float from, float to, bool active)
    {
        if (active) gameObject.SetActive(true);
        for (float t = 0; t < duration; t += Time.deltaTime)
        {
            canvasGroup.alpha = Mathf.Lerp(from, to, t / duration);
            yield return null;
        }
        canvasGroup.alpha = to;
        if (!active) gameObject.SetActive(false);
    }
}`,
    },
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/_XRBRZ4g_vA', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  '01Fkofs51dQ': {
    title: 'Snake Game + RL AI',
    tech: ['Unity', 'C#', 'Reinforcement Learning', 'ML-Agents'],
    body: [
      { h: 'Overview', p: 'A classic Snake game rebuilt in Unity, then taken further: I trained reinforcement-learning agents to play it, learning to chase food and avoid killing themselves.' },
      { h: 'The challenge', p: 'The reward design is everything. Reward only eating, and the snake ignores survival; reward only survival, and it stalls forever. Getting an agent that actually plays well took careful shaping.' },
      { h: 'How I built it', p: 'The agent observes its surroundings and the food direction, and is rewarded for eating, lightly penalized over time to encourage efficiency, and heavily penalized for dying. Over many training episodes it learns genuinely competent play.' },
    ],
    code: {
      lang: 'C#',
      text: `// Reward shaping — the heart of the training loop
public override void OnActionReceived(ActionBuffers actions)
{
    Move(actions.DiscreteActions[0]);

    if (AteFood())       AddReward(+1.0f);   // eating is good
    else                 AddReward(-0.001f); // small time penalty

    if (HitWallOrSelf()) { AddReward(-1.0f); EndEpisode(); }
}`,
    },
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/01Fkofs51dQ', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  fpLVqa5t63E: {
    title: 'Knockout Mechanics',
    tech: ['Roblox', 'Luau', 'Physics'],
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
      { label: 'Watch on YouTube', url: 'https://youtu.be/fpLVqa5t63E', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  kUziMj68Og0: {
    title: 'Cyberpunk UI',
    tech: ['Unity', 'C#', 'UI/UX', 'Shaders'],
    body: [
      { h: 'Overview', p: 'Effect-heavy UI work for a cyberpunk-styled game — glitches, scanlines and neon accents that sell an immersive, high-tech atmosphere.' },
      { h: 'The challenge', p: 'Layering lots of visual effects while keeping the interface readable and performant — flashy UI is worthless if players can\'t actually use it or it tanks the frame rate.' },
      { h: 'How I built it', p: 'I combined shader-driven effects (scanlines, chromatic glitch) with code-driven micro-animations on interaction, and budgeted the effects so the look stays striking without hurting performance.' },
    ],
    code: {
      lang: 'C#',
      text: `// Trigger a short glitch burst on hover, then settle
public void OnPointerEnter(PointerEventData e)
{
    StopAllCoroutines();
    StartCoroutine(GlitchBurst(intensity: 0.6f, seconds: 0.18f));
}

IEnumerator GlitchBurst(float intensity, float seconds)
{
    for (float t = 0; t < seconds; t += Time.deltaTime)
    {
        material.SetFloat("_Glitch", intensity * (1 - t / seconds));
        yield return null;
    }
    material.SetFloat("_Glitch", 0f);
}`,
    },
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/kUziMj68Og0', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  // TODO: review/edit the copy + tech tags below to match the real project
  '2lh-PS8I5L4': {
    title: 'Skydiving',
    tech: ['Unity', 'C#', 'Physics'],
    body: [
      { h: 'Overview', p: 'A skydiving experience built around physics-based free-fall — the player dives, controls their body through the air, and deploys a parachute for a controlled landing.' },
      { h: 'The challenge', p: 'Free-fall has to feel fast and weighty without becoming uncontrollable, and the transition into parachute flight needs to feel smooth rather than abrupt.' },
      { h: 'How I built it', p: 'Air drag and gravity drive the descent, with player input adjusting orientation and fall speed. Deploying the chute swaps the physics profile so the character decelerates and glides toward the landing zone.' },
    ],
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/2lh-PS8I5L4', primary: true },
      { label: 'View Code', url: '#' },
    ],
  },

  '8fWLdfKFmJY': {
    title: 'Fighting Game',
    tech: ['Unity', 'C#', 'Combat'],
    body: [
      { h: 'Overview', p: 'A melee fighting game with responsive controls, chained combos and clean hit detection — built to feel snappy and satisfying to play.' },
      { h: 'The challenge', p: 'Combat feel lives in the details: hits need to register reliably, attacks need to flow into combos, and timing windows have to feel fair without being forgiving to the point of being mindless.' },
      { h: 'How I built it', p: 'Attacks are driven by an animation-synced state machine with hitbox activation windows, combo buffering and hit reactions, so inputs chain together naturally and impacts read clearly to the player.' },
    ],
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/8fWLdfKFmJY', primary: true },
      { label: 'View Code', url: '#' },
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
  navigator.clipboard.writeText('sainiujjawal4239@gmail.com');
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

  // Case-study body
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
