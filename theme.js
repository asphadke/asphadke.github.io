(() => {
  const root = document.documentElement;
  let savedTheme;
  try {
    savedTheme = localStorage.getItem('aditi-theme');
  } catch {}
  root.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const syncTheme = () => {
      const dark = root.dataset.theme === 'dark';
      if (button) {
        button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        button.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
      }
      if (themeColor) themeColor.content = dark ? '#0b1730' : '#ffffff';
    };
    syncTheme();
    if (button) button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('aditi-theme', root.dataset.theme);
      } catch {}
      syncTheme();
    });
  });
})();
