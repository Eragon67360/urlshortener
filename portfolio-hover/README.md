# portfolio-hover

Source of the hover preview shown on thomasmoserdev.com/projects for this project.

- `capture.mjs`: captures the real site (urlshortener.thomasmoserdev.com) into `captures/`: the home
  page, one capture of the form row per typed character, the footer and the Contact dialog.
- `comp.html`: the 8s, 1280x800 loop, drawn from the captures (every frame is a function of time).
- `out/`: rendered `urlshortener.mp4` (silent H.264) and its first frame.

The form is never submitted: a submit writes a row to the production database, and the app needs
that Postgres database to run locally. The loop therefore shows no shortened-URL result.

`engine.js`, `base.css` and `render.mjs` are copied from the portfolio's `resources/hover-videos/kit`,
which documents how to capture and render.
