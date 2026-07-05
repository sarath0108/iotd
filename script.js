// 1. Tailwind CSS Configuration (Required if using CDN in head)
if (window.tailwind) {
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    darkBg: '#050B14',
                    panelBg: 'rgba(11, 23, 39, 0.7)',
                    cyanGlow: '#00F0FF',
                    greenGlow: '#00FF66',
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                }
            }
        }
    };
}

// 2. Tab Switching Logic
function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('block');
    });
    
    // Show targeted tab
    document.getElementById('tab-' + tabId).classList.remove('hidden');
    document.getElementById('tab-' + tabId).classList.add('block');
    
    // Reset Navigation UI styles
    const btns = document.querySelectorAll('.nav-btn');
    btns.forEach(btn => {
        btn.classList.remove('bg-cyan-900/30', 'text-cyanGlow', 'border-cyan-500/30');
        btn.classList.add('text-gray-400', 'border-transparent');
        btn.classList.remove('border');
    });
    
    // Apply active styles to clicked button
    const activeBtn = event.currentTarget;
    activeBtn.classList.remove('text-gray-400', 'border-transparent');
    activeBtn.classList.add('bg-cyan-900/30', 'text-cyanGlow', 'border', 'border-cyan-500/30');
    
    // Update Page Header Title
    const titles = {
        'dashboard': 'Enterprise Dashboard',
        'machines': 'Machine Monitoring & Diagnostics',
        'sustainability': 'ESG Impact & Sustainability'
    };
    document.getElementById('page-title').innerText = titles[tabId];
}

// 3. Initialize Chart.js with Fake Data
document.addEventListener('DOMContentLoaded', function() {
    // Global Chart Defaults for Dark Theme
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.font.family = 'Inter';

    // -- Main Line Chart (Actual vs Predicted) --
    const canvasLine = document.getElementById('energyChart');
    if (canvasLine) {
        const ctxLine = canvasLine.getContext('2d');
        
        // Create Neon Cyan Gradient for fill
        let cyanGradient = ctxLine.createLinearGradient(0, 0, 0, 300);
        cyanGradient.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
        cyanGradient.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
        
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
                datasets: [
                    {
                        label: 'Actual Usage (kW)',
                        data: [3200, 2900, 4100, 4800, 4500, 3900, 4284],
                        borderColor: '#00F0FF',
                        backgroundColor: cyanGradient,
                        borderWidth: 2,
                        pointBackgroundColor: '#050B14',
                        pointBorderColor: '#00F0FF',
                        pointBorderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'AI Predicted Usage (kW)',
                        data: [3150, 3000, 4200, 4700, 4600, 3850, 4200],
                        borderColor: '#00FF66',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 0,
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', align: 'end' }
                },
                scales: {
                    y: { beginAtZero: false, min: 2000 }
                }
            }
        });
    }

    // -- Doughnut Chart (Energy Sources) --
    const canvasPie = document.getElementById('sourceChart');
    if (canvasPie) {
        const ctxPie = canvasPie.getContext('2d');
        new Chart(ctxPie, {
            type: 'doughnut',
            data: {
                labels: ['Utility Grid', 'Solar/Renewable'],
                datasets: [{
                    data: [60, 40],
                    backgroundColor: ['#00F0FF', '#00FF66'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
});