# World Cup 2026 Watch Tracker

A single-page site to check off every World Cup match you've watched. Your progress is saved in your browser (`localStorage`) — no backend, no account, nothing to install.

Match data is filled in with real results through the Round of 32 (as of July 1, 2026) — group stage is complete, several knockout matches are done, and the rest of the bracket uses "Winner Match X" placeholders until those games are decided.

## Files

```
index.html      the page structure
style.css       all visual styling
script.js       app logic (rendering, checkboxes, progress, saving, flags) — you shouldn't need to touch this
matches.js      the 104-match dataset — this is the file you edit as results come in
flags.js        country name -> flag emoji lookup — edit if a team name doesn't show a flag
README.md       this file
```

## Updating match data

Open `matches.js`. Every match is an object like this:

```js
{
  id: "m1",
  matchNumber: 1,
  stage: "Group Stage",
  group: "Group A",
  round: "Matchday 1",
  date: "2026-06-11",
  venue: "Estadio Azteca, Mexico City",
  home: "Mexico",
  away: "South Africa",
  homeScore: 2,
  awayScore: 0,
  note: null
}
```

To update a match:
- Change `home` / `away` — for knockout matches not yet decided, these are placeholders like `"Winner Match 93"`. Once that earlier match finishes, replace the placeholder with the real team name (e.g. `"Spain"`) and its flag will show up automatically.
- Set `homeScore` / `awayScore` once the match is played. Leave them as `null` for matches that haven't happened yet.
- `note` is optional — used for things like `"Morocco won 3-2 on penalties"`. Set it to `null` if there's nothing to add.
- `venue` is `"TBD"` for most group-stage matches since exact per-match stadium assignments weren't part of this build — fill it in from the official schedule if you want it.

**Don't change `id` once you've started ticking boxes.** The `id` is the key the app uses to remember which matches you've watched — changing it will make the app forget that match was checked. Everything else is safe to edit freely.

## Flags

Flags are looked up automatically in `flags.js` by matching the team name in `matches.js` exactly. If you type a team name that isn't in the list (a different spelling, a newly-decided knockout team, etc.), no flag will show — just add a line to `flags.js` in the same format:

```js
"Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
```

Placeholder names like `"Winner Match 93"` intentionally show no flag — that's expected until you replace them with a real team.

## Hosting on GitHub Pages

1. **Create a new repository** on GitHub (e.g. `world-cup-2026-tracker`). Public repos get free GitHub Pages hosting.
2. **Add these files** to the repository — either:
   - drag and drop `index.html`, `style.css`, `script.js`, `matches.js`, and `flags.js` into the GitHub web UI and commit, or
   - clone the empty repo locally, copy the files in, then:
     ```bash
     git add .
     git commit -m "Initial World Cup tracker"
     git push
     ```
3. **Enable Pages**: in the repo, go to **Settings → Pages**. Under "Build and deployment", set **Source** to `Deploy from a branch`, choose branch `main` and folder `/ (root)`, then **Save**.
4. Wait a minute or two, then your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
5. Any time you edit `matches.js` (new scores, real team names, etc.), just commit and push — the live site updates automatically within a minute or so.

## Notes

- Progress is stored per-browser, per-device (via `localStorage`), not synced anywhere. If you check things off on your phone and then open the site on your laptop, you'll see two separate progress states.
- If you ever want to reset your progress, open your browser's dev tools console on the page and run:
  ```js
  localStorage.removeItem('wc2026-watched-matches')
  ```
  then refresh.
