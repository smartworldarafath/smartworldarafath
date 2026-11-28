const fs = require('fs');
const path = require('path');

const profileDir = path.join(__dirname, '..');
const darkDir = path.join(profileDir, 'assets', 'readme', 'dark');
const lightDir = path.join(profileDir, 'assets', 'readme', 'light');

for (const d of [darkDir, lightDir]) {
  fs.mkdirSync(d, { recursive: true });
}

// 12-point scalloped Material 3 Expressive flower path (centered at 0,0)
const CENTERED_FLOWER_PATH = "M24.6,5.0C24.2,5.5 23.8,5.9 23.4,6.4C23.1,6.9 22.7,7.3 22.5,7.8C22.2,8.3 22.0,8.7 21.8,9.2C21.7,9.8 21.6,10.3 21.5,10.9C21.4,11.4 21.4,12.0 21.4,12.6C21.3,13.2 21.3,13.9 21.2,14.5C21.1,15.1 20.9,15.7 20.7,16.3C20.4,16.8 20.1,17.3 19.7,17.8C19.3,18.2 18.9,18.6 18.4,18.9C17.8,19.2 17.2,19.4 16.7,19.6C16.1,19.8 15.4,19.9 14.8,20.0C14.2,20.2 13.6,20.3 13.1,20.4C12.5,20.5 12.0,20.7 11.5,20.9C11.0,21.1 10.6,21.4 10.2,21.7C9.7,22.0 9.3,22.4 8.9,22.9C8.5,23.3 8.1,23.7 7.6,24.2C7.2,24.6 6.7,25.0 6.2,25.4C5.7,25.8 5.2,26.1 4.7,26.3C4.1,26.5 3.5,26.6 2.9,26.7C2.3,26.7 1.7,26.6 1.1,26.4C0.6,26.3 -0.0,26.0 -0.6,25.8C-1.3,25.5 -1.8,25.2 -2.3,24.9C-2.8,24.6 -3.3,24.3 -3.8,24.1C-4.3,23.9 -4.8,23.7 -5.3,23.6C-5.8,23.5 -6.4,23.5 -6.9,23.5C-7.5,23.5 -8.0,23.5 -8.6,23.6C-9.2,23.6 -9.9,23.7 -10.5,23.8C-11.1,23.8 -11.7,23.8 -12.3,23.7C-12.9,23.6 -13.5,23.5 -14.1,23.2C-14.6,23.0 -15.1,22.6 -15.5,22.2C-15.9,21.8 -16.3,21.3 -16.6,20.8C-17.0,20.2 -17.2,19.6 -17.4,19.1C-17.7,18.5 -17.9,17.9 -18.1,17.4C-18.3,16.8 -18.5,16.3 -18.8,15.9C-19.1,15.4 -19.4,15.0 -19.8,14.6C-20.1,14.2 -20.5,13.8 -21.0,13.5C-21.5,13.1 -22.0,12.8 -22.5,12.5C-23.0,12.1 -23.5,11.8 -24.0,11.4C-24.4,11.0 -24.9,10.5 -25.3,10.1C-25.6,9.6 -25.9,9.0 -26.1,8.5C-26.3,7.9 -26.4,7.3 -26.4,6.7C-26.4,6.1 -26.3,5.5 -26.1,4.9C-26.0,4.3 -25.8,3.7 -25.6,3.1C-25.4,2.5 -25.2,2.0 -25.1,1.4C-24.9,0.9 -24.8,0.3 -24.7,-0.2C-24.7,-0.7 -24.7,-1.2 -24.7,-1.8C-24.8,-2.3 -24.9,-2.9 -25.1,-3.4C-25.2,-4.0 -25.4,-4.6 -25.6,-5.2C-25.7,-5.8 -25.9,-6.4 -26.0,-7.0C-26.0,-7.6 -26.0,-8.3 -25.9,-8.8C-25.8,-9.4 -25.7,-10.0 -25.4,-10.5C-25.1,-11.0 -24.7,-11.5 -24.3,-11.9C-23.9,-12.4 -23.4,-12.8 -22.9,-13.1C-22.4,-13.5 -21.8,-13.8 -21.3,-14.1C-20.8,-14.4 -20.3,-14.7 -19.8,-15.0C-19.4,-15.4 -19.0,-15.7 -18.6,-16.1C-18.3,-16.5 -18.0,-17.0 -17.7,-17.4C-17.4,-17.9 -17.2,-18.5 -17.0,-19.0C-16.7,-19.5 -16.5,-20.1 -16.2,-20.7C-15.9,-21.2 -15.6,-21.8 -15.2,-22.3C-14.8,-22.7 -14.4,-23.2 -13.9,-23.5C-13.4,-23.8 -12.9,-24.1 -12.3,-24.3C-11.7,-24.4 -11.1,-24.5 -10.5,-24.5C-9.9,-24.5 -9.2,-24.4 -8.6,-24.4C-8.0,-24.3 -7.4,-24.2 -6.8,-24.1C-6.3,-24.0 -5.8,-23.9 -5.3,-23.9C-4.6,-23.9 -4.1,-24.0 -3.6,-24.1C-3.1,-24.2 -2.5,-24.4 -2.0,-24.7C-1.5,-24.9 -1.0,-25.2 -0.4,-25.4C0.1,-25.7 0.7,-26.0 1.3,-26.2C1.9,-26.4 2.5,-26.6 3.1,-26.6C3.7,-26.7 4.3,-26.7 4.9,-26.6C5.4,-26.4 6.0,-26.2 6.5,-25.9C7.0,-25.6 7.5,-25.2 8.0,-24.8C8.4,-24.4 8.9,-23.9 9.3,-23.5C9.7,-23.0 10.1,-22.5 10.5,-22.1C10.9,-21.7 11.2,-21.3 11.7,-21.0C12.1,-20.7 12.6,-20.5 13.1,-20.2C13.6,-20.0 14.1,-19.9 14.7,-19.7C15.2,-19.6 15.9,-19.5 16.4,-19.3C17.0,-19.1 17.7,-18.9 18.2,-18.7C18.8,-18.4 19.3,-18.1 19.8,-17.8C20.2,-17.4 20.6,-16.9 21.0,-16.4C21.3,-15.9 21.5,-15.4 21.7,-14.8C21.8,-14.2 21.9,-13.6 21.9,-13.0C22.0,-12.3 22.0,-11.7 22.0,-11.1C22.0,-10.5 22.0,-9.9 22.1,-9.4C22.2,-8.8 22.3,-8.3 22.4,-7.8C22.6,-7.3 22.8,-6.8 23.1,-6.3C23.4,-5.9 23.7,-5.4 24.1,-4.9C24.4,-4.4 24.8,-3.9 25.2,-3.4C25.5,-2.9 25.8,-2.3 26.0,-1.7C26.3,-1.2 26.4,-0.6 26.5,0.0C26.5,0.6 26.5,1.2 26.3,1.8C26.2,2.3 25.9,2.9 25.5,3.4C25.3,4.0 24.9,4.5 24.6,5.0Z";

const ICONS = {
  kotlin: `<path d="M21 21H3V3h18l-9 9 9 9z M3 12l9-9H3v9z" fill="currentColor"/>`,
  java: `<path d="M7.7 15.3c-.3 0-.6.1-.8.2-1.3.9-.3 2.1 1.2 2.7 2.2.8 5 .6 7.4-.2 1.3-.4 2.5-1.1 2.3-2-.3-1-2.4-.9-3.7-.8-2 .2-4.4.2-6.4.1zm-.8-3.1c-.2 0-.4.1-.6.2-1.2.9-.3 2.1 1.1 2.6 2.3.8 5.3.7 7.8-.1 1.4-.4 2.6-1.1 2.4-2-.3-1-2.5-.9-3.9-.7-2.1.2-4.6.2-6.8 0zm4.5-9.2C10.7 4.1 9.5 5.5 9.5 7c0 2 2.1 3.5 3.3 5.1.7.9 1.1 1.9 1.1 2.9 0 .4-.1.8-.2 1.1 1.4-.8 2.2-2.3 2.2-3.8 0-2.3-2.3-4-3.5-5.9-.6-1-.9-2.2-1-3.4zm-2.8 14.8c-.2 0-.4.1-.6.2-1 .7-.2 1.7.9 2.1 1.8.6 4.3.6 6.3 0 1.1-.3 2.1-.9 1.9-1.6-.2-.8-2-.7-3.1-.6-1.7.2-3.7.1-5.4-.1z" fill="currentColor"/>`,
  android: `<path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71a.495.495 0 0 0-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15a.495.495 0 0 0-.71 0c-.2.2-.2.51 0 .71l1.31 1.31C6.73 4.25 5.54 5.98 5.1 8h13.8c-.44-2.02-1.63-3.75-3.37-4.84zM9 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor"/>`,
  compose: `<path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2zm0 2.25l5.5 3.09L12 10.43 6.5 7.34 12 4.25zM5.5 8.48l5.5 3.09v6.18l-5.5-3.09V8.48zm7.5 9.27V11.57l5.5-3.09v6.18l-5.5 3.09z" fill="currentColor"/>`,
  ts: `<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="currentColor"/>`,
  js: `<path d="M3 3h18v18H3V3zm10.5 13.5c0 1.1.9 2 2 2s2-.9 2-2V11h-2v5.5zm-5 0c0 1.1.9 2 2 2s2-.9 2-2V14H10v-1h2.5v-2H8.5v5.5z" fill="currentColor"/>`,
  python: `<path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.03 1.4h3v.4H6.8S4 4.8 4 7.9c0 3.2 2.5 3.1 2.5 3.1h1.5V9.6s-.1-1.6 1.6-1.6h2.7s1.5.02 1.5-1.5V4.9S14 2 11.9 2zm-1.8 1c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6zm1.9 19c3.1 0 2.9-1.3 2.9-1.3l-.03-1.4h-3v-.4h5.2s2.8.3 2.8-2.8c0-3.2-2.5-3.1-2.5-3.1h-1.5v1.4s.1 1.6-1.6 1.6h-2.7s-1.5-.02-1.5 1.5v1.6S10 22 12 22zm1.8-1c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z" fill="currentColor"/>`,
  c: `<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a4.5 4.5 0 0 1-4.5-4.5 4.5 4.5 0 0 1 4.5-4.5 4.5 4.5 0 0 1 3.5 1.7l-1.6 1.3a2.5 2.5 0 0 0-1.9-1 2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 1.9-1l1.6 1.3A4.5 4.5 0 0 1 13 16.5z" fill="currentColor"/>`,
  dotnet: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 14H7V8h2v8zm5 0h-2V8h2l3 5V8h2v8h-2l-3-5v5z" fill="currentColor"/>`,
  gcp: `<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" fill="currentColor"/>`,
  firebase: `<path d="M4.5 18.5L8.5 3.5 11 9.5 7.5 15.5l-3 3zm7.5-6.5L14 3.5 19.5 18.5 12 12zm0 1.5l2.5 4.5H9.5l2.5-4.5z" fill="currentColor"/>`,
  linux: `<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3.5-3.5L8 8l1.4-1.4 4.9 4.9-4.9 4.9L8 15zm7 0h4v2h-4v-2z" fill="currentColor"/>`,
  git: `<path d="M18 16c-.79 0-1.5.31-2.03.81L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.53.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.51 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.51-.31 2.04-.81l7.05 4.12c-.05.22-.09.45-.09.69 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>`,
  figma: `<path d="M8 2h8a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4zm4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm4 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor"/>`
};

function renderIcon(iconName, size, color) {
  let iconSvg = ICONS[iconName] || ICONS.ts;
  iconSvg = iconSvg.replace(/fill="currentColor"/g, `fill="${color}"`);
  const scale = size / 24;
  const offset = -size / 2;
  return `<g transform="translate(${offset}, ${offset}) scale(${scale})">${iconSvg}</g>`;
}

function buildPillSvg({ name, label, icon, gradFrom, gradTo, width }, index, mode) {
  const isDark = mode === 'dark';
  const height = 46;
  const r = 23;
  const pillW = width;
  const pad = 2; // subtle outer glow margin so shadow never clips
  const totalW = pillW + pad * 2;
  const totalH = height + pad * 2;
  const spinDelay = `-${(index * 0.55).toFixed(2)}s`;
  const floatDelay = `-${(index * 0.35).toFixed(2)}s`;
  const shimmerDelay = `${(index * 0.45).toFixed(2)}s`;

  const glassBodyFill = isDark ? `url(#glassBg_${name})` : `url(#glassBgLight_${name})`;
  const borderStroke = isDark ? `url(#glassBorder_${name})` : `url(#glassBorderLight_${name})`;
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const sheenOpacity = isDark ? '0.22' : '0.68';
  const rimColor = isDark ? 'rgba(255,255,255,0.52)' : 'rgba(255,255,255,0.96)';
  const scallopStroke = isDark ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0.75)';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" role="img" aria-label="${label}">
  <defs>
    <style>
      @keyframes lg-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes lg-float { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-1px) scale(1.04); } }
      .scallop-spin { animation: lg-spin 6s linear infinite; animation-delay: ${spinDelay}; transform-origin: 0px 0px; }
      .icon-bob { animation: lg-float 3.2s ease-in-out infinite; animation-delay: ${floatDelay}; transform-origin: 0px 0px; }
    </style>

    <clipPath id="pillClip_${name}">
      <rect x="${pad}" y="${pad}" width="${pillW}" height="${height}" rx="${r}" ry="${r}"/>
    </clipPath>

    <!-- Scalloped badge gradient -->
    <linearGradient id="scallopGrad_${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradFrom}"/>
      <stop offset="100%" stop-color="${gradTo}"/>
    </linearGradient>

    <!-- Glass body base -->
    <linearGradient id="glassBg_${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="45%" stop-color="#141826" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.06"/>
    </linearGradient>
    <linearGradient id="glassBgLight_${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.86"/>
      <stop offset="55%" stop-color="#f1f5f9" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.62"/>
    </linearGradient>

    <!-- Chromatic glass rim -->
    <linearGradient id="glassBorder_${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.48"/>
      <stop offset="45%" stop-color="${gradFrom}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.18"/>
    </linearGradient>
    <linearGradient id="glassBorderLight_${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98"/>
      <stop offset="50%" stop-color="${gradFrom}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.32"/>
    </linearGradient>

    <!-- Top specular glass reflection -->
    <linearGradient id="topSpec_${name}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${sheenOpacity}"/>
      <stop offset="52%" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="${isDark ? '0.16' : '0.03'}"/>
    </linearGradient>

    <!-- Ambient refraction orb behind badge -->
    <radialGradient id="orbGlow_${name}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${gradFrom}" stop-opacity="${isDark ? '0.42' : '0.28'}"/>
      <stop offset="100%" stop-color="${gradTo}" stop-opacity="0"/>
    </radialGradient>

    <!-- Subtle shimmer highlight -->
    <linearGradient id="shimmerGrad_${name}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="${isDark ? '0.18' : '0.42'}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <filter id="badgeGlow_${name}" x="-35%" y="-35%" width="170%" height="170%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.4" flood-color="${gradFrom}" flood-opacity="${isDark ? '0.5' : '0.35'}"/>
    </filter>
  </defs>

  <!-- Clipped Liquid Glass Pill Interior -->
  <g clip-path="url(#pillClip_${name})">
    <rect x="${pad}" y="${pad}" width="${pillW}" height="${height}" rx="${r}" fill="${glassBodyFill}"/>
    <!-- Color-matched ambient glow refracting inside the glass -->
    <circle cx="${pad + 26}" cy="${pad + 23}" r="34" fill="url(#orbGlow_${name})"/>
    <!-- Top glass reflection -->
    <rect x="${pad}" y="${pad}" width="${pillW}" height="${height}" rx="${r}" fill="url(#topSpec_${name})"/>
    <!-- Subtle periodic specular shimmer -->
    <g opacity="0.7">
      <polygon points="-40,0 10,0 -10,${totalH} -60,${totalH}" fill="url(#shimmerGrad_${name})">
        <animateTransform attributeName="transform" type="translate" values="-40 0; ${pillW + 120} 0; ${pillW + 120} 0" keyTimes="0; 0.22; 1" dur="7s" begin="${shimmerDelay}" repeatCount="indefinite"/>
      </polygon>
    </g>
  </g>

  <!-- Outer Liquid Glass Border -->
  <rect x="${pad + 0.6}" y="${pad + 0.6}" width="${pillW - 1.2}" height="${height - 1.2}" rx="${r - 0.6}" fill="none" stroke="${borderStroke}" stroke-width="1.2"/>

  <!-- Top Specular Rim Highlight -->
  <path d="M ${pad + r} ${pad + 1.5} H ${pad + pillW - r}" stroke="${rimColor}" stroke-width="1" stroke-linecap="round" opacity="0.85"/>

  <!-- Animated Scalloped Badge + Upright Floating Icon -->
  <g transform="translate(${pad + 23}, ${pad + 23})">
    <g class="scallop-spin" filter="url(#badgeGlow_${name})">
      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="6s" repeatCount="indefinite"/>
      <path d="${CENTERED_FLOWER_PATH}" fill="url(#scallopGrad_${name})" stroke="${scallopStroke}" stroke-width="1.2" transform="scale(0.62)"/>
    </g>
    <g class="icon-bob">
      ${renderIcon(icon, 16, '#FFFFFF')}
    </g>
  </g>

  <!-- Pill Label -->
  <text x="${pad + 47}" y="${pad + 27.5}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13.5" font-weight="600" letter-spacing="-0.15" fill="${textColor}">${label}</text>
</svg>`;
}

// Tech Stack Pills matching README order & Liquid Glass palette
const stack = [
  // Languages & Core Systems
  { name: 'kotlin', label: 'Kotlin', icon: 'kotlin', gradFrom: '#9b6bff', gradTo: '#6d28d9', width: 108 },
  { name: 'java', label: 'Java', icon: 'java', gradFrom: '#fb923c', gradTo: '#c2410c', width: 98 },
  { name: 'ts', label: 'TypeScript', icon: 'ts', gradFrom: '#4b83c3', gradTo: '#244b7a', width: 138 },
  { name: 'js', label: 'JavaScript', icon: 'js', gradFrom: '#eab308', gradTo: '#a16207', width: 138 },
  { name: 'python', label: 'Python', icon: 'python', gradFrom: '#3b82b6', gradTo: '#1e4e79', width: 114 },
  { name: 'c', label: 'C / C++', icon: 'c', gradFrom: '#0ea5e9', gradTo: '#0369a1', width: 118 },
  { name: 'dotnet', label: '.NET', icon: 'dotnet', gradFrom: '#818cf8', gradTo: '#4f46e5', width: 98 },

  // Platforms, Cloud & Infrastructure
  { name: 'android', label: 'Android Native', icon: 'android', gradFrom: '#34d399', gradTo: '#15803d', width: 162 },
  { name: 'compose', label: 'Jetpack Compose', icon: 'compose', gradFrom: '#38bdf8', gradTo: '#1d4ed8', width: 184 },
  { name: 'gcp', label: 'Google Cloud', icon: 'gcp', gradFrom: '#60a5fa', gradTo: '#2563eb', width: 154 },
  { name: 'firebase', label: 'Firebase', icon: 'firebase', gradFrom: '#fbbf24', gradTo: '#ea580c', width: 124 },
  { name: 'linux', label: 'Linux', icon: 'linux', gradFrom: '#a16207', gradTo: '#713f12', width: 104 },
  { name: 'git', label: 'Git', icon: 'git', gradFrom: '#f87171', gradTo: '#b91c1c', width: 92 },
  { name: 'figma', label: 'Figma', icon: 'figma', gradFrom: '#ea580c', gradTo: '#9a3412', width: 108 }
];

stack.forEach((item, index) => {
  fs.writeFileSync(path.join(darkDir, `pill-${item.name}.svg`), buildPillSvg(item, index, 'dark'));
  fs.writeFileSync(path.join(lightDir, `pill-${item.name}.svg`), buildPillSvg(item, index, 'light'));
});

console.log(`Generated ${stack.length} Liquid Glass animated stack pills in dark and light themes!`);
