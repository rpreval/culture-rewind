# CULTURE REWIND

**1990–2018 · Hip-Hop, Pop Culture & the World That Shaped Them**

A responsive browser trivia game built around cultural memory and context. Play solo or create a room for friends, answer questions about music, movies, TV/media, authors/ideas, and art/style, then learn why each moment mattered.

## Features
- Solo timed mode and relaxed learning mode
- Multiplayer room codes for up to 8 players
- Five rounds of five questions in multiplayer
- Speed bonuses, cumulative scoring, and leaderboard
- “Know the Moment” context explanation after each answer
- Responsive dark editorial design
- Question bank tagged by category, year, era, and difficulty
- Render Blueprint included

## Run locally
Requires Node.js 18 or newer.

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Deploy on Render
1. Push this project to a GitHub repository.
2. In Render, select **New → Blueprint** and connect the repository.
3. Render detects `render.yaml`, installs dependencies, and starts the Node.js server.
4. Open the generated public URL and test both solo and multiplayer modes.

## Notes
- This is an initial playable prototype. The bundled curated question bank is intentionally small; expand and fact-check it before a public launch.
- Multiplayer uses Socket.IO in-memory rooms. Rooms and scores reset if the service restarts, and this version does not persist accounts or progress.
- For a public release, add a larger reviewed question bank, automated tests, reconnect support, rate limits, accessibility review, and persistent storage if player accounts are introduced.
- The question text and explanations are original summaries. Avoid adding copyrighted lyrics or long excerpts from books, films, or other works.
