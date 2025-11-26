// --- 1. Configuration & State ---
const libraPalette = ['#7B9ACC', '#E0B0B0', '#B0C4DE', '#D7BDE2', '#F9E79F', '#A2D9CE'];
const undefinedColor = '#E0E0E0'; 
let userEntries = { labels: [], values: [] };
let chartInstance = null;
let currentType = 'pie';

// --- 2. Initialization ---
window.onload = function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    chartInstance = new Chart(ctx, {
        type: currentType,
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { font: { family: 'Lato' }, padding: 20 } },
                // --- HOVER PERCENTAGE LOGIC ---
                tooltip: {
                    backgroundColor: 'rgba(44, 62, 80, 0.9)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw;
                            let totalInput = parseFloat(document.getElementById('totalInput').value);
                            let totalDivisor;

                            // If a Total Limit is defined by user, use that for %
                            // If not, use the sum of all visible data
                            if (!isNaN(totalInput) && totalInput > 0) {
                                totalDivisor = totalInput;
                            } else {
                                // Calculate sum of current visible data
                                totalDivisor = context.chart._metasets[context.datasetIndex].total;
                            }

                            let percentage = ((value / totalDivisor) * 100).toFixed(1) + '%';
                            return ` ${label}: ${value} (${percentage})`;
                        }
                    }
                }
            },
            animation: { duration: 800 }
        }
    });
    updateSummary();
    setChartTheme(); // Set initial theme for the chart
};

// --- 3. Theme Logic ---
function setChartTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#F9FAFB' : '#1F2937';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    chartInstance.options.plugins.legend.labels.color = textColor;
    if (chartInstance.options.scales.x) {
        chartInstance.options.scales.x.ticks.color = textColor;
        chartInstance.options.scales.x.grid.color = gridColor;
    }
    if (chartInstance.options.scales.y) {
        chartInstance.options.scales.y.ticks.color = textColor;
        chartInstance.options.scales.y.grid.color = gridColor;
    }
    chartInstance.update();
}

const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
            setChartTheme();
        }
    });
});

themeObserver.observe(document.documentElement, {
    attributes: true
});


// --- 4. Data Logic ---
function addEntry() {
    const labelIn = document.getElementById('labelInput');
    const valueIn = document.getElementById('valueInput');
    const label = labelIn.value.trim();
    const value = parseFloat(valueIn.value);

    if (label && !isNaN(value) && value > 0) {
        userEntries.labels.push(label);
        userEntries.values.push(value);
        updateListUI();
        renderChart();
        labelIn.value = '';
        valueIn.value = '';
        labelIn.focus();
    } else {
        alert("Please enter a label and positive value.");
    }
}

function removeEntry(index) {
    userEntries.labels.splice(index, 1);
    userEntries.values.splice(index, 1);
    updateListUI();
    renderChart();
}

function renderChart() {
    const totalLimit = parseFloat(document.getElementById('totalInput').value);
    const currentSum = userEntries.values.reduce((a, b) => a + b, 0);

    let displayLabels = [...userEntries.labels];
    let displayValues = [...userEntries.values];
    let displayColors = [...libraPalette];

    // Undefined / Remaining Logic
    if (!isNaN(totalLimit) && totalLimit > 0) {
        const remainder = totalLimit - currentSum;
        if (remainder > 0) {
            displayLabels.push("Remaining");
            displayValues.push(remainder);
            
            // Pad colors to ensure last one is gray
            while(displayColors.length < userEntries.values.length) {
                displayColors = displayColors.concat(libraPalette);
            }
            displayColors = displayColors.slice(0, userEntries.values.length);
            displayColors.push(undefinedColor);
        }
    }

    chartInstance.data.labels = displayLabels;
    chartInstance.data.datasets = [{
        data: displayValues,
        backgroundColor: displayColors,
        borderWidth: 1,
        borderColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1F2937' : '#fff'
    }];
    chartInstance.update();
    updateSummary(totalLimit, currentSum);
}

function updateListUI() {
    const container = document.getElementById('listContent');
    if (userEntries.labels.length === 0) {
        container.innerHTML = '<div style="text-align:center; color:#ccc; margin-top:10px;">Empty</div>';
        return;
    }
    let html = '';
    userEntries.labels.forEach((lbl, index) => {
        html += `
        <div class="data-item">
            <span style="font-weight:bold; color:var(--text-main);">${lbl}</span>
            <div style="display:flex; align-items:center; gap:10px;">
                <span>${userEntries.values[index]}</span>
                <button class="btn-remove" onclick="removeEntry(${index})">×</button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function updateSummary(total, sum) {
    const el = document.getElementById('statsSummary');
    if (!total || isNaN(total)) {
        el.innerHTML = sum > 0 ? `Total: <span>${sum}</span>` : `Enter data to begin.`;
        return;
    }
    const remainder = total - sum;
    const statusColor = remainder >= 0 ? 'var(--primary)' : 'var(--danger)';
    const statusText = remainder >= 0 ? 'Remaining' : 'Over Limit';
    
    el.innerHTML = `
        Used: <b>${sum}</b> / <b>${total}</b>
        <br>
        <span style="color:${statusColor}">${statusText}: ${Math.abs(remainder)}</span>
    `;
}

function resetAll() {
    userEntries = { labels: [], values: [] };
    document.getElementById('labelInput').value = '';
    document.getElementById('valueInput').value = '';
    document.getElementById('totalInput').value = '';
    updateListUI();
    renderChart();
}

function toggleType(type) {
    currentType = type;
    chartInstance.config.type = type;

    if (type === 'bar') {
        chartInstance.options.scales = {
            x: {
                ticks: { color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#F9FAFB' : '#1F2937' },
                grid: { color: document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            },
            y: {
                ticks: { color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#F9FAFB' : '#1F2937' },
                grid: { color: document.documentElement.getAttribute('data-theme') === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            }
        };
    } else {
        chartInstance.options.scales = {};
    }

    chartInstance.update();
}

// --- 5. Professional PDF Export ---
async function exportPDF() {
    const { jsPDF } = window.jspdf;
    const content = document.getElementById('dashboardContent');
    const header = document.getElementById('topHeader');
    
    // Visual feedback
    const btn = document.querySelector('.btn-pdf');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Generating...';

    // Capture the whole container
    // We use scale: 2 for better resolution
    const canvas = await html2canvas(content, { scale: 2, backgroundColor: getComputedStyle(document.body).backgroundColor });
    
    const imgData = canvas.toDataURL('image/png');
    
    // A4 dimensions in mm
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Add Title Header manually to PDF for crisp text
    pdf.setFont('times', 'bold');
    pdf.setFontSize(22);
    pdf.setTextColor(getComputedStyle(document.querySelector('h1')).color);
    pdf.text("DevUtility Hub Chart Report", 15, 20);
    
    pdf.setFontSize(10);
    pdf.setTextColor(getComputedStyle(document.querySelector('p')).color);
    const date = new Date().toLocaleDateString();
    pdf.text(`Generated on: ${date}`, 15, 26);
    
    // Add the dashboard image below the header
    const imgWidth = pageWidth - 30; // 15mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 15, 35, imgWidth, imgHeight);
    
    // Save
    pdf.save('devutility-chart-report.pdf');

    // Reset button
    btn.innerHTML = originalText;
}
