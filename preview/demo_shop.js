// ecommerce.js - Shared functionality for bags.html and gadgets.html

class EcommerceManager {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalPic = document.getElementById('modalPic');
        this.modalName = document.getElementById('modalName');
        this.modalPrice = document.getElementById('modalPrice');
        this.modalDesc = document.getElementById('modalDesc');
        this.closeModal = document.getElementById('closeModal');
        this.toast = document.getElementById('toast');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupProductCards();
    }
    
    setupEventListeners() {
        // Close modal when X is clicked
        this.closeModal.addEventListener('click', () => this.closeModalWindow());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModalWindow();
        });
        
        // Close modal with Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('open')) {
                this.closeModalWindow();
            }
        });
        
        // Checkout button
        document.getElementById('checkoutBtn')?.addEventListener('click', () => {
            this.showToast('Order confirmed! You will be contacted shortly.');
            this.closeModalWindow();
        });
        
        // Contact buttons
        document.getElementById('contactBtn')?.addEventListener('click', () => {
            window.location.href = 'tel:+2347081472383';
        });
        
        document.getElementById('hireBtn')?.addEventListener('click', () => {
            this.showToast('Contact Mr Izzi: +234 708 147 2383');
        });
    }
    
    setupProductCards() {
        // Make product cards interactive
        document.querySelectorAll('button[data-name]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const product = {
                    name: btn.dataset.name,
                    price: btn.dataset.price,
                    img: btn.dataset.img || this.getProductImage(btn)
                };
                this.openProductModal(product);
            });
        });
        
        // Add floating animations randomly
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const animations = ['float-slow', 'float-medium', 'float-fast'];
            card.classList.add(animations[index % 3]);
        });
    }
    
    getProductImage(button) {
        // Fallback to image in the card if data-img is missing
        const card = button.closest('.card');
        const img = card.querySelector('.pic-frame img');
        return img ? img.src : 'default.jpg';
    }
    
    openProductModal(product) {
        this.modalName.textContent = product.name;
        this.modalPrice.textContent = `₦${parseInt(product.price).toLocaleString()}`;
        
        if (product.img) {
            this.modalPic.style.backgroundImage = `url(${product.img})`;
            this.modalPic.style.backgroundSize = 'cover';
            this.modalPic.style.backgroundPosition = 'center';
        }
        
        this.modal.classList.add('open');
        this.modal.setAttribute('aria-hidden', 'false');
    }
    
    closeModalWindow() {
        this.modal.classList.remove('open');
        this.modal.setAttribute('aria-hidden', 'true');
    }
    
    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 2600);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new EcommerceManager();
});