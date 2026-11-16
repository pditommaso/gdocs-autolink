# Docs GitHub Autolink

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
