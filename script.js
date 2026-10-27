(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('themeToggle');
  const menuButton = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const savedTheme = localStorage.getItem('vitor-portfolio-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  const setThemeIcon = () => {
    const icon = themeButton.querySelector('.theme-icon');
    icon.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
    document.querySelector('meta[name="theme-color"]').content = root.dataset.theme === 'dark' ? '#0d1220' : '#f5f7fb';
  };
  setThemeIcon();
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('vitor-portfolio-theme', root.dataset.theme);
    setThemeIcon();
  });
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
})();