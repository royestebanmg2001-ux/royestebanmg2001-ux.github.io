function initializePortfolioGallery() {
  const grid = document.getElementById('work-grid');
  if (!grid) return;
  const tiles = [...grid.querySelectorAll('.work-tile')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const search = document.getElementById('project-search');
  const status = document.getElementById('filter-status');
  const empty = document.getElementById('empty-state');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const allowed = filters.map(button => button.dataset.filter);
  const initial = new URLSearchParams(location.search).get('categoria');
  let selected = allowed.includes(initial) ? initial : 'todos';
  function render() {
    const query = normalize(search.value.trim());
    let total = 0;
    tiles.forEach(tile => {
      tile.hidden = !((selected === 'todos' || tile.dataset.category === selected) && normalize(tile.dataset.search).includes(query));
      if (!tile.hidden) total++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    status.textContent = `${total} ${total === 1 ? 'proyecto' : 'proyectos'}`;
    empty.hidden = total !== 0;
    try {
      const url = new URL(location.href);
      if (selected === 'todos') url.searchParams.delete('categoria');
      else url.searchParams.set('categoria', selected);
      history.replaceState(history.state, '', url);
    } catch {}
  }
  filters.forEach(button => button.addEventListener('click', () => { selected = button.dataset.filter; render(); }));
  search.addEventListener('input', render);
  document.getElementById('clear-filters')?.addEventListener('click', () => { selected = 'todos'; search.value = ''; render(); search.focus(); });
  render();
}
document.addEventListener('DOMContentLoaded', initializePortfolioGallery);
document.addEventListener('portfolio:pagechange', initializePortfolioGallery);
