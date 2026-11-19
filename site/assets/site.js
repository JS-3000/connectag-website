// ConnecTag website – the only script: mobile menu and contact form (mailto).

// Contact address: change it here and in impressum.html / datenschutz.html.
const CONTACT_EMAIL = 'JSimon.og+connectag@gmail.com';

// mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }),
  );
}

// contact form -> opens the visitor's e-mail program; no data is sent to third parties
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const f = new FormData(form);
    const subject = `Anfrage ConnecTag${f.get('company') ? ' – ' + f.get('company') : ''}`;
    const body = [
      `Name: ${f.get('name')}`,
      `Firma: ${f.get('company') || '–'}`,
      `E-Mail: ${f.get('email')}`,
      '',
      String(f.get('message') || ''),
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const hint = document.getElementById('form-status');
    if (hint) hint.textContent = 'Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die vorbereitete Nachricht dort ab.';
  });
}

// current year in the footer
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));
