const fs = require('fs');
const path = require('path');

const USERNAME = 'smartworldarafath';
const profileDir = path.join(__dirname, '..');
const darkDir = path.join(profileDir, 'assets', 'readme', 'dark');
const lightDir = path.join(profileDir, 'assets', 'readme', 'light');

for (const d of [darkDir, lightDir]) {
  fs.mkdirSync(d, { recursive: true });
}

const FALLBACK_DATA = {
  stats: {
    stars: '307',
    commits: '1.9k',
    prs: '26',
    issues: '5',
    contribs: '18',
    grade: 'A-',
    ringDashOffset: 90.57,
  },
  streak: {
    totalContributions: '5,077',
    totalRange: 'Jan 1, 2023 - Present',
    currentStreak: '12',
    currentRange: 'Nov 17 - Nov 28',
    longestStreak: '60',
    longestRange: 'Sep 17 - Nov 15',
  },
  langs: [
    { name: 'Smali', percent: '90.12%', widthPct: 90.12, color: '#858585' },
    { name: 'Java', percent: '5.55%', widthPct: 5.55, color: '#b07219' },
    { name: 'C++', percent: '1.84%', widthPct: 1.84, color: '#f34b7d' },
    { name: 'Kotlin', percent: '0.98%', widthPct: 0.98, color: '#a97bff' },
    { name: 'Dart', percent: '0.84%', widthPct: 0.84, color: '#00b4ab' },
    { name: 'TypeScript', percent: '0.68%', widthPct: 0.68, color: '#3178c6' },
  ],
  profileViews: '985',
};

async function fetchText(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'smartworldarafath-profile-stats-generator' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractByTestId(svg, testId) {
  const re = new RegExp(`data-testid="${testId}"[^>]*>([\\s\\S]*?)<\\/text>`, 'i');
  const m = svg.match(re);
  return m ? m[1].trim() : null;
}

function parseStatsSvg(svg) {
  const stars = extractByTestId(svg, 'stars');
  const commits = extractByTestId(svg, 'commits');
  const prs = extractByTestId(svg, 'prs');
  const issues = extractByTestId(svg, 'issues');
  const contribs = extractByTestId(svg, 'contribs');
  const grade = extractByTestId(svg, 'level-rank-icon');
  const offsetMatch = svg.match(/to\s*\{\s*stroke-dashoffset:\s*([\d.]+)/i);
  const ringDashOffset = offsetMatch ? parseFloat(offsetMatch[1]) : null;

  if (!stars && !commits) return null;
  return {
    stars: stars || FALLBACK_DATA.stats.stars,
    commits: commits || FALLBACK_DATA.stats.commits,
    prs: prs || FALLBACK_DATA.stats.prs,
    issues: issues || FALLBACK_DATA.stats.issues,
    contribs: contribs || FALLBACK_DATA.stats.contribs,
    grade: grade || FALLBACK_DATA.stats.grade,
    ringDashOffset: Number.isFinite(ringDashOffset) ? ringDashOffset : FALLBACK_DATA.stats.ringDashOffset,
  };
}

function extractCommentFollowingText(svg, commentText) {
  const re = new RegExp(`<!--\\s*${commentText}\\s*-->[\\s\\S]*?<text[^>]*>([\\s\\S]*?)<\\/text>`, 'i');
  const m = svg.match(re);
  return m ? m[1].trim() : null;
}

function parseStreakSvg(svg) {
  const totalContributions = extractCommentFollowingText(svg, 'Total Contributions big number');
  const totalRange = extractCommentFollowingText(svg, 'Total Contributions range');
  const currentStreak = extractCommentFollowingText(svg, 'Current Streak big number');
  const currentRange = extractCommentFollowingText(svg, 'Current Streak range');
  const longestStreak = extractCommentFollowingText(svg, 'Longest Streak big number');
  const longestRange = extractCommentFollowingText(svg, 'Longest Streak range');

  if (!totalContributions && !currentStreak) return null;
  return {
    totalContributions: totalContributions || FALLBACK_DATA.streak.totalContributions,
    totalRange: totalRange || FALLBACK_DATA.streak.totalRange,
    currentStreak: currentStreak || FALLBACK_DATA.streak.currentStreak,
    currentRange: currentRange || FALLBACK_DATA.streak.currentRange,
    longestStreak: longestStreak || FALLBACK_DATA.streak.longestStreak,
    longestRange: longestRange || FALLBACK_DATA.streak.longestRange,
  };
}

function parseLangsSvg(svg) {
  const items = [];
  const itemRe = /<circle[^>]*fill="(#[0-9a-fA-F]{3,8})"[^>]*\/>\s*<text[^>]*data-testid="lang-name"[^>]*>([\s\S]*?)<\/text>/gi;
  let match;
  while ((match = itemRe.exec(svg)) !== null) {
    const color = match[1];
    const raw = match[2].trim();
    const pctMatch = raw.match(/^(.*?)\s+([\d.]+%)$/);
    if (pctMatch) {
      items.push({
        name: pctMatch[1].trim(),
        percent: pctMatch[2],
        widthPct: parseFloat(pctMatch[2]),
        color,
      });
    }
  }
  return items.length > 0 ? items.slice(0, 6) : null;
}

function cardChromeDefs(idPrefix, width, height, mode) {
  const isDark = mode === 'dark';
  const r = 22;
  const pad = 4;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;

  return `
    <clipPath id="${idPrefix}_clip">
      <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="${r}" ry="${r}"/>
    </clipPath>

    <linearGradient id="${idPrefix}_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.105"/>
           <stop offset="48%" stop-color="#1a1b27" stop-opacity="0.68"/>
           <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.88"/>
           <stop offset="52%" stop-color="#f1f5f9" stop-opacity="0.78"/>
           <stop offset="100%" stop-color="#e2e8f0" stop-opacity="0.72"/>`}
    </linearGradient>

    <linearGradient id="${idPrefix}_spec" x1="0%" y1="0%" x2="0%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
           <stop offset="22%" stop-color="#ffffff" stop-opacity="0.04"/>
           <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
           <stop offset="100%" stop-color="#70a5fd" stop-opacity="0.06"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
           <stop offset="30%" stop-color="#ffffff" stop-opacity="0.12"/>
           <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.04"/>`}
    </linearGradient>

    <linearGradient id="${idPrefix}_rim" x1="0%" y1="0%" x2="100%" y2="100%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
           <stop offset="32%" stop-color="#70a5fd" stop-opacity="0.32"/>
           <stop offset="68%" stop-color="#bf91f3" stop-opacity="0.28"/>
           <stop offset="100%" stop-color="#38bdae" stop-opacity="0.42"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.98"/>
           <stop offset="35%" stop-color="#93c5fd" stop-opacity="0.55"/>
           <stop offset="70%" stop-color="#c4b5fd" stop-opacity="0.45"/>
           <stop offset="100%" stop-color="#5eead4" stop-opacity="0.55"/>`}
    </linearGradient>

    <radialGradient id="${idPrefix}_orbBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#70a5fd" stop-opacity="${isDark ? '0.24' : '0.22'}"/>
      <stop offset="100%" stop-color="#70a5fd" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${idPrefix}_orbPurple" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#bf91f3" stop-opacity="${isDark ? '0.22' : '0.20'}"/>
      <stop offset="100%" stop-color="#bf91f3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${idPrefix}_orbTeal" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdae" stop-opacity="${isDark ? '0.18' : '0.18'}"/>
      <stop offset="100%" stop-color="#38bdae" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="${idPrefix}_well" cx="34%" cy="28%" r="72%">
      ${isDark
        ? `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.11"/>
           <stop offset="65%" stop-color="#0b1020" stop-opacity="0.25"/>
           <stop offset="100%" stop-color="#000000" stop-opacity="0.36"/>`
        : `<stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
           <stop offset="70%" stop-color="#e2e8f0" stop-opacity="0.5"/>
           <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.45"/>`}
    </radialGradient>

    <linearGradient id="${idPrefix}_ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${isDark ? '#9cc2ff' : '#60a5fa'}"/>
      <stop offset="55%" stop-color="${isDark ? '#70a5fd' : '#3b82f6'}"/>
      <stop offset="100%" stop-color="${isDark ? '#5b8def' : '#2563eb'}"/>
    </linearGradient>

    <filter id="${idPrefix}_cardShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="#000000" flood-opacity="${isDark ? '0.35' : '0.10'}"/>
    </filter>
    <filter id="${idPrefix}_glowSoft" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#70a5fd" flood-opacity="${isDark ? '0.45' : '0.22'}"/>
    </filter>
    <linearGradient id="${idPrefix}_shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="${isDark ? '0.12' : '0.34'}"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  `;
}

function cardChromeBody(idPrefix, width, height, mode) {
  const isDark = mode === 'dark';
  const r = 22;
  const pad = 4;
  const cardW = width - pad * 2;
  const cardH = height - pad * 2;
  const ox1 = Math.round(width * 0.16);
  const oy1 = Math.round(height * 0.18);
  const ox2 = Math.round(width * 0.86);
  const oy2 = Math.round(height * 0.85);
  const ox3 = Math.round(width * 0.52);
  const oy3 = Math.round(height * 0.55);

  return `
    <!-- Base Drop Shadow -->
    <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="${r}" fill="${isDark ? '#0b0f1a' : '#e2e8f0'}" opacity="${isDark ? '0.78' : '0.45'}" filter="url(#${idPrefix}_cardShadow)"/>

    <!-- Clipped Liquid Glass Interior -->
    <g clip-path="url(#${idPrefix}_clip)">
      <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="${r}" fill="url(#${idPrefix}_bg)"/>
      <!-- Ambient Liquid Refraction Orbs (continuous gentle drift) -->
      <circle cx="${ox1}" cy="${oy1}" r="${Math.round(width * 0.28)}" fill="url(#${idPrefix}_orbBlue)">
        <animate attributeName="cx" values="${ox1};${ox1 + 28};${ox1 - 16};${ox1}" dur="14s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="${oy1};${oy1 + 20};${oy1 - 12};${oy1}" dur="14s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${ox2}" cy="${oy2}" r="${Math.round(width * 0.26)}" fill="url(#${idPrefix}_orbPurple)">
        <animate attributeName="cx" values="${ox2};${ox2 - 26};${ox2 + 14};${ox2}" dur="16s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="${oy2};${oy2 - 18};${oy2 + 12};${oy2}" dur="16s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${ox3}" cy="${oy3}" r="${Math.round(width * 0.24)}" fill="url(#${idPrefix}_orbTeal)">
        <animate attributeName="cx" values="${ox3};${ox3 + 22};${ox3 - 22};${ox3}" dur="12s" repeatCount="indefinite"/>
      </circle>
      <!-- Specular Curved Reflection -->
      <rect x="${pad}" y="${pad}" width="${cardW}" height="${cardH}" rx="${r}" fill="url(#${idPrefix}_spec)"/>
      <!-- Periodic Specular Shimmer Sweep -->
      <polygon points="-90,0 16,0 -26,${height} -132,${height}" fill="url(#${idPrefix}_shimmer)">
        <animateTransform attributeName="transform" type="translate" values="-90 0; ${width + 180} 0; ${width + 180} 0" keyTimes="0; 0.22; 1" dur="8s" repeatCount="indefinite"/>
      </polygon>
    </g>

    <!-- Chromatic Rim Border -->
    <rect x="${pad + 0.6}" y="${pad + 0.6}" width="${cardW - 1.2}" height="${cardH - 1.2}" rx="${r - 0.6}" fill="none" stroke="url(#${idPrefix}_rim)" stroke-width="1.2"/>
    <!-- Top Specular Highlight Line -->
    <path d="M ${pad + r + 8} ${pad + 1.4} H ${pad + cardW - r - 8}" stroke="#ffffff" stroke-opacity="${isDark ? '0.52' : '0.95'}" stroke-width="1" stroke-linecap="round"/>
  `;
}

function buildGithubStatsSvg(data, mode) {
  const isDark = mode === 'dark';
  const width = 436;
  const height = 206;
  const titleColor = isDark ? '#70a5fd' : '#1d4ed8';
  const tealColor = isDark ? '#38bdae' : '#0f766e';
  const iconColor = isDark ? '#bf91f3' : '#7c3aed';
  const trackColor = isDark ? 'rgba(112, 165, 253, 0.18)' : 'rgba(59, 130, 246, 0.16)';
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const rows = [
    {
      label: 'Total Stars Earned:',
      value: data.stars,
      icon: `<path d="M8 1.75l1.93 3.91 4.32.63-3.12 3.04.74 4.3L8 11.6l-3.87 2.03.74-4.3-3.12-3.04 4.32-.63L8 1.75z" fill="none" stroke="${iconColor}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      label: 'Total Commits:',
      value: data.commits,
      icon: `<path d="M1.75 8a6.25 6.25 0 1 0 1.4-3.95" fill="none" stroke="${iconColor}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.75 2.5v2.75H4.5M8 4.75V8l2.25 1.5" fill="none" stroke="${iconColor}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      label: 'Total PRs:',
      value: data.prs,
      icon: `<circle cx="4.5" cy="3.5" r="1.75" fill="none" stroke="${iconColor}" stroke-width="1.4"/><circle cx="4.5" cy="12.5" r="1.75" fill="none" stroke="${iconColor}" stroke-width="1.4"/><circle cx="11.5" cy="12.5" r="1.75" fill="none" stroke="${iconColor}" stroke-width="1.4"/><path d="M4.5 5.25v5.5M11.5 10.75V6.5a2 2 0 0 0-2-2H7.5M9 3l-1.5 1.5L9 6" fill="none" stroke="${iconColor}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
    {
      label: 'Total Issues:',
      value: data.issues,
      icon: `<circle cx="8" cy="8" r="6.25" fill="none" stroke="${iconColor}" stroke-width="1.4"/><path d="M8 4.75v3.75" fill="none" stroke="${iconColor}" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="11.25" r="0.65" fill="${iconColor}"/>`,
    },
    {
      label: 'Contributed to (last year):',
      value: data.contribs,
      icon: `<path d="M3.25 2.25h9.5a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1v-9.5a1 1 0 0 1 1-1zM2.25 10.75h11.5M5.5 2.25v8.5" fill="none" stroke="${iconColor}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    },
  ];

  const rowsMarkup = rows
    .map((row, idx) => {
      const y = 66 + idx * 25;
      return `
      <g transform="translate(26, ${y})">
        <g transform="translate(0, -12)">${row.icon}</g>
        <text x="24" y="0" font-family="${font}" font-size="13.5" font-weight="600" fill="${tealColor}">${escapeXml(row.label)}</text>
        <text x="228" y="0" font-family="${font}" font-size="13.5" font-weight="700" fill="${tealColor}">${escapeXml(row.value)}</text>
      </g>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Arafath Rahman's GitHub Stats">
  <defs>
    <style>
      @keyframes lg-draw-ring {
        from { stroke-dashoffset: 251.2; }
        to { stroke-dashoffset: ${data.ringDashOffset.toFixed(2)}; }
      }
      .ring-progress {
        animation: lg-draw-ring 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
    </style>
    ${cardChromeDefs('gs', width, height, mode)}
  </defs>

  ${cardChromeBody('gs', width, height, mode)}

  <!-- Card Title -->
  <text x="26" y="38" font-family="${font}" font-size="16.5" font-weight="700" letter-spacing="-0.2" fill="${titleColor}">Arafath Rahman&apos;s GitHub Stats</text>

  <!-- Stats List -->
  ${rowsMarkup}

  <!-- Right Circular Grade Ring Inside Glass Well -->
  <g transform="translate(362, 118)">
    <circle cx="0" cy="0" r="46" fill="url(#gs_well)" stroke="${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(148,163,184,0.28)'}" stroke-width="1"/>
    <g transform="rotate(-90)" filter="url(#gs_glowSoft)">
      <circle cx="0" cy="0" r="39" fill="none" stroke="${trackColor}" stroke-width="6"/>
      <circle cx="0" cy="0" r="39" fill="none" stroke="url(#gs_ringGrad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="251.2" stroke-dashoffset="${data.ringDashOffset.toFixed(2)}" class="ring-progress"/>
    </g>
    <text x="0" y="9" text-anchor="middle" font-family="${font}" font-size="25" font-weight="800" fill="${tealColor}">${escapeXml(data.grade)}</text>
  </g>
</svg>`;
}

function buildStreakSvg(data, mode) {
  const isDark = mode === 'dark';
  const width = 446;
  const height = 206;
  const blueColor = isDark ? '#70a5fd' : '#1d4ed8';
  const purpleColor = isDark ? '#bf91f3' : '#7c3aed';
  const tealColor = isDark ? '#38bdae' : '#0f766e';
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="GitHub Streak Stats">
  <defs>
    ${cardChromeDefs('st', width, height, mode)}
    <linearGradient id="st_divider" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${isDark ? '#ffffff' : '#64748b'}" stop-opacity="0"/>
      <stop offset="22%" stop-color="${isDark ? '#ffffff' : '#64748b'}" stop-opacity="${isDark ? '0.30' : '0.24'}"/>
      <stop offset="78%" stop-color="${isDark ? '#ffffff' : '#64748b'}" stop-opacity="${isDark ? '0.30' : '0.24'}"/>
      <stop offset="100%" stop-color="${isDark ? '#ffffff' : '#64748b'}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  ${cardChromeBody('st', width, height, mode)}

  <!-- Etched Vertical Glass Dividers -->
  <rect x="148" y="30" width="1" height="146" fill="url(#st_divider)"/>
  <rect x="297" y="30" width="1" height="146" fill="url(#st_divider)"/>

  <!-- Column 1: Total Contributions -->
  <g transform="translate(76, 103)" text-anchor="middle">
    <text x="0" y="-12" font-family="${font}" font-size="28" font-weight="800" fill="${blueColor}">${escapeXml(data.totalContributions)}</text>
    <text x="0" y="14" font-family="${font}" font-size="13" font-weight="600" fill="${blueColor}">Total Contributions</text>
    <text x="0" y="36" font-family="${font}" font-size="11.5" font-weight="500" fill="${tealColor}">${escapeXml(data.totalRange)}</text>
  </g>

  <!-- Column 2: Current Streak -->
  <g transform="translate(223, 82)" text-anchor="middle">
    <!-- Inner Liquid Glass Well -->
    <circle cx="0" cy="0" r="38" fill="url(#st_well)" stroke="${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(148,163,184,0.28)'}" stroke-width="1"/>
    <!-- Ring with top gap for flame -->
    <circle cx="0" cy="0" r="39" fill="none" stroke="url(#st_ringGrad)" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="210 36" transform="rotate(-64)" filter="url(#st_glowSoft)"/>
    <!-- Flame Icon sitting in top gap -->
    <g transform="translate(-11, -50)" filter="url(#st_glowSoft)">
      <path d="M12.9 2.3c.2 2.4-1.3 4.2-2.8 5.6-1.4 1.3-2.6 2.8-2.6 5.1 0 2.7 2.1 5 4.8 5 3.1 0 5.4-2.5 5.4-5.9 0-2.6-1.3-4.9-2.8-6.6-.2 1.2-.8 2.2-1.7 2.8.5-2.1.4-4.2-.3-6zm-.6 13.7c-1.4 0-2.5-1.1-2.5-2.5 0-1.1.6-2 1.6-2.9.8-.7 1.4-1.4 1.7-2.2.8 1.2 1.5 2.5 1.5 4.2 0 1.9-1 3.4-2.3 3.4z" fill="${blueColor}">
        <animate attributeName="opacity" values="0.78;1;0.78" dur="2.2s" repeatCount="indefinite"/>
      </path>
    </g>
    <text x="0" y="9" font-family="${font}" font-size="27" font-weight="800" fill="${purpleColor}">${escapeXml(data.currentStreak)}</text>
    <text x="0" y="61" font-family="${font}" font-size="13.5" font-weight="700" fill="${purpleColor}">Current Streak</text>
    <text x="0" y="81" font-family="${font}" font-size="11.5" font-weight="500" fill="${tealColor}">${escapeXml(data.currentRange)}</text>
  </g>

  <!-- Column 3: Longest Streak -->
  <g transform="translate(370, 103)" text-anchor="middle">
    <text x="0" y="-12" font-family="${font}" font-size="28" font-weight="800" fill="${blueColor}">${escapeXml(data.longestStreak)}</text>
    <text x="0" y="14" font-family="${font}" font-size="13" font-weight="600" fill="${blueColor}">Longest Streak</text>
    <text x="0" y="36" font-family="${font}" font-size="11.5" font-weight="500" fill="${tealColor}">${escapeXml(data.longestRange)}</text>
  </g>
</svg>`;
}

function buildLangsSvg(langs, mode) {
  const isDark = mode === 'dark';
  const width = 440;
  const height = 200;
  const titleColor = isDark ? '#70a5fd' : '#1d4ed8';
  const tealColor = isDark ? '#38bdae' : '#0f766e';
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const barX = 28;
  const barY = 58;
  const barW = 384;
  const barH = 11;

  // Build stacked segments with proportional widths (ensuring tiny slices stay visible)
  const totalPct = langs.reduce((acc, item) => acc + item.widthPct, 0) || 100;
  let cursorX = barX;
  const segments = langs
    .map((item, idx) => {
      const segW = idx === langs.length - 1 ? Math.max(0, barX + barW - cursorX) : (item.widthPct / totalPct) * barW;
      const rect = `<rect x="${cursorX.toFixed(2)}" y="${barY}" width="${Math.max(segW, 2).toFixed(2)}" height="${barH}" fill="${item.color}"/>`;
      cursorX += segW;
      return rect;
    })
    .join('');

  // 2-column grid (3 left, 3 right)
  const leftItems = langs.slice(0, 3);
  const rightItems = langs.slice(3, 6);

  const renderCol = (items, colX) =>
    items
      .map((item, idx) => {
        const rowY = 104 + idx * 28;
        return `
        <g transform="translate(${colX}, ${rowY})">
          <circle cx="6" cy="-4.5" r="5.5" fill="${item.color}"/>
          <circle cx="4.5" cy="-6" r="1.8" fill="#ffffff" opacity="0.45"/>
          <text x="19" y="0" font-family="${font}" font-size="13.5" font-weight="600" fill="${tealColor}">${escapeXml(item.name)} ${escapeXml(item.percent)}</text>
        </g>`;
      })
      .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Most Used Languages">
  <defs>
    ${cardChromeDefs('lg', width, height, mode)}
    <clipPath id="lg_barClip">
      <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="5.5" ry="5.5"/>
    </clipPath>
    <linearGradient id="lg_barSheen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.42"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.22"/>
    </linearGradient>
  </defs>

  ${cardChromeBody('lg', width, height, mode)}

  <!-- Card Title -->
  <text x="28" y="38" font-family="${font}" font-size="16.5" font-weight="700" letter-spacing="-0.2" fill="${titleColor}">Most Used Languages</text>

  <!-- Liquid Glass Stacked Language Track -->
  <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="5.5" fill="${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'}"/>
  <g clip-path="url(#lg_barClip)">
    ${segments}
    <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" fill="url(#lg_barSheen)"/>
  </g>
  <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="5.5" fill="none" stroke="${isDark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)'}" stroke-width="0.8"/>

  <!-- 2-Column Languages Grid -->
  ${renderCol(leftItems, 28)}
  ${renderCol(rightItems, 224)}
</svg>`;
}

function parseProfileViewsSvg(svg) {
  const matches = [...svg.matchAll(/<text[^>]*>([^<]+)<\/text>/gi)].map((m) => m[1].trim());
  const count = [...matches].reverse().find((val) => /^[\d,]+$/.test(val));
  return count || null;
}

function buildProfileViewsBadgeSvg(views, mode) {
  const isDark = mode === 'dark';
  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const leftWidth = 128;
  const rightWidth = Math.max(54, 24 + String(views).length * 9);
  const width = leftWidth + rightWidth;
  const height = 36;
  const pad = 3;
  const totalW = width + pad * 2;
  const totalH = height + pad * 2;
  const r = 12;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}" role="img" aria-label="Profile Views ${escapeXml(views)}">
  <defs>
    <clipPath id="pv_clip">
      <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${r}" ry="${r}"/>
    </clipPath>

    <linearGradient id="pv_left" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${isDark ? '#2a2a36' : '#334155'}" stop-opacity="${isDark ? '0.82' : '0.88'}"/>
      <stop offset="100%" stop-color="${isDark ? '#141824' : '#1e293b'}" stop-opacity="${isDark ? '0.90' : '0.94'}"/>
    </linearGradient>

    <linearGradient id="pv_right" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8bb8fe"/>
      <stop offset="50%" stop-color="#70a5fd"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>

    <linearGradient id="pv_bevel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.14"/>
    </linearGradient>

    <linearGradient id="pv_shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>

    <filter id="pv_glow" x="-15%" y="-25%" width="130%" height="150%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#70a5fd" flood-opacity="${isDark ? '0.45' : '0.30'}"/>
    </filter>
  </defs>

  <rect x="${pad}" y="${pad}" width="${width}" height="${height}" rx="${r}" fill="#000000" opacity="0.18" filter="url(#pv_glow)"/>

  <g clip-path="url(#pv_clip)">
    <rect x="${pad}" y="${pad}" width="${leftWidth}" height="${height}" fill="url(#pv_left)"/>
    <rect x="${pad + leftWidth}" y="${pad}" width="${rightWidth}" height="${height}" fill="url(#pv_right)"/>
    <rect x="${pad}" y="${pad}" width="${width}" height="${height}" fill="url(#pv_bevel)"/>
    <line x1="${pad + leftWidth}" y1="${pad}" x2="${pad + leftWidth}" y2="${pad + height}" stroke="#ffffff" stroke-opacity="0.28" stroke-width="1"/>
    <polygon points="-40,0 8,0 -10,${totalH} -58,${totalH}" fill="url(#pv_shimmer)">
      <animateTransform attributeName="transform" type="translate" values="-40 0; ${width + 110} 0; ${width + 110} 0" keyTimes="0; 0.22; 1" dur="7s" begin="1.8s" repeatCount="indefinite"/>
    </polygon>
  </g>

  <rect x="${pad + 0.6}" y="${pad + 0.6}" width="${width - 1.2}" height="${height - 1.2}" rx="${r - 0.6}" fill="none" stroke="#ffffff" stroke-opacity="${isDark ? '0.38' : '0.68'}" stroke-width="1.2"/>
  <path d="M ${pad + r} ${pad + 1.3} H ${pad + width - r}" stroke="#ffffff" stroke-opacity="0.68" stroke-width="1" stroke-linecap="round"/>

  <!-- Eye Icon -->
  <g transform="translate(${pad + 12}, ${pad + 11}) scale(0.60)" fill="none" stroke="#9cc2ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </g>
  <text x="${pad + 32}" y="${pad + 22}" font-family="${font}" font-size="11" font-weight="600" letter-spacing="0.6" fill="#f8fafc">PROFILE VIEWS</text>
  <text x="${pad + leftWidth + rightWidth / 2}" y="${pad + 22.5}" text-anchor="middle" font-family="${font}" font-size="12.5" font-weight="800" fill="#071224">${escapeXml(views)}</text>
</svg>`;
}

async function main() {
  let stats = FALLBACK_DATA.stats;
  let streak = FALLBACK_DATA.streak;
  let langs = FALLBACK_DATA.langs;
  let profileViews = FALLBACK_DATA.profileViews;

  try {
    const statsSvg = await fetchText(
      `https://github-readme-stats-fast.vercel.app/api?username=${USERNAME}&theme=tokyonight&hide_border=false&show_icons=true&include_all_commits=true`
    );
    const parsedStats = parseStatsSvg(statsSvg);
    if (parsedStats) stats = parsedStats;
  } catch (err) {
    console.warn('Using fallback stats data:', err.message);
  }

  try {
    const streakSvg = await fetchText(
      `https://streak-stats.demolab.com?user=${USERNAME}&theme=tokyonight&hide_border=false`
    );
    const parsedStreak = parseStreakSvg(streakSvg);
    if (parsedStreak) streak = parsedStreak;
  } catch (err) {
    console.warn('Using fallback streak data:', err.message);
  }

  try {
    const langsSvg = await fetchText(
      `https://github-readme-stats-fast.vercel.app/api/top-langs?username=${USERNAME}&theme=tokyonight&hide_border=false&layout=compact`
    );
    const parsedLangs = parseLangsSvg(langsSvg);
    if (parsedLangs) langs = parsedLangs;
  } catch (err) {
    console.warn('Using fallback languages data:', err.message);
  }

  try {
    const viewsSvg = await fetchText(
      `https://komarev.com/ghpvc/?username=${USERNAME}&color=70a5fd&style=flat-square&label=Profile+Views`
    );
    const parsedViews = parseProfileViewsSvg(viewsSvg);
    if (parsedViews) profileViews = parsedViews;
  } catch (err) {
    console.warn('Using fallback profile views data:', err.message);
  }

  for (const mode of ['dark', 'light']) {
    const outDir = mode === 'dark' ? darkDir : lightDir;
    fs.writeFileSync(path.join(outDir, 'stats-github.svg'), buildGithubStatsSvg(stats, mode));
    fs.writeFileSync(path.join(outDir, 'stats-streak.svg'), buildStreakSvg(streak, mode));
    fs.writeFileSync(path.join(outDir, 'stats-langs.svg'), buildLangsSvg(langs, mode));
    fs.writeFileSync(path.join(outDir, 'badge-profile-views.svg'), buildProfileViewsBadgeSvg(profileViews, mode));
  }

  const docsDir = path.join(profileDir, 'docs');
  fs.mkdirSync(docsDir, { recursive: true });
  const statsPayload = {
    updatedAt: new Date().toISOString(),
    stats,
    streak,
    langs,
    profileViews,
  };
  fs.writeFileSync(
    path.join(docsDir, 'stats-data.js'),
    `window.PROFILE_STATS = ${JSON.stringify(statsPayload, null, 2)};\n`
  );

  console.log('Generated Liquid Glass GitHub stats SVGs:', { stats, streak, langsCount: langs.length, profileViews });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
