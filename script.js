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
        title: "QR Code Generator",
        description: "Generate and customize static and dynamic QR codes with ease.",
        path: "pages/qrcode.html",
        icon: "🔳",
        tags: ["utility", "generator"]
    },
    {
        id: 3,
        title: "Regex Tester",
        description: "Test and debug regular expressions with real-time highlighting.",
        path: "pages/regexTester.html",
        icon: "🧩",
        tags: ["developer", "regex"]
    },
    {
        id: 4,
        title: "DevUtils Suite",
        description: "All-in-one tool: URL Encoder, SQL Formatter, JSON/YAML Converter, and Cron Parser.",
        path: "pages/urlAsciiSqlJsonYamlMinifyUnixTimeCron.html",
        icon: "🛠️",
        tags: ["developer", "converter", "utility"]
    },
    {
        id: 5,
        title: "JSON Formatter",
        description: "Prettify, validate, and minify JSON strings for easier debugging.",
        path: "pages/json-fmt.html",
        icon: "📋",
        tags: ["developer", "json"]
    },
    {
        id: 6,
        title: "JWT Decoder (Prod)",
        description: "Decode and verify JSON Web Tokens for production environments.",
        path: "pages/jwt-prod.html",
        icon: "🛡️",
        tags: ["security", "jwt"]
    },
    {
        id: 7,
        title: "Code Diff Checker",
        description: "Compare texts side-by-side to highlight code differences.",
        path: "pages/diffChecker.html",
        icon: "⚖️",
        tags: ["developer", "git", "code"]
    },
    {
        id: 8,
        title: "Base64 Converter",
        description: "Encode and decode text strings to and from Base64 format.",
        path: "pages/base64.html",
        icon: "🔤",
        tags: ["utility", "encoding"]
    },
    {
        id: 9,
        title: "Simple HTML Editor",
        description: "A lightweight editor to preview raw HTML code instantly.",
        path: "pages/htmlEditor.html",
        icon: "📰",
        tags: ["developer", "html"]
    },
    {
        id: 10,
        title: "Advanced HTML Editor",
        description: "Full-featured HTML playground with CDN library support.",
        path: "pages/htmlEditorCDN.html",
        icon: "🚀",
        tags: ["developer", "html", "cdn"]
    },
    {
        id: 11,
        title: "Rich Text Editor",
        description: "WYSIWYG editor for formatting rich text content.",
        path: "pages/richText.html",
        icon: "✒️",
        tags: ["productivity", "writing"]
    },
    {
        id: 12,
        title: "Crypto & Password Gen",
        description: "Generate strong passwords, UUIDs, and cryptographic hashes.",
        path: "pages/passwordSecurity.html",
        icon: "🔑",
        tags: ["security", "cryptography"]
    },
    {
        id: 13,
        title: "Lorem Ipsum Generator",
        description: "Generate placeholder text for mockups and prototypes.",
        path: "pages/lorem.html",
        icon: "📝",
        tags: ["design", "utility"]
    },
    {
        id: 14,
        title: "Code Highlighter",
        description: "Beautify code snippets with syntax highlighting for sharing.",
        path: "pages/code-highlight.html",
        icon: "🖍️",
        tags: ["developer", "syntax"]
    },
    {
        id: 15,
        title: "CSS Shadow Generator",
        description: "Visually create complex CSS box-shadows and copy the code.",
        path: "pages/shadow-gen.html",
        icon: "🎨",
        tags: ["design", "css"]
    },
    {
        id: 16,
        title: "JWT Decoder (Dev)",
        description: "Debug JSON Web Tokens in a safe development sandbox.",
        path: "pages/jwt-dev.html",
        icon: "🐞",
        tags: ["security", "jwt", "debug"]
    },
    {
        id: 17,
        title: "Doom 1993 in WASM",
        description: "Play the classic Doom 1993 game directly in your browser using WebAssembly.",
        path: "pages/doom-wasm/index.html",
        icon: "🎮",
        tags: ["game", "wasm", "retro"]
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