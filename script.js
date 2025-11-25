/**
 * CONFIGURATION
 * Add your new pages here.
 * path: relative path from index.html to your file.
 */
const tools = [
    {
        id: 1,
        title: "Percentage Calculator",
        description: "Calculate increases, decreases, and percentage differences instantly.",
        path: "pages/percentage-calc.html",
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
        id: 4,
        title: "Placeholder Text",
        description: "Generate Lorem Ipsum text for your prototypes.",
        path: "pages/lorem.html",
        icon: "📝",
        tags: ["utility", "text"]
    }
];

// DOM Elements
const grid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

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

// Event Listeners
searchInput.addEventListener('input', (e) => {
    renderTools(e.target.value);
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderTools();
});