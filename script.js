const tools = [
    // Highlighted / Fun Apps at the Top
    { id: 18, title: "Canvas Drawing App", description: "A simple and lightweight drawing application built with HTML5 Canvas.", path: "pages/nenodraw-js/index.html", icon: "🖌️", tags: ["canvas", "drawing", "lightweight"] },

    { id: 17, title: "Doom 1993 in WASM", description: "Play the classic Doom 1993 game directly in your browser using WebAssembly.", path: "pages/doom-wasm/index.html", icon: "🎮", tags: ["game", "wasm", "retro"] },
   // Practical Web Utilities
    { id: 10, title: "Advanced HTML Editor", description: "Full-featured HTML playground with CDN library support.", path: "pages/htmlEditorCDN.html", icon: "🚀", tags: ["developer", "html", "cdn"] },
    { id: 2, title: "QR Code Generator", description: "Generate and customize static and dynamic QR codes with ease.", path: "pages/qrcode.html", icon: "🔳", tags: ["utility", "generator"] },
    { id: 1, title: "Chart Percentage Calculator", description: "Calculate increases, decreases, and percentage differences instantly.", path: "pages/chart.html", icon: "🧮", tags: ["math", "finance"] },

    // Highly Useful Daily Dev Tools
    { id: 5, title: "JSON Formatter", description: "Prettify, validate, and minify JSON strings for easier debugging.", path: "pages/json-fmt.html", icon: "📋", tags: ["developer", "json"] },
    { id: 4, title: "DevUtils Suite", description: "All-in-one tool: URL Encoder, SQL Formatter, JSON/YAML Converter, and Cron Parser.", path: "pages/urlAsciiSqlJsonYamlMinifyUnixTimeCron.html", icon: "🛠️", tags: ["developer", "converter", "utility"] },
    { id: 3, title: "Regex Tester", description: "Test and debug regular expressions with real-time highlighting.", path: "pages/regexTester.html", icon: "🧩", tags: ["developer", "regex"] },
    { id: 8, title: "Base64 Converter", description: "Encode and decode text strings to and from Base64 format.", path: "pages/base64.html", icon: "🔤", tags: ["utility", "encoding"] },
    { id: 7, title: "Code Diff Checker", description: "Compare texts side-by-side to highlight code differences.", path: "pages/diffChecker.html", icon: "⚖️", tags: ["developer", "git", "code"] },

    // Security & Auth
    { id: 12, title: "Crypto & Password Gen", description: "Generate strong passwords, UUIDs, and cryptographic hashes.", path: "pages/passwordSecurity.html", icon: "🔑", tags: ["security", "cryptography"] },
    { id: 6, title: "JWT Decoder (Prod)", description: "Decode and verify JSON Web Tokens for production environments.", path: "pages/jwt-prod.html", icon: "🛡️", tags: ["security", "jwt"] },
    { id: 16, title: "JWT Decoder (Dev)", description: "Debug JSON Web Tokens in a safe development sandbox.", path: "pages/jwt-dev.html", icon: "🐞", tags: ["security", "jwt", "debug"] },

    // UI, Design & Niche Tools
    { id: 15, title: "CSS Shadow Generator", description: "Visually create complex CSS box-shadows and copy the code.", path: "pages/shadow-gen.html", icon: "🎨", tags: ["design", "css"] },
    { id: 13, title: "Lorem Ipsum Generator", description: "Generate placeholder text for mockups and prototypes.", path: "pages/lorem.html", icon: "📝", tags: ["design", "utility"] },
    { id: 14, title: "Code Highlighter", description: "Beautify code snippets with syntax highlighting for sharing.", path: "pages/code-highlight.html", icon: "🖍️", tags: ["developer", "syntax"] },
    { id: 9, title: "Simple HTML Editor", description: "A lightweight editor to preview raw HTML code instantly.", path: "pages/htmlEditor.html", icon: "📰", tags: ["developer", "html"] },
    { id: 11, title: "Rich Text Editor", description: "WYSIWYG editor for formatting rich text content.", path: "pages/richText.html", icon: "✒️", tags: ["productivity", "writing"] }
];

        const grid = document.getElementById('toolsGrid');
        const searchInput = document.getElementById('searchInput');
        const noResults = document.getElementById('noResults');
        const themeToggle = document.getElementById('themeToggle');

        function setTheme(isDark) {
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            themeToggle.checked = isDark;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        themeToggle.addEventListener('change', (e) => setTheme(e.target.checked));

        function renderTools(filterText = "") {
            grid.innerHTML = "";
            const lowerFilter = filterText.toLowerCase();

            const filteredTools = tools.filter(tool =>
                tool.title.toLowerCase().includes(lowerFilter) ||
                tool.description.toLowerCase().includes(lowerFilter) ||
                tool.tags.some(tag => tag.includes(lowerFilter))
            );

            if (filteredTools.length === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');

                filteredTools.forEach((tool, index) => {
                    const card = document.createElement('a');
                    card.href = tool.path;
                    card.className = "card";
                    // Staggered entry animation based on index
                    card.style.animationDelay = `${index * 0.05}s`;

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
        }

        searchInput.addEventListener('input', (e) => renderTools(e.target.value));

        document.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));
            renderTools();
        });
