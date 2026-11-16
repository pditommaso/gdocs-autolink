// Google Docs captures typing and pasting in a hidden same-origin iframe
// (.docs-texteventtarget-iframe). We listen for paste there. If the clipboard
// holds a single GitHub issue/PR URL, we cancel that paste and dispatch a new
// one whose clipboard data is an HTML link with "#<number>" as its text.

const GH_RE = /^https?:\/\/github\.com\/[\w.-]+\/[\w.-]+\/(?:issues|pull)\/(\d+)(?:[/?#]\S*)?$/;
// Jira: https://<site>.atlassian.net/browse/KEY-123
//   or any atlassian.net URL with ?selectedIssue=KEY-123 (boards, backlogs)
const JIRA_BROWSE_RE = /^https?:\/\/[\w.-]+\.atlassian\.net\/browse\/([A-Z][A-Z0-9_]+-\d+)(?:[/?#]\S*)?$/;
const JIRA_SELECTED_RE = /^https?:\/\/[\w.-]+\.atlassian\.net\/\S*[?&]selectedIssue=([A-Z][A-Z0-9_]+-\d+)/;

function labelFor(url) {
  let m;
  if ((m = url.match(GH_RE))) return `#${m[1]}`;
  if ((m = url.match(JIRA_BROWSE_RE) || url.match(JIRA_SELECTED_RE))) return m[1];
  return null;
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function onPaste(e) {
  const text = (e.clipboardData?.getData('text/plain') || '').trim();
  if (/\s/.test(text)) return;
  const label = labelFor(text);
  if (!label) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  const dt = new DataTransfer();
  dt.setData('text/html', `<a href="${escapeHtml(text)}">${label}</a>`);
  dt.setData('text/plain', label);
  // The new event's text is just the label, so this listener ignores it.
  e.target.dispatchEvent(
    new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true })
  );
}

const hooked = new WeakSet();

function hook() {
  for (const iframe of document.querySelectorAll('iframe.docs-texteventtarget-iframe')) {
    const doc = iframe.contentDocument;
    if (doc && !hooked.has(doc)) {
      doc.addEventListener('paste', onPaste, true);
      hooked.add(doc);
    }
  }
}

hook();
// Docs can recreate the iframe, so keep checking for new ones.
setInterval(hook, 1000);
