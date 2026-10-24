// Initial Mock Data for RPW Marketplace
let products = [
    {
        id: 1,
        title: "Clean Dummy Account (2018 Main, 3k Followers)",
        category: "accounts",
        price: 250,
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
        contact: "m.me/sample.rpw"
    },
    {
        id: 2,
        title: "iOS Glassmorphism Aesthetic Layout Pack",
        category: "edits",
        price: 99,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60",
        contact: "m.me/sample.rpw"
    },
    {
        id: 3,
        title: "Layout / Banner Custom Commission",
        category: "services",
        price: 150,
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60",
        contact: "m.me/sample.rpw"
    },
    {
        id: 4,
        title: "HTML/CSS Mobile Portfolio Template",
        category: "codes",
        price: 300,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60",
        contact: "m.me/sample.rpw"
    }
];

// DOM Elements
const feedContainer = document.getElementById('product-feed');
const themeToggleBtn = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const categoryChips = document.querySelectorAll('.cat-chip');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const sellModal = document.getElementById('sell-modal');
const sellForm = document.getElementById('sell-form');

// Render Products
function renderProducts(itemsToRender) {
    feedContainer.innerHTML = '';
    if (itemsToRender.length === 0) {
        feedContainer.innerHTML = `<p style="grid-column: span 2; text-align: center; color: var(--text-secondary); padding: 40px;">No items found.</p>`;
        return;
    }

    itemsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img" onerror="this.src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format&fit=crop&q=60'">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">₱${product.price}</div>
                <a href="https://${product.contact}" target="_blank" class="pm-btn">PM Seller</a>
            </div>
        `;
        feedContainer.appendChild(card);
    });
}

// Theme Toggle Handler
themeToggleBtn.addEventListener('click', () => {
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
});

// Search Filter
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(query));
    renderProducts(filtered);
});

// Category Filter
categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const category = chip.getAttribute('data-category');
        if (category === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    });
});

// Modal Toggles
openModalBtn.addEventListener('click', () => sellModal.classList.add('active'));
closeModalBtn.addEventListener('click', () => sellModal.classList.remove('active'));

// Handle New Listing Form Submission
sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        title: document.getElementById('item-title').value,
        category: document.getElementById('item-category').value,
        price: Number(document.getElementById('item-price').value),
        image: document.getElementById('item-image').value,
        contact: document.getElementById('item-contact').value
    };

    products.unshift(newProduct);
    renderProducts(products);
    sellForm.reset();
    sellModal.classList.remove('active');
});

// Initialize Icons & Feed
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderProducts(products);
});
