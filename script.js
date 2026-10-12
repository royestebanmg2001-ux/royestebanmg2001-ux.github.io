document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const menuLinks = [...menu.querySelectorAll('a')];
  const setMenu = (open, focus = true) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    document.body.classList.toggle('menu-open', open);
    if (focus) (open ? menuLinks[0] : toggle).focus();
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false, false)));
  document.addEventListener('keydown', event => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
    if (event.key === 'Tab') {
      const current = document.activeElement;
      if (!event.shiftKey && current === menuLinks.at(-1)) { event.preventDefault(); toggle.focus(); }
      if (event.shiftKey && current === toggle) { event.preventDefault(); menuLinks.at(-1).focus(); }
    }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false, false); });
  // Initialize controls again whenever navigation replaces the main section.
  function initializePage() {
  const cvImage = document.getElementById('cv-preview-image');
  if (cvImage) {
    const labels = {
      es: { document: 'DOCUMENTO ORIGINAL / ESPAÑOL', page: 'Página', of: 'de', preview: 'CLIC PARA ABRIR EL PDF ↗', download: 'Descargar CV en español ↓', open: 'Abrir PDF completo ↗', prev: 'Página anterior', next: 'Página siguiente', note: 'Los PDF conservan el diseño y contenido de los documentos originales.' },
      en: { document: 'ORIGINAL DOCUMENT / ENGLISH', page: 'Page', of: 'of', preview: 'CLICK TO OPEN THE PDF ↗', download: 'Download CV in English ↓', open: 'Open full PDF ↗', prev: 'Previous page', next: 'Next page', note: 'The PDFs preserve the design and content of the original documents.' }
    };
    let language = new URLSearchParams(location.search).get('idioma') === 'en' ? 'en' : 'es';
    let page = 1;
    const languageButtons = [...document.querySelectorAll('[data-cv-lang]')];
    const pageButtons = [...document.querySelectorAll('[data-cv-page]')];
    const prev = document.getElementById('cv-prev');
    const next = document.getElementById('cv-next');
    function showCV() {
      const label = labels[language];
      const pdf = `assets/cv/roy-moreno-cv-${language}.pdf`;
      cvImage.src = `assets/cv/cv-${language}-${page}.webp`;
      cvImage.alt = language === 'en' ? `Page ${page} of Roy Moreno's CV in English` : `Página ${page} del CV de Roy Moreno en español`;
      languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cvLang === language)));
      pageButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.cvPage) === page)));
      document.querySelectorAll('[data-cv-language]').forEach(profile => { profile.hidden = profile.dataset.cvLanguage !== language; });
      document.getElementById('cv-document-label').textContent = label.document;
      document.getElementById('cv-page-status').textContent = `${label.page} ${page} ${label.of} 2`;
      document.getElementById('cv-preview-hint').textContent = label.preview;
      document.getElementById('cv-original-note').textContent = label.note;
      const documentLink = document.getElementById('cv-document-link');
      documentLink.href = `${pdf}#page=${page}`;
      documentLink.setAttribute('aria-label', language === 'en' ? 'Open the English CV as a PDF' : 'Abrir el CV en español como PDF');
      const download = document.getElementById('cv-download-active');
      download.href = pdf; download.download = `roy-moreno-cv-${language}.pdf`; download.textContent = label.download;
      const open = document.getElementById('cv-open-active'); open.href = pdf; open.textContent = label.open;
      document.querySelector('.cv-viewer').lang = language;
      prev.disabled = page === 1; next.disabled = page === 2;
      prev.setAttribute('aria-label', label.prev); next.setAttribute('aria-label', label.next);
      try { const url = new URL(location.href); url.searchParams.set('idioma', language); history.replaceState(history.state, '', url); } catch {}
    }
    languageButtons.forEach(button => button.addEventListener('click', () => { language = button.dataset.cvLang; page = 1; showCV(); }));
    pageButtons.forEach(button => button.addEventListener('click', () => { page = Number(button.dataset.cvPage); showCV(); }));
    prev.addEventListener('click', () => { if (page > 1) { page--; showCV(); } });
    next.addEventListener('click', () => { if (page < 2) { page++; showCV(); } });
    showCV();
  }
  const copyButton = document.querySelector('[data-copy-email]');
  if (copyButton) copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try { await navigator.clipboard.writeText(copyButton.dataset.copyEmail); status.textContent = 'Correo copiado.'; }
    catch {
      const node = document.createElement('textarea'); node.value = copyButton.dataset.copyEmail;
      node.style.position = 'fixed'; node.style.opacity = '0'; document.body.append(node); node.select();
      const copied = document.execCommand('copy'); node.remove(); copyButton.focus();
      status.textContent = copied ? 'Correo copiado.' : 'Podés copiarlo directamente del enlace de arriba.';
    }
  });
  const form = document.getElementById('contact-form');
  if (form) {
    const message = () => { const data = new FormData(form); return { service: data.get('service'), text: `Hola Roy, soy ${data.get('name')}.\n\nEmail: ${data.get('email')}\nProyecto: ${data.get('service')}\n\n${data.get('message')}` }; };
    form.addEventListener('submit', event => {
      event.preventDefault(); if (!form.reportValidity()) return; const data = message();
      location.href = `mailto:royestebanmg2001@gmail.com?subject=${encodeURIComponent('Proyecto: ' + data.service)}&body=${encodeURIComponent(data.text)}`;
    });
    document.getElementById('contact-whatsapp').addEventListener('click', () => { if (!form.reportValidity()) return; location.href = `https://wa.me/59169260095?text=${encodeURIComponent(message().text)}`; });
  }
  }
  initializePage();
  document.addEventListener('portfolio:pagechange', () => { setMenu(false, false); initializePage(); });
});
