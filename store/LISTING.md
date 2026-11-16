# Chrome Web Store listing

Copy these into the developer console when submitting.

## Store listing tab

**Name:** Docs Short Links

**Summary** (max 132 characters):

> Paste a GitHub issue, pull request or Jira issue URL into Google Docs and get a short link like #1988 or SCHED-123.

**Description:**

> Long URLs make meeting notes and design docs hard to read. Docs Short Links
> turns them into short, clickable references as you paste.
>
> Paste a link into a Google Doc and it is inserted as:
>
> • https://github.com/owner/repo/issues/1988 → #1988
> • https://github.com/owner/repo/pull/2001 → #2001
> • https://yoursite.atlassian.net/browse/SCHED-123 → SCHED-123
> • Jira board links with ?selectedIssue=SCHED-123 → SCHED-123
>
> The short text is a real link, so clicking it still opens the issue.
>
> Anything else you paste is left as it is, including text that contains a
> URL alongside other words.
>
> No setup, no account, no data collected. The extension only runs on Google
> Docs documents and never sends anything over the network.
>
> Open source (MIT): https://github.com/pditommaso/gdocs-autolink

**Category:** Productivity → Workflow & Planning (or "Tools")

**Language:** English

**Screenshot:** `store/screenshot-1.png` (1280×800)

**Store icon:** `icons/icon128.png`

**Homepage URL:** https://github.com/pditommaso/gdocs-autolink

**Support URL:** https://github.com/pditommaso/gdocs-autolink/issues

## Privacy practices tab

**Single purpose:**

> Shortens GitHub issue/PR and Jira issue links pasted into Google Docs into
> short labelled links such as #1988 or SCHED-123.

**Host permission justification** (content script on `https://docs.google.com/document/*`):

> The extension needs to see paste events in Google Docs documents to replace a
> pasted GitHub or Jira URL with a short link. It runs only on Docs document
> pages, reads only the clipboard content of the paste being made, and does not
> read or modify anything else on the page.

**Remote code:** No, I am not using remote code. All JavaScript is packaged in
the extension.

**Data usage:** tick none of the data types. Then certify:

- [x] I do not sell or transfer user data to third parties, outside of the approved use cases
- [x] I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes

**Privacy policy URL:** https://github.com/pditommaso/gdocs-autolink/blob/main/PRIVACY.md
