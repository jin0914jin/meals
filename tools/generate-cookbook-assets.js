const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '..', 'assets', 'cookbook-ui')
fs.mkdirSync(outDir, { recursive: true })

function save(name, svg) {
  fs.writeFileSync(path.join(outDir, name), svg.trim() + '\n', 'utf8')
}

function svg(width, height, body, defs = '') {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  ${defs}
  ${body}
</svg>`
}

const paperDefs = `
<defs>
  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
    <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#6b4a2c" flood-opacity="0.16"/>
  </filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="table" tableValues="0 0.08"/>
    </feComponentTransfer>
  </filter>
  <linearGradient id="warmPaper" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#fff9ea"/>
    <stop offset="1" stop-color="#f3dfba"/>
  </linearGradient>
  <linearGradient id="tealButton" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#28cfc1"/>
    <stop offset="1" stop-color="#10a99d"/>
  </linearGradient>
  <linearGradient id="yellowButton" x1="0" y1="0" x2="0" y2="1">
    <stop stop-color="#ffe082"/>
    <stop offset="1" stop-color="#f7be31"/>
  </linearGradient>
</defs>`

save('page-bg.svg', svg(750, 1334, `
  <rect width="750" height="1334" fill="#fbf4e6"/>
  <path d="M0 0H750V1334H0z" fill="url(#ricePattern)" opacity=".42"/>
  <path d="M-40 210C110 155 202 269 360 216C518 163 620 207 790 142" stroke="#f1d8aa" stroke-width="18" stroke-linecap="round" opacity=".22"/>
  <path d="M-80 980C86 895 202 1030 354 960C536 876 608 952 820 846" stroke="#cbe9df" stroke-width="20" stroke-linecap="round" opacity=".2"/>
  <circle cx="95" cy="88" r="5" fill="#f1c96b" opacity=".38"/>
  <circle cx="650" cy="302" r="7" fill="#53c7b9" opacity=".22"/>
  <circle cx="514" cy="1190" r="6" fill="#f1c96b" opacity=".34"/>
`, `
<defs>
  <pattern id="ricePattern" width="86" height="70" patternUnits="userSpaceOnUse">
    <ellipse cx="19" cy="14" rx="3.5" ry="9" fill="#e9c98c" opacity=".35" transform="rotate(-24 19 14)"/>
    <ellipse cx="68" cy="42" rx="3" ry="8" fill="#7bcfc3" opacity=".2" transform="rotate(28 68 42)"/>
    <path d="M41 61c10-8 18-8 28 0" stroke="#e5b85d" stroke-width="2" stroke-linecap="round" opacity=".22"/>
  </pattern>
</defs>`))

save('hanging-sign.svg', svg(340, 118, `
  <path d="M64 18C70 6 82 1 97 4l139 3c22 1 43 8 56 22 18 20 13 49-1 65-13 15-43 21-79 18l-121-3C54 108 26 94 19 70 12 48 32 26 64 18Z" fill="#c97932" filter="url(#softShadow)"/>
  <path d="M68 25C74 15 89 12 105 15l132 3c18 1 35 7 45 18 11 13 9 34-2 45-13 12-34 17-66 14l-119-3C63 91 38 81 33 62 28 46 45 30 68 25Z" fill="#e19a48"/>
  <path d="M47 53c52 9 109 12 171 8 32-2 55 1 69 8" stroke="#a95b22" stroke-width="5" stroke-linecap="round" opacity=".35"/>
  <path d="M73 31c42 9 100 13 173 9" stroke="#f4c278" stroke-width="4" stroke-linecap="round" opacity=".56"/>
  <circle cx="87" cy="33" r="8" fill="#70411f"/>
  <circle cx="257" cy="38" r="8" fill="#70411f"/>
  <path d="M87 33C108 6 139-1 170 13M257 38C233 8 201 0 170 13" stroke="#7b4b2a" stroke-width="5" stroke-linecap="round"/>
  <path d="M285 83c-16 7-25 17-27 30 18-3 29-11 32-28 7 9 17 13 30 13-5-15-16-23-35-15Z" fill="#2ebfac" stroke="#167d73" stroke-width="4" stroke-linejoin="round"/>
  <path d="M285 84c-1 15-8 24-20 29" stroke="#e7fff8" stroke-width="3" stroke-linecap="round" opacity=".65"/>
`, paperDefs))

save('search-shell.svg', svg(680, 96, `
  <rect x="8" y="8" width="664" height="74" rx="37" fill="#d5b98a"/>
  <rect x="8" y="4" width="664" height="74" rx="37" fill="#fffdf7" stroke="#decba7" stroke-width="4"/>
  <rect x="20" y="17" width="640" height="44" rx="22" fill="#f9edcf" opacity=".7"/>
  <path d="M48 66c144 14 286 13 428 0" stroke="#eadcbf" stroke-width="4" stroke-linecap="round" opacity=".7"/>
`))

save('category-panel.svg', svg(680, 226, `
  <path d="M40 35C80 9 140 18 176 30c52-28 114-20 151 2 50-21 107-19 151 4 45-18 98-10 132 19 27 23 31 56 22 80 15 36 0 66-35 82H76c-36-12-53-39-44-75-23-28-19-78 8-107Z" fill="#d2bc91" opacity=".9"/>
  <path d="M44 27C86 4 139 14 176 28c50-27 111-20 149 4 51-22 111-18 149 5 49-19 101-8 129 22 25 27 25 61 10 85 13 31-1 57-37 70H83c-34-11-50-38-39-69-23-29-21-86 0-118Z" fill="url(#warmPaper)" stroke="#d8bd88" stroke-width="5"/>
  <path d="M74 63h531M77 174h526" stroke="#e5cb99" stroke-width="4" stroke-dasharray="11 12" stroke-linecap="round"/>
  <circle cx="85" cy="55" r="7" fill="#7bcfc3" opacity=".42"/>
  <circle cx="594" cy="166" r="7" fill="#f2c35a" opacity=".48"/>
  <rect width="680" height="226" filter="url(#grain)" opacity=".5"/>
`, paperDefs))

save('category-button.svg', svg(190, 92, `
  <rect x="7" y="12" width="176" height="70" rx="35" fill="#d7c29c"/>
  <rect x="7" y="7" width="176" height="70" rx="35" fill="#fff7df" stroke="#e1c998" stroke-width="4"/>
  <path d="M32 25c32 9 84 8 126-1" stroke="#fffdfa" stroke-width="5" stroke-linecap="round" opacity=".65"/>
  <path d="M41 65c31 5 74 4 108-1" stroke="#dfc28d" stroke-width="4" stroke-linecap="round" opacity=".55"/>
`))

save('decision-board.svg', svg(680, 252, `
  <path d="M42 25C95 5 152 17 195 34c68-28 133-25 188 4 58-21 128-11 183 22 37 23 49 57 39 96 17 33 3 65-33 82H72c-42-16-57-47-43-86C10 104 17 52 42 25Z" fill="#b9874a" opacity=".62"/>
  <path d="M45 17C100-2 154 12 196 31c70-28 134-23 187 7 59-22 128-10 181 24 34 22 43 56 31 93 15 31 0 59-35 74H79c-38-15-52-44-37-81C24 103 22 48 45 17Z" fill="#fff3cf" stroke="#d7a65f" stroke-width="5"/>
  <path d="M70 60c116 23 242 18 378-8 40-8 80-1 119 17" stroke="#f7d98f" stroke-width="9" stroke-linecap="round" opacity=".58"/>
  <path d="M514 72c18 5 28 18 30 37 1 16-8 28-25 35-7-15-8-30-4-45-15 3-28 1-39-6 10-16 23-23 38-21Z" fill="#23b6a8" opacity=".78"/>
  <path d="M562 155c19 0 34 13 34 30H483c0-17 16-30 35-30h44Z" fill="#f8c752" stroke="#9c6a2c" stroke-width="5"/>
  <path d="M505 148h68" stroke="#9c6a2c" stroke-width="6" stroke-linecap="round"/>
  <rect width="680" height="252" filter="url(#grain)" opacity=".5"/>
`, paperDefs))

save('button-yellow.svg', svg(260, 86, `
  <rect x="8" y="17" width="244" height="61" rx="30.5" fill="#b98935"/>
  <rect x="8" y="8" width="244" height="61" rx="30.5" fill="url(#yellowButton)" stroke="#b8741c" stroke-width="4"/>
  <path d="M38 25c50 13 117 11 178-2" stroke="#fff2b7" stroke-width="6" stroke-linecap="round" opacity=".75"/>
`, paperDefs))

save('button-teal.svg', svg(260, 86, `
  <rect x="8" y="17" width="244" height="61" rx="30.5" fill="#0a746e"/>
  <rect x="8" y="8" width="244" height="61" rx="30.5" fill="url(#tealButton)" stroke="#08766e" stroke-width="4"/>
  <path d="M38 25c50 13 117 11 178-2" stroke="#bafff6" stroke-width="6" stroke-linecap="round" opacity=".62"/>
`, paperDefs))

save('recipe-card.svg', svg(680, 160, `
  <path d="M22 24c32-14 80-9 107 2 50-22 108-20 151 1 67-20 139-18 200 4 42-16 101-7 133 24 24 24 24 57 4 81-35 17-98 21-147 5-53 19-123 20-186 2-48 18-118 15-157-6-39 12-82 7-105-13-24-21-25-75 0-100Z" fill="#d6bd8b"/>
  <path d="M24 17c33-14 80-8 106 5 50-23 109-20 151 1 67-21 138-17 199 5 43-16 99-6 130 25 21 22 21 51 2 72-35 17-93 20-141 3-54 19-126 20-188 2-49 18-118 14-156-7-38 13-80 6-103-14-22-19-22-69 0-92Z" fill="#fffdf7" stroke="#e3c999" stroke-width="5"/>
  <path d="M368 46c88 7 161 4 219-8" stroke="#f1dec0" stroke-width="7" stroke-linecap="round"/>
  <path d="M373 103c71 5 133 3 186-6" stroke="#e8d6b9" stroke-width="6" stroke-linecap="round"/>
  <rect width="680" height="160" filter="url(#grain)" opacity=".42"/>
`, paperDefs))

save('image-frame.svg', svg(340, 146, `
  <rect x="5" y="5" width="330" height="136" rx="19" stroke="#fff7df" stroke-width="10"/>
  <rect x="12" y="12" width="316" height="122" rx="14" stroke="#d4a760" stroke-width="4" stroke-dasharray="10 9" opacity=".82"/>
`))

save('popup-panel.svg', svg(690, 720, `
  <path d="M38 63C95 8 162 22 205 36c61-34 147-35 205 0 76-26 167-9 219 60 41 55 21 131 3 180 36 88 9 179-64 228 4 75-47 146-133 164-64 14-118-4-159-24-60 29-154 23-204-26-47-46-52-109-36-164-38-72-32-149 12-199C19 184-16 116 38 63Z" fill="#caa878" opacity=".5"/>
  <path d="M42 50C98 3 160 18 204 34c61-35 144-35 204 1 75-26 161-5 214 62 37 48 21 119 4 172 34 84 7 169-63 215 4 73-46 137-129 154-63 13-116-5-157-26-59 30-148 23-196-23-46-44-51-104-35-158-38-69-31-140 12-188C29 176-11 97 42 50Z" fill="url(#warmPaper)" stroke="#d6b06e" stroke-width="6"/>
  <path d="M96 88c114 34 255 29 413-4" stroke="#fff9e7" stroke-width="10" stroke-linecap="round" opacity=".65"/>
  <path d="M108 627c143 22 308 20 456-8" stroke="#dfbe84" stroke-width="6" stroke-linecap="round" opacity=".4"/>
  <rect width="690" height="720" filter="url(#grain)" opacity=".52"/>
`, paperDefs))

save('wave-rice.svg', svg(680, 32, `
  <path d="M4 18c37-22 73-22 110 0s73 22 110 0 73-22 110 0 73 22 110 0 73-22 110 0 73 22 122 0" stroke="#f2c75b" stroke-width="10" stroke-linecap="round"/>
  <path d="M22 20c29-13 55-13 83 1" stroke="#fff1ad" stroke-width="4" stroke-linecap="round" opacity=".55"/>
`))

save('divider-herb.svg', svg(180, 20, `
  <path d="M5 10h170" stroke="#1aa79b" stroke-width="5" stroke-linecap="round"/>
  <path d="M38 10c10-11 22-13 36-6-6 11-18 14-36 6ZM111 10c12-11 25-12 39-4-8 12-21 13-39 4Z" fill="#22c5b6"/>
  <circle cx="90" cy="10" r="6" fill="#f7c744"/>
`))

save('icon-sprout.svg', svg(64, 64, `
  <path d="M31 51c-1-16 2-28 11-37" stroke="#1f7d58" stroke-width="5" stroke-linecap="round"/>
  <path d="M30 28C17 17 13 9 17 5c12 0 23 8 28 22-7 4-12 5-15 1Z" fill="#23b889" stroke="#126b51" stroke-width="4" stroke-linejoin="round"/>
  <path d="M36 31c10-12 20-17 30-15 2 12-7 22-25 28-5-4-7-8-5-13Z" fill="#2dcab2" stroke="#147d73" stroke-width="4" stroke-linejoin="round"/>
  <path d="M18 52h31" stroke="#8b5d31" stroke-width="6" stroke-linecap="round"/>
`))

save('icon-search.svg', svg(64, 64, `
  <circle cx="28" cy="27" r="17" fill="#fff8df" stroke="#725d42" stroke-width="6"/>
  <path d="m41 41 13 13" stroke="#725d42" stroke-width="7" stroke-linecap="round"/>
  <circle cx="23" cy="22" r="5" fill="#9ee6dc" opacity=".8"/>
`))

save('icon-shuffle.svg', svg(64, 64, `
  <path d="M11 18h8c12 0 15 28 27 28h8" stroke="#fffdf7" stroke-width="7" stroke-linecap="round"/>
  <path d="M11 46h8c8 0 12-10 17-18" stroke="#fffdf7" stroke-width="7" stroke-linecap="round"/>
  <path d="M47 11l9 7-9 7M47 39l9 7-9 7" stroke="#fffdf7" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
`))

save('icon-cloche.svg', svg(64, 64, `
  <path d="M13 45c2-16 13-27 29-27s27 11 29 27H13Z" fill="#fff3bd" stroke="#71481f" stroke-width="5" stroke-linejoin="round"/>
  <path d="M30 18c0-5 4-8 8-8s8 3 8 8" stroke="#71481f" stroke-width="5" stroke-linecap="round"/>
  <path d="M11 50h54" stroke="#71481f" stroke-width="6" stroke-linecap="round"/>
  <path d="M24 33c7-5 16-6 27-2" stroke="#fffdf7" stroke-width="5" stroke-linecap="round" opacity=".85"/>
`))

save('icon-staple.svg', svg(64, 64, `
  <rect x="16" y="17" width="32" height="34" rx="7" fill="#fff6de" stroke="#8b5b2d" stroke-width="5"/>
  <path d="M23 25h18M23 34h18M23 43h12" stroke="#f0b13b" stroke-width="4" stroke-linecap="round"/>
`))

save('icon-dessert.svg', svg(64, 64, `
  <path d="M15 30h34l-4 22H19l-4-22Z" fill="#fff3ce" stroke="#8b5b2d" stroke-width="5" stroke-linejoin="round"/>
  <path d="M18 29c1-9 8-15 17-15s15 6 16 15" fill="#ffb7c6" stroke="#8b5b2d" stroke-width="5"/>
  <circle cx="35" cy="13" r="5" fill="#e95858"/>
`))

save('icon-breakfast.svg', svg(64, 64, `
  <path d="M16 24h34v12c0 10-7 17-17 17s-17-7-17-17V24Z" fill="#fff7e2" stroke="#8b5b2d" stroke-width="5"/>
  <path d="M50 30h4c5 0 7 4 6 8s-5 6-10 5" stroke="#8b5b2d" stroke-width="5" stroke-linecap="round"/>
  <path d="M24 13c-4 5 4 7 0 12M35 12c-4 5 4 7 0 12" stroke="#22afa2" stroke-width="4" stroke-linecap="round"/>
`))

save('icon-home.svg', svg(64, 64, `
  <path d="M13 31 32 14l19 17v21H18V31Z" fill="#fff3cf" stroke="#8b5b2d" stroke-width="5" stroke-linejoin="round"/>
  <path d="M26 52V38h12v14" fill="#91d8cf" stroke="#8b5b2d" stroke-width="4"/>
  <path d="M23 27h18" stroke="#f0b13b" stroke-width="4" stroke-linecap="round"/>
`))

save('icon-rice.svg', svg(64, 64, `
  <path d="M12 31h40l-5 22H17l-5-22Z" fill="#91d8cf" stroke="#8b5b2d" stroke-width="5" stroke-linejoin="round"/>
  <path d="M18 31c2-12 9-18 20-18s18 7 20 18" fill="#fffdf7" stroke="#8b5b2d" stroke-width="5"/>
  <ellipse cx="31" cy="23" rx="3" ry="7" fill="#f2d99f" transform="rotate(-20 31 23)"/>
  <ellipse cx="42" cy="24" rx="3" ry="7" fill="#f2d99f" transform="rotate(20 42 24)"/>
`))

save('icon-favorite.svg', svg(64, 64, `
  <path d="M32 53C18 43 11 35 11 25c0-7 5-12 12-12 4 0 8 2 9 6 2-4 6-6 10-6 7 0 12 5 12 12 0 10-8 18-22 28Z" fill="#ff8f9d" stroke="#8b5b2d" stroke-width="5" stroke-linejoin="round"/>
  <path d="M21 23c2-3 5-4 8-3" stroke="#fff1f3" stroke-width="4" stroke-linecap="round"/>
`))

console.log(`Generated cookbook UI assets in ${outDir}`)
