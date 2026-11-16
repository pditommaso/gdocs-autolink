# AGENTS.md

Guidance for coding agents working in this repository.

## Project

Manifest V3 Chrome extension. A content script on `docs.google.com/document/*`
turns pasted GitHub issue/PR and Jira issue URLs into short links
(`#1988`, `SCHED-123`). It has no build step, no dependencies, no background
worker and no network calls.

- `manifest.json`: extension manifest
- `content.js`: all logic (URL matching, paste interception)

## How it works

Google Docs routes input through a hidden same-origin iframe
(`iframe.docs-texteventtarget-iframe`). `content.js` attaches a capturing
`paste` listener to that iframe's document. It re-checks every second because
Docs can recreate the iframe. When the clipboard text is a single matching URL,
it cancels the event and dispatches a synthetic `ClipboardEvent('paste')` whose
`DataTransfer` holds `text/html` (`<a href=URL>label</a>`) and `text/plain`
(the label). The label never matches the URL patterns, so the listener ignores
its own event.

## Adding a link type

Add a regex and a branch in `labelFor(url)` in `content.js`. Return the label,
or `null` to leave the paste alone. Anchor patterns with `^...$` so only pastes
that are just the URL get converted.

## Testing

- URL matching: load `labelFor` in Node and check sample URLs (see the README
  table for expected outputs).
- End to end: load the folder unpacked at `chrome://extensions`, reload a Google
  Doc and paste a URL. Synthetic paste is not an official Docs API, so always
  re-check after changes.

## Conventions

- Keep it dependency-free and permission-minimal: no extra `permissions` or
  `host_permissions` unless a feature requires them. This keeps Web Store
  review simple.
- Increase `version` in `manifest.json` for every release.

## Release

Releases are built by `.github/workflows/release.yml` on push to `main`, only
when the first line of the head commit message contains `[release]`.

1. Increase `version` in `manifest.json` (semver; the store rejects a version
   that is not higher than the published one).
2. Commit that change with a title containing `[release]`, e.g.
   `[release] v1.0.1`, and push to `main`. Don't put `[release]` in other
   commit titles.
3. The workflow reads the version, fails if release `vX.Y.Z` already exists,
   zips `manifest.json`, `content.js` and `icons/*.png` into
   `docs-short-links-vX.Y.Z.zip`, and creates the tag and GitHub release with
   the zip attached.
4. Check the run with `gh run list -L1` and the result with
   `gh release view vX.Y.Z`.

Do not create tags or releases by hand. Uploading the zip to the Chrome Web
Store is a manual step done by the maintainer.
