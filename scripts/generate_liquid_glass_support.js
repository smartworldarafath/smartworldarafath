const fs = require('fs');
const path = require('path');

const profileDir = path.join(__dirname, '..');
const darkDir = path.join(profileDir, 'assets', 'readme', 'dark');
const lightDir = path.join(profileDir, 'assets', 'readme', 'light');

for (const d of [darkDir, lightDir]) {
  fs.mkdirSync(d, { recursive: true });
}

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function buildSupportTableSvg(mode) {
  const isDark = mode === 'dark';
  const width = 568;
  const height = 126;
  const pad = 4;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;
  const r = 18;

  const textPrimary = isDark ? '#ffffff' : '#0f172a';
  const headerText = isDark ? 'rgba(255,255,255,0.94)' : '#0f172a';
  const linkColor = isDark ? '#7dd3fc' : '#2563eb';
  const dividerColor = isDark ? 'rgba(255,255,255,0.16)' : 'rgba(15,23,42,0.11)';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="SupportKori Direct Link">
  <defs>
    <clipPath id="supTbl_clip">
      <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="${r}" ry="${r}"/>
    </clipPath>

    <linearGradient id="supTbl_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.11"/>
           <stop offset="50%" stop-color="#111827" stop-opacity="0.65"/>
           <stop offset="100%" stop-color="#ffffff" stop-opacity="0.06"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.90"/>
           <stop offset="55%" stop-color="#f8fafc" stop-opacity="0.78"/>
           <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.70"/>`}
    </linearGradient>

    <linearGradient id="supTbl_border" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.48"/>
           <stop offset="50%" stop-color="#fb7185" stop-opacity="0.22"/>
           <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.32"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.98"/>
           <stop offset="50%" stop-color="#cbd5e1" stop-opacity="0.65"/>
           <stop offset="100%" stop-color="#fde68a" stop-opacity="0.65"/>`}
    </linearGradient>

    <linearGradient id="supTbl_smiley" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe234"/>
      <stop offset="50%" stop-color="#ffd000"/>
      <stop offset="100%" stop-color="#f5a600"/>
    </linearGradient>

    <radialGradient id="supTbl_orbRose" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fb7185" stop-opacity="${isDark ? '0.22' : '0.18'}"/>
      <stop offset="100%" stop-color="#fb7185" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="supTbl_orbAmber" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="${isDark ? '0.20' : '0.20'}"/>
      <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="supTbl_shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="${isDark ? '0.14' : '0.35'}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <filter id="supTbl_shadow" x="-10%" y="-15%" width="120%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.4" flood-color="#000000" flood-opacity="${isDark ? '0.35' : '0.10'}"/>
    </filter>
    <filter id="supTbl_smileyGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#ffd000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="${r}" fill="${isDark ? '#0b0f1a' : '#e2e8f0'}" opacity="${isDark ? '0.78' : '0.45'}" filter="url(#supTbl_shadow)"/>

  <g clip-path="url(#supTbl_clip)">
    <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="${r}" fill="url(#supTbl_bg)"/>
    <circle cx="85" cy="24" r="110" fill="url(#supTbl_orbRose)">
      <animate attributeName="cx" values="85;125;70;85" dur="12s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="24;42;18;24" dur="12s" repeatCount="indefinite"/>
    </circle>
    <circle cx="480" cy="100" r="115" fill="url(#supTbl_orbAmber)">
      <animate attributeName="cx" values="480;435;495;480" dur="14s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="100;76;108;100" dur="14s" repeatCount="indefinite"/>
    </circle>

    <!-- Header Row Tint -->
    <rect x="${pad}" y="${pad}" width="${cardW}" height="46" fill="${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.45)'}"/>

    <!-- Periodic Liquid Glass Specular Shimmer -->
    <polygon points="-80,0 18,0 -22,${height} -120,${height}" fill="url(#supTbl_shimmer)">
      <animateTransform attributeName="transform" type="translate" values="-80 0; ${width + 160} 0; ${width + 160} 0" keyTimes="0; 0.24; 1" dur="7.5s" repeatCount="indefinite"/>
    </polygon>

    <!-- Table Hairlines -->
    <line x1="${pad}" y1="${pad + 46}" x2="${pad + cardW}" y2="${pad + 46}" stroke="${dividerColor}" stroke-width="1"/>
    <line x1="${pad + 190}" y1="${pad}" x2="${pad + 190}" y2="${pad + cardH}" stroke="${dividerColor}" stroke-width="1"/>
  </g>

  <!-- Outer Glass Rim -->
  <rect x="${pad + 0.6}" y="${pad + 0.6}" width="${cardW - 1.2}" height="${cardH - 1.2}" rx="${r - 0.6}" fill="none" stroke="url(#supTbl_border)" stroke-width="1.2"/>
  <!-- Top Specular Rim Highlight -->
  <path d="M ${pad + r} ${pad + 1.4} H ${pad + cardW - r}" stroke="#ffffff" stroke-opacity="${isDark ? '0.52' : '0.96'}" stroke-width="1" stroke-linecap="round"/>

  <!-- Header Titles -->
  <text x="${pad + 22}" y="${pad + 28}" font-family="${FONT}" font-size="13.5" font-weight="700" letter-spacing="0.2" fill="${headerText}">Method</text>
  <text x="${pad + 212}" y="${pad + 28}" font-family="${FONT}" font-size="13.5" font-weight="700" letter-spacing="0.2" fill="${headerText}">Details / Direct Link</text>

  <!-- Row: SupportKori Smiley Icon -->
  <g transform="translate(${pad + 22}, ${pad + 64})" filter="url(#supTbl_smileyGlow)">
    <rect x="0" y="0" width="36" height="36" rx="10" fill="url(#supTbl_smiley)"/>
    <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
    <g transform="translate(6, 6)" fill="none" stroke="#171717" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 14s1.5 2.5 4 2.5 4-2.5 4-2.5"/>
      <circle cx="9" cy="9.5" r="1" fill="#171717" stroke="none"/>
      <circle cx="15" cy="9.5" r="1" fill="#171717" stroke="none"/>
    </g>
  </g>
  <text x="${pad + 70}" y="${pad + 87.5}" font-family="${FONT}" font-size="15.5" font-weight="700" letter-spacing="-0.15" fill="${textPrimary}">SupportKori</text>

  <!-- Row: Direct Link -->
  <text x="${pad + 212}" y="${pad + 87}" font-family="${FONT}" font-size="14" font-weight="500" fill="${linkColor}" text-decoration="underline">https://www.supportkori.com/arafathrahman</text>
</svg>`;
}

function buildSplitBadgeSvg({
  id,
  leftText,
  rightText,
  width,
  leftWidth,
  rightGradFrom,
  rightGradMid,
  rightGradTo,
  rightTextColor,
  cupColor,
  cupFilled,
  glowColor,
  mode,
}) {
  const isDark = mode === 'dark';
  const height = 46;
  const pad = 4;
  const totalW = width + pad * 2;
  const totalH = height + pad * 2;
  const r = 14;

  const leftTopHex = isDark ? '#2a2a30' : '#374151';
  const leftTopOp = isDark ? '0.78' : '0.85';
  const leftBotHex = isDark ? '#18181c' : '#1f2937';
  const leftBotOp = isDark ? '0.88' : '0.92';

  const cupMarkup = cupFilled
    ? `<path d="M5 6h12a1 1 0 0 1 1 1v1h1.5a3.5 3.5 0 0 1 0 7H18v1a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V7a1 1 0 0 1 1-1zm13 4v3h1.5a1.5 1.5 0 0 0 0-3H18zM6 3h10a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2z" fill="${cupColor}"/>`
    : `<g fill="none" stroke="${cupColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M5 8h12v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/><line x1="6" y1="4" x2="16" y2="4"/></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" role="img" aria-label="${leftText} ${rightText}">
  <defs>
    <clipPath id="${id}_clip">
      <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${r}" ry="${r}"/>
    </clipPath>

    <linearGradient id="${id}_left" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${leftTopHex}" stop-opacity="${leftTopOp}"/>
      <stop offset="100%" stop-color="${leftBotHex}" stop-opacity="${leftBotOp}"/>
    </linearGradient>

    <linearGradient id="${id}_right" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${rightGradFrom}"/>
      <stop offset="50%" stop-color="${rightGradMid}"/>
      <stop offset="100%" stop-color="${rightGradTo}"/>
    </linearGradient>

    <linearGradient id="${id}_bevel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="48%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.14"/>
    </linearGradient>

    <linearGradient id="${id}_shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <filter id="${id}_glow" x="-12%" y="-20%" width="124%" height="150%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="${glowColor}" flood-opacity="${isDark ? '0.45' : '0.30'}"/>
    </filter>
  </defs>

  <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${r}" fill="#000000" opacity="0.2" filter="url(#${id}_glow)"/>

  <g clip-path="url(#${id}_clip)">
    <!-- Left Smoked Glass Segment -->
    <rect x="${pad}" y="${pad}" width="${leftWidth}" height="${height}" fill="url(#${id}_left)"/>
    <!-- Right Colored Liquid Glass Segment -->
    <rect x="${pad + leftWidth}" y="${pad}" width="${width - leftWidth}" height="${height}" fill="url(#${id}_right)"/>
    <!-- Glossy Top Bevel Overlay -->
    <rect x="${pad}" y="${pad}" width="${width}" height="${height}" fill="url(#${id}_bevel)"/>
    <!-- Segment Glass Divider -->
    <line x1="${pad + leftWidth}" y1="${pad}" x2="${pad + leftWidth}" y2="${pad + height}" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>
    <!-- Subtle Specular Shimmer -->
    <polygon points="-50,0 10,0 -12,${totalH} -72,${totalH}" fill="url(#${id}_shimmer)">
      <animateTransform attributeName="transform" type="translate" values="-50 0; ${width + 130} 0; ${width + 130} 0" keyTimes="0; 0.22; 1" dur="6.5s" repeatCount="indefinite"/>
    </polygon>
  </g>

  <!-- Outer Liquid Glass Border & Top Rim -->
  <rect x="${pad + 0.6}" y="${pad + 0.6}" width="${width - 1.2}" height="${height - 1.2}" rx="${r - 0.6}" fill="none" stroke="rgba(255,255,255,${isDark ? '0.38' : '0.65'})" stroke-width="1.2"/>
  <path d="M ${pad + r} ${pad + 1.4} H ${pad + width - r}" stroke="#ffffff" stroke-opacity="0.65" stroke-width="1" stroke-linecap="round"/>

  <!-- Left Coffee Icon + Text -->
  <g transform="translate(${pad + 16}, ${pad + 15}) scale(0.70)">
    ${cupMarkup}
  </g>
  <text x="${pad + 41}" y="${pad + 27.5}" font-family="${FONT}" font-size="12" font-weight="600" letter-spacing="1.5" fill="#f8fafc">${leftText}</text>

  <!-- Right Segment Text -->
  <text x="${pad + leftWidth + (width - leftWidth) / 2}" y="${pad + 27.5}" text-anchor="middle" font-family="${FONT}" font-size="12.5" font-weight="800" letter-spacing="1.6" fill="${rightTextColor}">${rightText}</text>
</svg>`;
}

for (const mode of ['dark', 'light']) {
  const outDir = mode === 'dark' ? darkDir : lightDir;

  fs.writeFileSync(path.join(outDir, 'support-table.svg'), buildSupportTableSvg(mode));

  fs.writeFileSync(
    path.join(outDir, 'badge-supportkori.svg'),
    buildSplitBadgeSvg({
      id: 'bkori',
      leftText: 'SUPPORT',
      rightText: 'SUPPORTKORI',
      width: 282,
      leftWidth: 124,
      rightGradFrom: '#ff6b6b',
      rightGradMid: '#ff5252',
      rightGradTo: '#e63946',
      rightTextColor: '#ffffff',
      cupColor: '#ffffff',
      cupFilled: false,
      glowColor: '#ff5252',
      mode,
    })
  );

  fs.writeFileSync(
    path.join(outDir, 'badge-bmc.svg'),
    buildSplitBadgeSvg({
      id: 'bmc',
      leftText: 'BUY ME A COFFEE',
      rightText: 'SUPPORT ARAFATH RAHMAN',
      width: 446,
      leftWidth: 186,
      rightGradFrom: '#ffe838',
      rightGradMid: '#ffdd00',
      rightGradTo: '#f5c400',
      rightTextColor: '#0a0a0a',
      cupColor: '#fcd34d',
      cupFilled: true,
      glowColor: '#ffdd00',
      mode,
    })
  );

  fs.writeFileSync(
    path.join(outDir, 'badge-bmc-online.svg'),
    buildSplitBadgeSvg({
      id: 'bmco',
      leftText: 'BUY ME A COFFEE',
      rightText: 'BUYMEACOFFEE.COM/ARAFATHRAHMAN',
      width: 508,
      leftWidth: 186,
      rightGradFrom: '#ffe838',
      rightGradMid: '#ffdd00',
      rightGradTo: '#f5c400',
      rightTextColor: '#0a0a0a',
      cupColor: '#fcd34d',
      cupFilled: true,
      glowColor: '#ffdd00',
      mode,
    })
  );
}

console.log('Generated Liquid Glass Support / Sponsor SVGs in dark and light themes!');
