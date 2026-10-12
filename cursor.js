/* Circle + centered dot. Touch and keyboard keep their native interaction. */
document.addEventListener('DOMContentLoaded', () => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="custom-cursor__ring"></span><span class="custom-cursor__dot"></span>';
  document.body.append(cursor);
  let lastX = 0;
  let lastY = 0;
  let hasPosition = false;
  function hide() {
    root.classList.remove('has-custom-cursor');
    cursor.classList.remove('is-visible', 'is-pressed');
  }
  function setHover(target) {
    const editable = target?.closest?.('input, textarea, select, [contenteditable="true"]');
    const clickable = target?.closest?.('a[href], button:not(:disabled), [role="button"], summary, label');
    cursor.classList.toggle('is-hover', Boolean(clickable));
    cursor.classList.toggle('is-editing', Boolean(editable));
  }
  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || (event.pointerType && event.pointerType !== 'mouse')) { hide(); return; }
    lastX = event.clientX;
    lastY = event.clientY;
    hasPosition = true;
    cursor.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
    root.classList.add('has-custom-cursor');
    cursor.classList.add('is-visible');
    setHover(event.target);
  }, { passive: true });
  document.addEventListener('pointerover', event => setHover(event.target), { passive: true });
  document.addEventListener('pointerdown', event => {
    if (finePointer.matches && event.pointerType === 'mouse') cursor.classList.add('is-pressed');
  }, { passive: true });
  document.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'), { passive: true });
  document.documentElement.addEventListener('pointerleave', hide);
  document.addEventListener('keydown', event => { if (event.key === 'Tab') hide(); });
  document.addEventListener('portfolio:pagechange', () => {
    if (hasPosition) requestAnimationFrame(() => setHover(document.elementFromPoint(lastX, lastY)));
  });
  window.addEventListener('blur', hide);
  window.addEventListener('pagehide', hide);
  finePointer.addEventListener('change', hide);
});
