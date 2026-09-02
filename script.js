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
  LBIvO2eZOKY: {
    title: 'Frag Boom !',
    tech: ['Roblox Engine', 'Luau', 'Physics', 'State Machine'],
    body: [
      { h: 'Overview', p: 'Last man standing on a stack of breakable plates. Nobody has health — you throw bombs to delete the floor under people and shove them off. Grab mystery boxes for buffs like bigger blasts or triple volleys. Fall off, you\'re out.' },
      { h: 'The challenge', p: 'Making the destruction real instead of a decal. Every blast recursively splits the plate until the hole matches the sphere, and since the plates have art on them, each fragment had to keep its own slice of the image — rotation-proof and deterministic.' },
      { h: 'How I built it', p: 'The round runs on a phase state machine that knows nothing about the game — services just register for the phases they care about, so adding the map vote was a config edit. Bomb types are pure data off the model, so a new bomb is zero code. One fall watcher handles every elimination, with kill credit, coins and stats hanging off the event it fires. Plus bots, a shop, leaderboards and a win podium.' },
    ],
    links: [],
  },

  '3_BvsgZOhW4': {
    title: 'Guess Wrong Die !',
    tech: ['Roblox Engine', 'Luau', 'State Machine', 'AI'],
    body: [
      { h: 'Overview', p: 'A 1v1 duel against an AI. You both sit across a table and pick one move each round — shoot, reload, or deflect — then reveal at the same time. Shooting needs a bullet, reloading leaves you open, deflect bounces a shot back. Guess wrong about what the other guy does and you take a hit. First to run out of health loses.' },
      { h: 'The challenge', p: 'Making the mind-game feel fair instead of random. The rules for what beats what had to be tight, and the bot had to feel like a real opponent, not a coin flip. Most of the work was tuning that so a loss feels like you got outguessed, not cheated.' },
      { h: 'How I built it', p: 'The match runs on a state machine — waiting, countdown, choosing, resolving, game over — handled on the server so it can\'t be cheated. The actual fight is one small function: give it both moves and bullet counts, it spits out the damage. Each move is its own module, and the bot\'s decision-making is a separate piece I can swap out later for harder difficulty. On top of that there\'s the polish — ragdoll on death, muzzle flash, sound, a coin economy with saved data, and a shop to buy and switch guns.' },
    ],
    links: [
      { label: 'View Code', url: 'https://github.com/ujsain/GuessWrongDie', primary: true },
    ],
  },

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

  gh4Y8P1VXSk: {
    title: '1 IQ vs 9999 IQ',
    tech: ['Roblox Engine', 'Lua', 'Game Architecture'],
    body: [
      { h: 'Overview', p: 'A head-to-head brain-battle game — two players sit at a shared table, get the same puzzle, and race to solve it. Winning earns IQ (the game\'s currency), which feeds into leaderboards, chair unlocks, rebirths and steal mechanics. Ten minigames wired in: Maze, Untangle, StopTimer, PipeConnect, NumberSort, PatternMemory, TicTacToe, WordSearch, PipeFlow and OddColor.' },
      { h: 'The challenge', p: 'Keeping the duel engine clean while it juggles a lot at once — shared puzzle state, synced countdowns, race vs. score win modes, forfeits, AFK timeouts, and runtime cosmetic chair-swaps that can\'t be allowed to break an active match. The trick was hiding all of that behind the right abstractions so game logic never touches raw seats or physical chairs.' },
      { h: 'How I built it', p: 'The core design decisions are the interesting part: a Station layer that hides which seat is in use so chairs swap mid-game, auto-grouped arenas so duplicating a table folder "just works" with zero config, a single audited path for the IQ economy, and a folder-convention registry so adding a minigame needs no wiring edits.' },
    ],
    links: [],
  },

  FfcwRnzSwo4: {
    title: 'I Am Number',
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

  'QuEuLtu-Yf0': {
    title: 'Golf BOOM!',
    tech: ['Roblox Engine', 'Lua', 'Gameplay Systems'],
    body: [
      { h: 'Overview', p: 'A chaotic multiplayer golf game. Up to 60 players race to sink shots across timed rounds, while throwing fireballs and cannons at each other to mess up their swings.' },
      { h: 'The challenge', p: 'Getting golf to feel arcade, not realistic. Roblox\'s default physics makes the ball fast and heavy, so I wrote custom gravity, drag and backspin to get slow floaty arcs. The other tricky part was layering combat on top of golf without breaking the round or score logic.' },
      { h: 'How I built it', p: 'Built this the agentic way — used Opus 4.5 for about 80% of the systems, then tuned the feel myself: swing timing, trajectory preview, off-screen ball indicators, and the gag where a ball smacks someone in the head. Also learned a lot about Roblox engine limits compared to Unity.' },
    ],
    links: [],
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
    title: 'CyberPunk UI in Roblox',
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
      { h: 'Overview', p: 'A Roblox social multiplayer skydiving game. You board a plane with your friends, jump out, fly your body through rings, collect coins on the way down, then pop a glider to land on the podium.' },
      { h: 'The challenge', p: 'Velocity is custom, because natural gravity would make the player fall too fast. Since it\'s multiplayer, if two or more people skydive simultaneously, I had to fake the body\'s Y-position to compensate for server-client lag.' },
      { h: 'How I built it', p: 'I wrote modular code where each system works independently. The game also includes several other systems such as a pet system, egg hatching, pet fusion, and a leaderboard. For data persistence, I used ProfileService to manage player data.' },
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

/* ─────────────────────────────────────────────────────────────
   GAMES CONTRIBUTED DATA  ← EDIT THIS
   ─────────────────────────────────────────────────────────────
   One entry per game in the scrolling "Games Contributed" strip.
     • title    — game name
     • platform — 'roblox' | 'mobile'   (picks colour + badge)
     • image    — path inside GameImage/
     • stats    — array of { num, label }  e.g. Visits / Peak CCU / Installs
     • blurb    — short text on the card (clamped to ~3 lines)
     • tech     — tags shown in the detail modal
     • body     — array of {h, p} sections shown when the card is clicked
     • links    — array of { label, url, primary? }  (optional; "#" is ignored)
   ───────────────────────────────────────────────────────────── */
const GAMES = [
  {
    title: 'Screw Jam',
    platform: 'mobile',
    image: 'GameImage/ScrewJam.jpg',
    stats: [{ num: '100K+', label: 'Installs' }],
    blurb: 'A relaxing screw-sorting puzzle game with 100K+ installs — unscrew the pieces in the right order to clear each board.',
    tech: ['Unity', 'C#', 'Puzzle', 'Mobile'],
    body: [
      { h: 'What it is', p: 'A relaxing screw-sorting puzzle game with 100K+ installs — unscrew pieces in the right order to clear each board.' },
      { h: 'What I worked on', p: 'Core puzzle mechanics, level progression, UI systems and the retention features that keep players coming back day after day.' },
    ],
    links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.screw.jam&hl=en_IN', primary: true }],
  },
  {
    title: 'Football World',
    platform: 'mobile',
    image: 'GameImage/FootBallWorld.png',
    stats: [{ num: '10M+', label: 'Installs' }],
    blurb: 'A fast, pick-up-and-play mobile football game with 10M+ installs, built and operated at scale at Audify.',
    tech: ['Unity', 'C#', 'Live Ops', 'Mobile'],
    body: [
      { h: 'What it is', p: 'A fast, pick-up-and-play mobile football game with 10M+ installs, built and operated at scale at Audify.' },
      { h: 'What I worked on', p: 'Playable ads for user acquisition, banner-ad bug fixes, UI systems and particle effects — a mix of feature work and the polish that keeps a 10M-install live game running smoothly.' },
      { h: 'What I learned', p: 'How to find my way around a very large codebase — locating the right place to make a change and shipping it without breaking what\'s already live.' },
    ],
    links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.audify.football&hl=en_IN', primary: true }],
  },
  {
    title: '+1 Sword Fight',
    platform: 'roblox',
    image: 'GameImage/%2B1SwordFight.jpg',
    stats: [{ num: '2M+', label: 'Visits' }, { num: '3K', label: 'Peak CCU' }],
    blurb: 'A +1-style Roblox sword-fighting game — train your strength, upgrade swords, unlock auras and take down ever-harder bosses.',
    tech: ['Roblox Engine', 'Luau', 'Gameplay', 'Live Ops'],
    body: [
      { h: 'What it is', p: 'A +1-style Roblox sword-fighting game — train your strength, upgrade swords, unlock auras and push into new areas to take down progressively harder bosses. A simple core loop with high replayability.' },
      { h: 'What I worked on', p: 'Obstacle systems, progression funnels and UI scripting, plus live bug-fixing on a production game with real players in it.' },
      { h: 'What I learned', p: 'How to work inside a large, shared codebase. With a full team writing into the same project, I learned to write readable, consistent code that other developers could pick up and build on without friction.' },
    ],
    links: [{ label: 'Play on Roblox', url: 'https://www.roblox.com/games/71132391335247/1-Sword-Fighting-Escape', primary: true }],
  },
  {
    title: 'Tile Match',
    platform: 'mobile',
    image: 'GameImage/TileMatch.jpg',
    stats: [{ num: '100K+', label: 'Installs' }],
    blurb: 'A classic triple-tile matching puzzle game with 100K+ installs — clear the board by matching sets of three.',
    tech: ['Unity', 'C#', 'Puzzle', 'Mobile'],
    body: [
      { h: 'What it is', p: 'A classic triple-tile matching puzzle game with 100K+ installs — clear the board by matching sets of three.' },
      { h: 'What I worked on', p: 'UI systems and modular gameplay code — chest and quest systems, retention features, in-game analytics tracking, and steady bug-fixing on a live title.' },
    ],
    links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.tilematch.game&hl=en_IN', primary: true }],
  },
  {
    title: 'Indian Village Shop [HORROR GAME]',
    platform: 'roblox',
    image: 'GameImage/Indian%20Village%20Shop.jpg',
    stats: [{ num: '700K+', label: 'Visits' }, { num: '2.5K', label: 'Peak CCU' }],
    blurb: 'Roblox horror game — run the night shift at a remote village shop, follow the rules and survive each night to unlock the next.',
    tech: ['Roblox Engine', 'Luau', 'Horror', 'Gameplay'],
    body: [
      { h: 'What it is', p: 'A rules-based horror experience on Roblox — you take the night shift at a small shop outside a remote Indian village. Serve customers chai and samosas, listen to the owner\'s phone calls, spot the suspicious ones, and survive each night to unlock the next.' },
      { h: 'What I worked on', p: 'Gameplay scripting and the systems behind the scares — night/event flow, customer and rule logic, and the atmosphere control (lighting and sound) that sells the tension.' },
    ],
    links: [{ label: 'Play on Roblox', url: 'https://www.roblox.com/games/90229512149046/Indian-Village-Shop', primary: true }],
  },
];

// ─── Hero headline typewriter ───
// Wraps every character in a hidden span, then reveals them one by one.
// Layout never shifts because all chars exist (invisible) from the start.
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const chars = [];
  (function wrapChars(node) {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const ch of child.textContent) {
          const s = document.createElement('span');
          s.className = 'ch';
          s.textContent = ch;
          frag.appendChild(s);
          chars.push(s);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
        wrapChars(child);
      }
    });
  })(heroTitle);

  let typeIdx = 0;
  function typeNext() {
    if (typeIdx < chars.length) {
      const ch = chars[typeIdx++];
      ch.classList.add('on');
      setTimeout(typeNext, ch.textContent === ' ' ? 30 : 55);
    }
  }
  setTimeout(typeNext, 350);
}

// ─── Section-title typewriter ───
// Same typed-in reveal as the hero headline, but for section titles
// ("Projects", "Work Experience", "My Skills", "Let's Talk").
// Each title types itself the first time it scrolls into view.
(() => {
  const targets = document.querySelectorAll('.section-title, .toolkit-head h4');
  if (!targets.length) return;

  // Pre-wrap every character in a hidden span so layout never shifts
  targets.forEach(el => {
    const chars = [];
    (function wrapChars(node) {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          for (const ch of child.textContent) {
            const s = document.createElement('span');
            s.className = 'ch';
            s.textContent = ch;
            frag.appendChild(s);
            chars.push(s);
          }
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          wrapChars(child);
        }
      });
    })(el);
    el._typeChars = chars;
  });

  function startTyping(el) {
    const chars = el._typeChars || [];
    let i = 0;
    (function next() {
      if (i < chars.length) {
        const ch = chars[i++];
        ch.classList.add('on');
        setTimeout(next, ch.textContent === ' ' ? 30 : 60);
      }
    })();
  }

  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        titleObserver.unobserve(entry.target);
        startTyping(entry.target);
      }
    });
  }, { threshold: 0.5, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => titleObserver.observe(el));
})();

// ─── Games Contributed: render marquee cards ───
// Builds the cards from GAMES, then clones the group once so the
// translateX(-50%) animation loops with no visible seam.
(() => {
  const track = document.getElementById('gamesTrack');
  if (!track) return;

  const cardHTML = (g, i) => {
    const play = (g.links || []).find(l => l.primary && l.url && l.url !== '#');
    return `
    <div class="game-card game-${g.platform}" data-game="${i}" role="button" tabindex="0" aria-label="${g.title} — read more">
      <div class="game-thumb">
        <img class="game-thumb-bg" src="${g.image}" alt="" aria-hidden="true" loading="lazy">
        <img class="game-thumb-art" src="${g.image}" alt="${g.title}" loading="lazy">
        <span class="game-badge"><span class="dot"></span>${g.platform === 'roblox' ? 'Roblox' : 'Mobile'}</span>
      </div>
      <div class="game-info">
        <div class="game-name">${g.title}</div>
        <div class="game-stats">
          ${g.stats.map(s => `<div class="game-stat"><div class="game-stat-num">${s.num}</div><div class="game-stat-label">${s.label}</div></div>`).join('')}
        </div>
        <p class="game-blurb">${g.blurb || ''}</p>
        <div class="game-actions">
          <span class="game-more">Read more <span aria-hidden="true">→</span></span>
          ${play ? `<a class="game-play" href="${play.url}" target="_blank" rel="noopener" aria-label="Play ${g.title} (opens in new tab)">Play <span aria-hidden="true">↗</span></a>` : ''}
        </div>
      </div>
    </div>`;
  };

  const group = `<div class="games-group">${GAMES.map(cardHTML).join('')}</div>`;
  track.innerHTML = group + group.replace('class="games-group"', 'class="games-group" aria-hidden="true"');

  track.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.game-play')) return; // Play link navigates, doesn't open the modal
      openGame(+card.dataset.game);
    });
    card.addEventListener('keydown', (e) => {
      if (e.target.closest('.game-play')) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGame(+card.dataset.game); }
    });
  });

  // ── JS-driven marquee: auto-scrolls, pauses on hover, and can be
  //    steered with the mouse wheel or dragged (mouse + touch).
  //    The track holds two identical groups, so wrapping the offset at
  //    one group's width keeps the loop seamless in both directions.
  const marquee = track.closest('.games-marquee');
  const duration = Math.max(24, GAMES.length * 9);   // seconds per full loop
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let groupW = 0;
  const measure = () => { groupW = track.scrollWidth / 2; };
  window.addEventListener('resize', measure);
  measure();

  let offset = 0;          // current scroll position in px
  let hovered = false;     // mouse over the slider → auto-scroll paused
  let dragging = false;
  let dragStartX = 0, dragStartOffset = 0, dragMoved = false;

  let last = performance.now();
  (function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!groupW) measure();
    if (groupW) {
      if (!hovered && !dragging && !reduceMotion) offset += (groupW / duration) * dt;
      offset = ((offset % groupW) + groupW) % groupW;   // wrap both directions
      track.style.transform = `translateX(${-offset}px)`;
    }
    requestAnimationFrame(tick);
  })(last);

  marquee.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hovered = true; });
  marquee.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') hovered = false; });

  // Wheel over the slider scrolls it horizontally instead of the page
  marquee.addEventListener('wheel', e => {
    e.preventDefault();
    offset += e.deltaY + e.deltaX;
  }, { passive: false });

  // Drag to scroll — pointer events cover mouse, touch and pen
  marquee.addEventListener('pointerdown', e => {
    dragging = true;
    dragMoved = false;
    dragStartX = e.clientX;
    dragStartOffset = offset;
  });
  window.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 6 && !dragMoved) {
      dragMoved = true;
      marquee.classList.add('is-dragging'); // grabbing cursor + cards ignore the pointer
    }
    if (dragMoved) offset = dragStartOffset - dx;
  });
  const endDrag = () => { dragging = false; marquee.classList.remove('is-dragging'); };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  // A drag shouldn't open the card modal when the pointer is released
  marquee.addEventListener('click', e => {
    if (dragMoved) { e.preventDefault(); e.stopPropagation(); dragMoved = false; }
  }, true);
})();

// ─── Live Roblox visit counts ───
// Pulls the real visit counts from the Roblox games API via the roproxy.com
// mirror (games.roblox.com blocks browser CORS) and swaps them into the
// marquee cards + GAMES data (which the modal reads at open time).
// If the proxy is unreachable, the hardcoded numbers stay as a fallback.
(async () => {
  const LIVE_GAMES = {                                       // universeId → GAMES title
    10411628404: '+1 Sword Fight',                           // +1 Sword Fighting Escape
    10548659123: 'Indian Village Shop [HORROR GAME]',
  };
  const fmt = n => n >= 1e6 ? Math.floor(n / 1e6) + 'M+'
            : n >= 1e3 ? Math.floor(n / 1e3) + 'K+'
            : String(n);
  try {
    const ids = Object.keys(LIVE_GAMES).join(',');
    const res = await fetch(`https://games.roproxy.com/v1/games?universeIds=${ids}`);
    ((await res.json()).data || []).forEach(game => {
      const title = LIVE_GAMES[game.id];
      if (!title || !game.visits) return;
      const i = GAMES.findIndex(g => g.title === title);
      if (i === -1) return;
      const visits = fmt(game.visits);
      const stat = (GAMES[i].stats || []).find(s => s.label === 'Visits');
      if (stat) stat.num = visits;
      document.querySelectorAll(`.game-card[data-game="${i}"] .game-stat`).forEach(el => {
        if (el.querySelector('.game-stat-label')?.textContent === 'Visits')
          el.querySelector('.game-stat-num').textContent = visits;
      });
    });
  } catch { /* proxy down — keep hardcoded numbers */ }
})();

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

// ─── Copy contact handle (email, discord, …) to clipboard ───
function copyText(el, text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
  const arrow = el.querySelector('.contact-link-arrow');
  const original = arrow.textContent;
  arrow.textContent = '✓';
  arrow.style.color = 'var(--accent-gold)';
  setTimeout(() => {
    arrow.textContent = original;
    arrow.style.color = '';
  }, 1800);
}

// Clipboard API fallback for browsers/contexts where it's unavailable
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
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

// ─── Timelines (experience, education): neon line draws in as you scroll ───
const timelines = [...document.querySelectorAll('.timeline')].map(el => ({
  el,
  progress: el.querySelector('.timeline-progress'),
  items: el.querySelectorAll('.timeline-item'),
})).filter(t => t.progress);

if (timelines.length) {
  function updateTimeline() {
    timelines.forEach(({ el, progress, items }) => {
      const rect = el.getBoundingClientRect();
      // The line's tip tracks a point ~70% down the viewport
      const tip = window.innerHeight * 0.7 - rect.top;
      const drawn = Math.min(Math.max(tip, 0), el.offsetHeight);
      progress.style.height = drawn + 'px';

      // Light up each node the moment the line reaches it
      items.forEach(item => {
        item.classList.toggle('lit', item.offsetTop + 10 <= drawn);
      });
    });
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline);
  updateTimeline();
}

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
  setTimeout(() => { modalPlayer.innerHTML = ''; modalPlayer.classList.remove('vm-image'); }, 300);
}

// ─── Game detail (reuses the project modal) ───
function openGame(i) {
  const g = GAMES[i];
  if (!g) return;
  const warm = g.platform === 'mobile';

  modalTitle.textContent = g.title;

  // Image instead of a video player
  modalPlayer.classList.add('vm-image');
  modalPlayer.innerHTML = `
    <img class="vm-img-bg" src="${g.image}" alt="" aria-hidden="true">
    <img class="vm-img-art" src="${g.image}" alt="${g.title}">`;

  // Platform + tech tags
  modalTech.innerHTML = [warm ? 'Mobile' : 'Roblox', ...(g.tech || [])]
    .map(t => `<span class="vm-tech-tag">${t}</span>`)
    .join('');

  // Big stats row, then the writeup sections
  const statsHTML = `<div class="vm-stats">${g.stats.map(s =>
    `<div><div class="vm-stat-num ${warm ? 'warm' : ''}">${s.num}</div><div class="vm-stat-label">${s.label}</div></div>`
  ).join('')}</div>`;
  modalBody.innerHTML = statsHTML + (g.body || [])
    .map(s => `<div class="vm-section"><h4>${s.h}</h4><p>${s.p}</p></div>`)
    .join('');

  modalCodeWrap.hidden = true;

  const links = (g.links || []).filter(l => l.url && l.url !== '#');
  modalLinks.innerHTML = links
    .map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="vm-link ${l.primary ? 'vm-link-primary' : ''}">${l.label}</a>`)
    .join('');
  modalLinks.style.display = links.length ? '' : 'none';

  if (modalScroll) modalScroll.scrollTop = 0;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});
