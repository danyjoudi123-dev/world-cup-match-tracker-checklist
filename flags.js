// ============================================================
// COUNTRY NAME -> FLAG EMOJI
// ============================================================
// Looked up by exact team name from matches.js. If you rename a
// team or add a country that is missing here, just add a new line
// below in the same format. No flag shows for unmapped or
// placeholder names (e.g. "Winner Match 93") -- that is expected.
// ============================================================

const TEAM_FLAGS = {
  "Mexico": "🇲🇽",
  "South Africa": "🇿🇦",
  "Korea Republic": "🇰🇷",
  "South Korea": "🇰🇷",
  "Czechia": "🇨🇿",
  "Canada": "🇨🇦",
  "Bosnia and Herzegovina": "🇧🇦",
  "Qatar": "🇶🇦",
  "Switzerland": "🇨🇭",
  "Brazil": "🇧🇷",
  "Morocco": "🇲🇦",
  "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Haiti": "🇭🇹",
  "USA": "🇺🇸",
  "United States": "🇺🇸",
  "Australia": "🇦🇺",
  "Paraguay": "🇵🇾",
  "Turkiye": "🇹🇷",
  "Turkey": "🇹🇷",
  "Germany": "🇩🇪",
  "Ivory Coast": "🇨🇮",
  "Ecuador": "🇪🇨",
  "Curacao": "🇨🇼",
  "Netherlands": "🇳🇱",
  "Japan": "🇯🇵",
  "Sweden": "🇸🇪",
  "Tunisia": "🇹🇳",
  "Belgium": "🇧🇪",
  "Egypt": "🇪🇬",
  "IR Iran": "🇮🇷",
  "Iran": "🇮🇷",
  "New Zealand": "🇳🇿",
  "Spain": "🇪🇸",
  "Cape Verde": "🇨🇻",
  "Uruguay": "🇺🇾",
  "Saudi Arabia": "🇸🇦",
  "France": "🇫🇷",
  "Norway": "🇳🇴",
  "Senegal": "🇸🇳",
  "Iraq": "🇮🇶",
  "Argentina": "🇦🇷",
  "Austria": "🇦🇹",
  "Algeria": "🇩🇿",
  "Jordan": "🇯🇴",
  "Colombia": "🇨🇴",
  "Portugal": "🇵🇹",
  "Congo DR": "🇨🇩",
  "DR Congo": "🇨🇩",
  "Uzbekistan": "🇺🇿",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Croatia": "🇭🇷",
  "Ghana": "🇬🇭",
  "Panama": "🇵🇦",
  "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  "Northern Ireland": "🇬🇧"
};

function getFlag(teamName) {
  return TEAM_FLAGS[teamName] || null;
}
