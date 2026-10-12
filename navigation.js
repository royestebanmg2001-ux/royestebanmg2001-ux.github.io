/* Offline-ready transitions: bundled sections, one document, browser history. */
document.addEventListener('DOMContentLoaded', () => {
  const pages = window.PORTFOLIO_PAGES;
  const main = document.getElementById('contenido');
  if (!pages || !main) return; // Ordinary same-tab HTML links remain a fallback.
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const base = new URL('.', location.href);
  const ownPage = url => {
    if (url.protocol !== base.protocol || url.host !== base.host) return null;
    if (new URL('.', url).href !== base.href) return null;
    const filename = url.pathname.split('/').pop() || 'index.html';
    return Object.prototype.hasOwnProperty.call(pages, filename) ? filename : null;
  };
  const routeAt = url => {
    const offlineView = url.protocol === 'file:' && url.searchParams.get('vista');
    const filename = offlineView ? `${offlineView}.html` : ownPage(url);
    return Object.prototype.hasOwnProperty.call(pages, filename) ? filename : ownPage(url);
  };
  const visibleURL = (destination, filename) => {
    if (destination.protocol !== 'file:') return destination;
    // file:// allows query changes without cross-file security errors.
    const localURL = new URL(location.href);
    localURL.search = destination.search;
    localURL.searchParams.set('vista', filename.replace(/\.html$/, ''));
    localURL.hash = destination.hash;
    return localURL;
  };
  const navigationStatus = document.createElement('p');
  navigationStatus.className = 'sr-only';
  navigationStatus.setAttribute('role', 'status');
  navigationStatus.setAttribute('aria-live', 'polite');
  document.body.append(navigationStatus);
  let currentPage = ownPage(new URL(location.href));
  let revision = 0;
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const stateWithScroll = () => ({ ...history.state, portfolioScroll: { x: window.scrollX, y: window.scrollY } });
  function updateNavigation(active) {
    const activeFiles = { home: 'index.html', design: 'disenos.html', experience: 'experiencia.html', cv: 'cv.html', contact: 'contacto.html' };
    document.querySelectorAll('.desktop-nav a, #mobile-menu > a').forEach(link => {
      if (ownPage(new URL(link.href)) === activeFiles[active]) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
  function moveToContent(url, scroll) {
    const heading = main.querySelector('h1');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    let anchor;
    try { anchor = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch {}
    if (anchor) anchor.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ left: scroll?.x || 0, top: scroll?.y || 0, behavior: 'instant' });
  }
  async function render(destination, { push = false, scroll, immediate = false } = {}) {
    const filename = routeAt(destination);
    const page = pages[filename];
    if (!page) return;
    const ticket = ++revision;
    root.classList.add('page-changing');
    main.setAttribute('aria-busy', 'true');
    if (!immediate && !reducedMotion.matches) await pause(120);
    if (ticket !== revision) return; // A more recent click or Back wins.
    if (push) {
      try {
        history.replaceState(stateWithScroll(), '', location.href);
        history.pushState({ portfolioScroll: { x: 0, y: 0 } }, '', visibleURL(destination, filename));
      } catch {
        root.classList.remove('page-changing');
        main.removeAttribute('aria-busy');
        location.href = destination.href;
        return;
      }
    }
    main.innerHTML = page.content;
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document.body.classList.toggle('home-page', page.bodyClass === 'home-page');
    document.body.dataset.page = filename;
    updateNavigation(page.active);
    currentPage = filename;
    document.dispatchEvent(new CustomEvent('portfolio:pagechange', { detail: { page: filename } }));
    navigationStatus.textContent = page.title;
    main.removeAttribute('aria-busy');
    moveToContent(destination, scroll);
    requestAnimationFrame(() => { if (ticket === revision) root.classList.remove('page-changing'); });
  }
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download')) return;
    if (link.getAttribute('href').startsWith('#')) return;
    const destination = new URL(link.href, location.href);
    const filename = ownPage(destination);
    if (!filename) return; // External sites, PDFs and contact apps use the same tab.
    event.preventDefault();
    const currentURL = new URL(location.href);
    const requestedURL = visibleURL(destination, filename);
    if (filename === currentPage && requestedURL.href === currentURL.href) {
      // Cancel pending transitions when the current section is selected again.
      revision++;
      root.classList.remove('page-changing');
      main.removeAttribute('aria-busy');
      moveToContent(destination);
      return;
    }
    render(destination, { push: true });
  });
  window.addEventListener('popstate', event => {
    render(new URL(location.href), { scroll: event.state?.portfolioScroll });
  });
  try {
    history.scrollRestoration = 'manual';
    history.replaceState(stateWithScroll(), '', location.href);
  } catch {}
  const initialPage = routeAt(new URL(location.href));
  if (initialPage !== currentPage) render(new URL(location.href), { immediate: true });
});
