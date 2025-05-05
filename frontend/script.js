document.addEventListener('DOMContentLoaded', () => {
    // Accessibility Features
    initializeThemeToggle();
    initializeFontControls();
    initializeTableData();
    setupKeyboardNavigation();
    updateDaysLeft();

    // Calculate budget differences
    calculateDifferences();
});

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? '' : 'dark');
        themeToggle.setAttribute('aria-pressed', String(!isDark));
    });
}

function initializeFontControls() {
    const root = document.documentElement;
    const fontSize = parseFloat(getComputedStyle(root).fontSize);
    
    document.getElementById('fontIncrease').addEventListener('click', () => {
        root.style.fontSize = fontSize * 1.1 + 'px';
    });
    
    document.getElementById('fontDecrease').addEventListener('click', () => {
        root.style.fontSize = fontSize * 0.9 + 'px';
    });
}

function initializeTableData() {
    const activities = [
        { category: 'Accommodation', budgeted: 345, actual: 358.27 },
        { category: 'Restaurants', budgeted: 165, actual: 305 },
        { category: 'Car rental', budgeted: 120, actual: 350 },
        { category: 'Vaccinations', budgeted: 320, actual: 120 },
        { category: 'Food', budgeted: 200, actual: 75 },
        { category: 'Other', budgeted: 100, actual: 120 }
    ];

    const tbody = document.querySelector('.expenses-table tbody');
    tbody.innerHTML = activities.map(activity => `
        <tr role="row">
            <td role="cell">${activity.category}</td>
            <td role="cell">${activity.budgeted.toFixed(2)}</td>
            <td role="cell">${activity.actual.toFixed(2)}</td>
            <td role="cell">${(activity.budgeted - activity.actual).toFixed(2)}</td>
        </tr>
    `).join('');
}

function calculateDifferences() {
    const budgetElements = document.querySelectorAll('[data-currency="USD"]');
    const totalBudget = parseFloat(budgetElements[0].textContent);
    const totalActual = parseFloat(budgetElements[1].textContent);
    document.getElementById('budgetDifference').textContent = (totalBudget - totalActual).toFixed(2);
}

function updateDaysLeft() {
    const startDate = new Date('2024-02-06');
    const today = new Date();
    const daysLeft = Math.ceil((startDate - today) / (86400000));
    document.getElementById('daysLeft').textContent = daysLeft;
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.documentElement.classList.remove('keyboard-nav');
    });
}