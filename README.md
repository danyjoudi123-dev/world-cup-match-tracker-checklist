# World Cup 2026 Watch Tracker

A single-page site to check off every World Cup match you've watched. Your progress is saved in your browser (`localStorage`) — no backend, no account, nothing to install.

## Files

```
index.html    the page structure
style.css     all visual styling
script.js     app logic (rendering, checkboxes, progress, saving) — you shouldn't need to touch this
matches.js    the 104-match dataset — this is the file you edit
README.md     this file
```

## Updating match data

Open `matches.js`. Every match is an object like this:

```js
{
  id: "ga-1",
  matchNumber: 1,
  stage: "Group Stage",
  group: "Group A",
  round: "Matchday 1",
  date: "2026-06-11",
  venue: "Estadio Azteca, Mexico City",
  home: "Mexico",
  away: "Poland",
  homeScore: null,
  awayScore: null
}
```

To update a match:
- Change `home` / `away` to the real team names as they're confirmed.
- Fill in `date` and `venue` once known.
- Once the match is played, set `homeScore` and `awayScore` to numbers (e.g. `2` and `1`). Leave them as `null` for matches that haven't happened yet — the app will show "vs" instead of a score.

**Don't change `id` once you've started ticking boxes.** The `id` is the key the app uses to remember which matches you've watched, so changing it will make the app forget that match was checked. Everything else is safe to edit freely.

The file is currently filled with placeholder names (`A1`, `A2`, `R32 Team 1`, etc.) — it's already structured with the correct 104-match format (72 group stage + 16 Round of 32 + 8 Round of 16 + 4 quarterfinals + 2 semifinals + 3rd place + final), so you can replace the placeholders in place as the real fixture list and results are confirmed.

## Hosting on GitHub Pages

1. **Create a new repository** on GitHub (e.g. `world-cup-2026-tracker`). Public repos get free GitHub Pages hosting.
2. **Add these files** to the repository — either:
   - drag and drop `index.html`, `style.css`, `script.js`, and `matches.js` into the GitHub web UI and commit, or
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
