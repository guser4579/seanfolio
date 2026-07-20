'use client';

import { useState } from 'react';

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  function flash() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function onShare() {
    const url = window.location.href;
    const shareTitle = title || document.title;

    // Native share sheet (mobile, https only)
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url });
        return;
      } catch (e) {
        if (e && e.name === 'AbortError') return;
      }
    }

    // Clipboard API (https only)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        flash();
        return;
      } catch (e) {}
    }

    // Legacy copy - works over plain http (local device testing)
    try {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      flash();
    } catch (e) {}
  }

  return (
    <button
      className="share"
      type="button"
      onClick={onShare}
      aria-label="Share this page"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" x2="12" y1="2" y2="15" />
      </svg>
      {copied ? 'copied' : 'share'}
    </button>
  );
}
