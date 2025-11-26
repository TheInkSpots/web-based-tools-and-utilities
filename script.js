/**
 * CONFIGURATION
 * Add your new pages here.
 * path: relative path from index.html to your file.
 */
const tools = [
    {
        id: 1,
        title: "Chart Percentage Calculator",
        description: "Calculate increases, decreases, and percentage differences instantly.",
        path: "pages/chart.html",
        icon: "🧮",
        tags: ["math", "finance"]
    },
    {
        id: 2,
        title: "CSS Shadow Generator",
        description: "Visually create CSS box-shadows and copy the code.",
        path: "pages/shadow-gen.html",
        icon: "🎨",
        tags: ["design", "css"]
    },
    {
        id: 3,
        title: "JSON Formatter",
        description: "Prettify and validate JSON strings for easier reading.",
        path: "pages/json-fmt.html",
        icon: "💻",
        tags: ["developer", "data"]
    },
     {
        id: 6,
        title: "JWT Decoder Prod",
        description: "Decode and verify JSON Web Tokens in a production environment.",
        path: "pages/jwt-prod.html",
        icon: "🔐",
        tags: ["security", "jwt"]
    },
     {
        id: 7,
        title: "JWT Decoder Dev",
        description: "Decode and verify JSON Web Tokens in a development environment.",
        path: "pages/jwt-dev.html",
        icon: "🔐",
        tags: ["security", "jwt"]
    },
    {
        id: 7,
        title: "Base64 Encoder Decoder",
        description: "Encode and decode Base64 strings easily.",
        path: "pages/base64.html",
        icon: "🔐",
        tags: ["security", "jwt"]
    },
    {
        id: 7,
        title: "HTML development tools - Simple",
        description: "Preview your HTML code in a simple editor.",
        path: "pages/htmlEditor.html",
        icon: "🔐",
        tags: ["security", "jwt"]
    },
    {
        id: 7,
        title: "HTML development tools - Ultra",
        description: "Preview your HTML code in an advanced editor with CDN support.",
        path: "pages/htmlEditorCDN.html",
        icon: "🔐",
        tags: ["security", "jwt"]
    },
    {
        id: 4,
        title: "Placeholder Text",
        description: "Generate Lorem Ipsum text for your prototypes.",
        path: "pages/lorem.html",
        icon: "📝",
        tags: ["utility", "text"]
    },
    {
        id: 5,
        title: "Code Highlighter",
        description: "Highlight your code snippets with various themes.",
        path: "pages/code-highlight.html",
        icon: "✨",
        tags: ["developer", "code"]
    }
];

// DOM Elements
const grid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const themeToggle = document.getElementById('themeToggle');

// Theme function
function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.checked = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Theme Toggler Event Listener
themeToggle.addEventListener('change', (e) => {
    setTheme(e.target.checked);
});

// Render Function
function renderTools(filterText = "") {
    grid.innerHTML = ""; // Clear current grid
    
    const lowerFilter = filterText.toLowerCase();

    // Filter the list
    const filteredTools = tools.filter(tool => {
        return tool.title.toLowerCase().includes(lowerFilter) || 
               tool.description.toLowerCase().includes(lowerFilter) ||
               tool.tags.some(tag => tag.includes(lowerFilter));
    });

    // Show "No Results" message
    if (filteredTools.length === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }

    // Generate Cards
    filteredTools.forEach(tool => {
        const card = document.createElement('a');
        card.href = tool.path;
        card.className = "card";
        
        card.innerHTML = `
            <div class="card-icon">${tool.icon}</div>
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <div class="card-arrow">
                Launch Tool <span>&rarr;</span>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Search Event Listener
searchInput.addEventListener('input', (e) => {
    renderTools(e.target.value);
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    renderTools();
});