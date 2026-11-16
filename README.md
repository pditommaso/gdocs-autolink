# Docs Short Links

Chrome extension that shortens GitHub and Jira links pasted into Google Docs.

| Pasted | Inserted as link with text |
|---|---|
| `https://github.com/seqeralabs/sched/issues/1988` | `#1988` |
| `https://github.com/seqeralabs/sched/pull/2001` | `#2001` |
| `https://seqera.atlassian.net/browse/SCHED-123` | `SCHED-123` |
| `https://<site>.atlassian.net/...?selectedIssue=SCHED-77` | `SCHED-77` |

Anything else pastes normally.

## Install (development)

1. Open `chrome://extensions` and enable **Developer mode**.
2. Click **Load unpacked** and select this folder.
3. Reload any open Google Docs tabs.

## How it works

Google Docs receives keyboard and clipboard input through a hidden iframe
(`.docs-texteventtarget-iframe`). The content script listens for `paste` there.
When the clipboard holds a single matching URL, it cancels the paste and
dispatches a new paste event with an HTML link as clipboard data.

## Release

1. Increase `version` in `manifest.json`.
2. Commit with `[release]` in the first line of the message, e.g.
   `[release] v1.0.1`, and push to `main`.
3. The `Release` workflow tags the commit `vX.Y.Z`, builds
   `docs-short-links-vX.Y.Z.zip` and attaches it to a GitHub release.
4. Upload that zip in the
   [Chrome Web Store developer console](https://chrome.google.com/webstore/devconsole).

## License

[MIT](LICENSE)
