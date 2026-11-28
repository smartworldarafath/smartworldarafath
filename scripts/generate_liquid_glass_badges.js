const fs = require('fs');
const path = require('path');

const profileDir = path.join(__dirname, '..');
const darkDir = path.join(profileDir, 'assets', 'readme', 'dark');
const lightDir = path.join(profileDir, 'assets', 'readme', 'light');

for (const d of [darkDir, lightDir]) {
  fs.mkdirSync(d, { recursive: true });
}

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function buildSocialGlassBadge({ id, label, width, gradFrom, gradTo, iconSvg, shimmerDelay }, mode) {
  const isDark = mode === 'dark';
  const height = 36;
  const pad = 3;
  const totalW = width + pad * 2;
  const totalH = height + pad * 2;
  const r = 12;
  const textColor = isDark ? '#f8fafc' : '#0f172a';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" role="img" aria-label="${label}">
  <defs>
    <clipPath id="${id}_clip">
      <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${r}" ry="${r}"/>
    </clipPath>

    <linearGradient id="${id}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
           <stop offset="48%" stop-color="#141826" stop-opacity="0.68"/>
           <stop offset="100%" stop-color="#ffffff" stop-opacity="0.06"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.90"/>
           <stop offset="55%" stop-color="#f1f5f9" stop-opacity="0.76"/>
           <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.66"/>`}
    </linearGradient>

    <linearGradient id="${id}_chip" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradFrom}"/>
      <stop offset="100%" stop-color="${gradTo}"/>
    </linearGradient>

    <linearGradient id="${id}_border" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.48"/>
           <stop offset="48%" stop-color="${gradFrom}" stop-opacity="0.34"/>
           <stop offset="100%" stop-color="#ffffff" stop-opacity="0.20"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.98"/>
           <stop offset="50%" stop-color="${gradFrom}" stop-opacity="0.32"/>
           <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.34"/>`}
    </linearGradient>

    <linearGradient id="${id}_bevel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${isDark ? '0.24' : '0.68'}"/>
      <stop offset="52%" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="${isDark ? '0.16' : '0.04'}"/>
    </linearGradient>

    <radialGradient id="${id}_orb" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${gradFrom}" stop-opacity="${isDark ? '0.38' : '0.24'}"/>
      <stop offset="100%" stop-color="${gradTo}" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="${id}_shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="${isDark ? '0.22' : '0.45'}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <filter id="${id}_chipGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="${gradFrom}" flood-opacity="${isDark ? '0.50' : '0.32'}"/>
    </filter>
  </defs>

  <g clip-path="url(#${id}_clip)">
    <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${r}" fill="url(#${id}_bg)"/>
    <circle cx="${pad + 22}" cy="${pad + 18}" r="32" fill="url(#${id}_orb)"/>
    <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${r}" fill="url(#${id}_bevel)"/>
    <polygon points="-40,0 8,0 -10,${totalH} -58,${totalH}" fill="url(#${id}_shimmer)">
      <animateTransform attributeName="transform" type="translate" values="-40 0; ${width + 110} 0; ${width + 110} 0" keyTimes="0; 0.22; 1" dur="7s" begin="${shimmerDelay}" repeatCount="indefinite"/>
    </polygon>
  </g>

  <!-- Outer Liquid Glass Border & Top Rim -->
  <rect x="${pad + 0.6}" y="${pad + 0.6}" width="${width - 1.2}" height="${height - 1.2}" rx="${r - 0.6}" fill="none" stroke="url(#${id}_border)" stroke-width="1.2"/>
  <path d="M ${pad + r} ${pad + 1.3} H ${pad + width - r}" stroke="#ffffff" stroke-opacity="${isDark ? '0.55' : '0.96'}" stroke-width="1" stroke-linecap="round"/>

  <!-- Left Glowing Glass Brand Chip -->
  <g transform="translate(${pad + 6}, ${pad + 6})" filter="url(#${id}_chipGlow)">
    <rect x="0" y="0" width="24" height="24" rx="7" fill="url(#${id}_chip)"/>
    <rect x="0.4" y="0.4" width="23.2" height="23.2" rx="6.6" fill="none" stroke="#ffffff" stroke-opacity="0.45" stroke-width="0.8"/>
    <g transform="translate(4, 4) scale(0.6667)">
      ${iconSvg}
    </g>
  </g>

  <!-- Label -->
  <text x="${pad + 38}" y="${pad + 22.5}" font-family="${FONT}" font-size="13" font-weight="600" letter-spacing="-0.1" fill="${textColor}">${label}</text>
</svg>`;
}

const BADGES = [
  {
    name: 'facebook',
    id: 'bf',
    label: 'Facebook',
    width: 114,
    gradFrom: '#42a5f5',
    gradTo: '#1877F2',
    shimmerDelay: '0s',
    iconSvg: `<path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" fill="#ffffff"/>`,
  },
  {
    name: 'reddit',
    id: 'br',
    label: 'Reddit',
    width: 98,
    gradFrom: '#ff7043',
    gradTo: '#FF4500',
    shimmerDelay: '0.6s',
    iconSvg: `<circle cx="12" cy="13.5" r="7.5" fill="none" stroke="#ffffff" stroke-width="2"/><circle cx="9.2" cy="13" r="1.3" fill="#ffffff"/><circle cx="14.8" cy="13" r="1.3" fill="#ffffff"/><path d="M9.5 16.5c1.5 1.1 3.5 1.1 5 0" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/><path d="M12 6l1.8-3.2 3.2.8" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="3.8" r="1.4" fill="#ffffff"/><circle cx="4.5" cy="11.5" r="1.6" fill="#ffffff"/><circle cx="19.5" cy="11.5" r="1.6" fill="#ffffff"/>`,
  },
  {
    name: 'email',
    id: 'be',
    label: 'Email',
    width: 92,
    gradFrom: '#f87171',
    gradTo: '#D14836',
    shimmerDelay: '1.2s',
    iconSvg: `<rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="none" stroke="#ffffff" stroke-width="2"/><path d="M3.5 6.5L12 13l8.5-6.5" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
];

for (const mode of ['dark', 'light']) {
  const outDir = mode === 'dark' ? darkDir : lightDir;
  for (const badge of BADGES) {
    fs.writeFileSync(path.join(outDir, `badge-${badge.name}.svg`), buildSocialGlassBadge(badge, mode));
  }

  // Interactive Liquid Glass Profile pill badge
  const isDark = mode === 'dark';
  const iw = 264;
  const ih = 36;
  const pad = 3;
  const tw = iw + pad * 2;
  const th = ih + pad * 2;
  const r = 18;
  const interactiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}" viewBox="0 0 ${tw} ${th}" role="img" aria-label="Open Interactive Liquid Glass Profile">
  <defs>
    <clipPath id="int_clip"><rect x="${pad}" y="${pad}" width="${iw}" height="${ih}" rx="${r}" ry="${r}"/></clipPath>
    <linearGradient id="int_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#70a5fd" stop-opacity="0.24"/>
           <stop offset="50%" stop-color="#1e1b4b" stop-opacity="0.72"/>
           <stop offset="100%" stop-color="#bf91f3" stop-opacity="0.22"/>`
        : `<stop offset="0%" stop-color="#eff6ff" stop-opacity="0.95"/>
           <stop offset="50%" stop-color="#e0e7ff" stop-opacity="0.82"/>
           <stop offset="100%" stop-color="#f3e8ff" stop-opacity="0.85"/>`}
    </linearGradient>
    <linearGradient id="int_border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${isDark ? '0.55' : '0.98'}"/>
      <stop offset="45%" stop-color="#70a5fd" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#bf91f3" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="int_shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="${isDark ? '0.26' : '0.55'}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#int_clip)">
    <rect x="${pad}" y="${pad}" width="${iw}" height="${ih}" rx="${r}" fill="url(#int_bg)"/>
    <polygon points="-40,0 10,0 -10,${th} -60,${th}" fill="url(#int_shimmer)">
      <animateTransform attributeName="transform" type="translate" values="-40 0; ${iw + 120} 0; ${iw + 120} 0" keyTimes="0; 0.25; 1" dur="5.5s" repeatCount="indefinite"/>
    </polygon>
  </g>
  <rect x="${pad + 0.6}" y="${pad + 0.6}" width="${iw - 1.2}" height="${ih - 1.2}" rx="${r - 0.6}" fill="none" stroke="url(#int_border)" stroke-width="1.2"/>
  <path d="M ${pad + r} ${pad + 1.3} H ${pad + iw - r}" stroke="#ffffff" stroke-opacity="${isDark ? '0.62' : '0.96'}" stroke-width="1" stroke-linecap="round"/>
  <circle cx="${pad + 19}" cy="${pad + 18}" r="4.5" fill="#38bdae">
    <animate attributeName="opacity" values="0.65;1;0.65" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="${pad + 33}" y="${pad + 22}" font-family="${FONT}" font-size="12" font-weight="700" letter-spacing="0.2" fill="${isDark ? '#f8fafc' : '#1e1b4b'}">Interactive Liquid Glass View  &#8594;</text>
</svg>`;
  fs.writeFileSync(path.join(outDir, 'badge-interactive.svg'), interactiveSvg);
}

console.log('Generated Liquid Glass Facebook, Reddit, Email, and Interactive badges in dark and light themes!');
