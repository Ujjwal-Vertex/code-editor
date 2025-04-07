// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Run Code
const runButton = document.getElementById('run-button');
const htmlInput = document.getElementById('html');
const cssInput = document.getElementById('css');
const jsInput = document.getElementById('js');
const preview = document.getElementById('preview');

runButton.addEventListener('click', () => {
  const htmlCode = htmlInput.value;
  const cssCode = `<style>${cssInput.value}</style>`;
  const jsCode = `<script>${jsInput.value}</script>`;
  const fullCode = `${cssCode}${htmlCode}${jsCode}`;
  preview.srcdoc = fullCode;
});

// Copy Code for Each Section
const copyButtons = document.querySelectorAll('.copy-button');

copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const type = button.dataset.type;
    let code = '';
    if (type === 'html') code = htmlInput.value;
    else if (type === 'css') code = cssInput.value;
    else if (type === 'js') code = jsInput.value;
    navigator.clipboard.writeText(code).then(() => {
      alert(`${type.toUpperCase()} code copied to clipboard!`);
    });
  });
});

// Auto-save to Local Storage
const inputs = [htmlInput, cssInput, jsInput];

inputs.forEach(input => {
  input.addEventListener('input', () => {
    localStorage.setItem(input.id, input.value);
  });
});

// Load saved code
window.addEventListener('load', () => {
  inputs.forEach(input => {
    input.value = localStorage.getItem(input.id) || '';
  });
});

// Code Suggestions
const suggestions = {
  html: ['<div>', '<p>', '<h1>', '<a>', '<img>', '<ul>', '<li>'],
  css: ['color:', 'font-size:', 'margin:', 'padding:', 'background:', 'display:'],
  js: ['function', 'const', 'let', 'if', 'else', 'for', 'while'],
};

// const suggestionContainers = {
//     html: document.getElementById('html-suggestions'),
//     css: document.getElementById('css-suggestions'),
//     js: document.getElementById('js-suggestions'),
// };

inputs.forEach(input => {
  input.addEventListener('input', (e) => {
    const type = input.dataset.type;
    const value = e.target.value;
    const lastWord = value.split(/[\s\n]/).pop();
    const filteredSuggestions = suggestions[type].filter(s => s.startsWith(lastWord));
    showSuggestions(type, filteredSuggestions);
  });
});

function showSuggestions(type, suggestions) {
  const container = suggestionContainers[type];
  container.innerHTML = suggestions.map(s => `<div>${s}</div>`).join('');
  container.style.display = suggestions.length ? 'block' : 'none';
}

// Format Code
const formatButton = document.getElementById('format-button');

formatButton.addEventListener('click', () => {
  htmlInput.value = formatHTML(htmlInput.value);
  cssInput.value = formatCSS(cssInput.value);
  jsInput.value = formatJS(jsInput.value);
});

function formatHTML(code) {
  return code.replace(/(>)(<)(\/*)/g, '$1\n$2$3');
}

function formatCSS(code) {
  return code.replace(/\s*{\s*/g, ' {\n  ').replace(/;\s*/g, ';\n  ').replace(/\s*}\s*/g, '\n}\n');
}

function formatJS(code) {
  return code.replace(/\s*{\s*/g, ' {\n  ').replace(/;\s*/g, ';\n  ').replace(/\s*}\s*/g, '\n}\n');
}
