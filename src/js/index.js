// eShop JavaScript - Interactive functionality and animations

// Shopping cart functionality
let cart = [];
let cartCount = 0;

// DOM elements
const cartCountElement = document.querySelector('.cart-count');
const scrollToTopBtn = document.getElementById('scrollToTop');
const carouselSlides = document.querySelector('.carousel-slides');
const carouselIndicators = document.querySelectorAll('.carousel-indicator');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

// Carousel functionality
let currentSlide = 0;
const totalSlides = 3;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeScrollToTop();
    initializeCartFunctionality();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeMobileMenu();
    initializeNewsletterForm();
    createCartSidebar();
    showToast('Welcome to eShop! Happy shopping!', 'success');
});

// Carousel initialization and controls
function initializeCarousel() {
    // Auto-play carousel
    setInterval(() => {
        nextSlide();
    }, 5000);

    // Carousel navigation buttons
    carouselPrev.addEventListener('click', prevSlide);
    carouselNext.addEventListener('click', nextSlide);

    // Carousel indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    const translateX = -currentSlide * 100;
    carouselSlides.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
        if (index === currentSlide) {
            indicator.classList.remove('bg-white', 'bg-opacity-50');
            indicator.classList.add('bg-sky-500');
        } else {
            indicator.classList.remove('bg-sky-500');
            indicator.classList.add('bg-white', 'bg-opacity-50');
        }
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Shopping cart functionality
function initializeCartFunctionality() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            
            addToCart(productName, productPrice);
            
            // Add visual feedback
            this.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
            this.classList.add('bg-green-500');
            this.classList.remove('bg-sky-500', 'hover:bg-sky-600');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i>Add to Cart';
                this.classList.remove('bg-green-500');
                this.classList.add('bg-sky-500', 'hover:bg-sky-600');
            }, 1500);
        });
    });
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    cartCount += 1;
    updateCartCount();
    updateCartSidebar();
    showToast(`${name} added to cart!`, 'success');
}

function removeFromCart(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity;
        cart.splice(itemIndex, 1);
        updateCartCount();
        updateCartSidebar();
        showToast(`${name} removed from cart!`, 'info');
    }
}

function updateCartCount() {
    cartCountElement.textContent = cartCount;
    
    // Animation for cart count
    cartCountElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 200);
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('#features .bg-white');
    featureCards.forEach(card => {
        card.classList.add('feature-card');
        observer.observe(card);
    });

    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    const navLinks = document.querySelector('.md\\:flex');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle mobile menu (basic implementation)
            console.log('Mobile menu clicked');
        });
    }
}

// Newsletter form
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('footer .flex');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
            showToast('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        } else {
            showToast('Please enter a valid email address.', 'error');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getToastIcon(type)} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Create cart sidebar
function createCartSidebar() {
    const cartSidebar = document.createElement('div');
    cartSidebar.className = 'cart-sidebar';
    cartSidebar.innerHTML = `
        <div class="p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                <button class="close-cart text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="cart-items">
                <!-- Cart items will be inserted here -->
            </div>
            <div class="cart-total border-t pt-4 mt-4">
                <div class="flex items-center justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span class="total-amount text-sky-600">$0.00</span>
                </div>
                <button class="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg mt-4 transition-colors">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    `;
    
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    
    document.body.appendChild(cartSidebar);
    document.body.appendChild(cartOverlay);
    
    // Cart sidebar event listeners
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const closeCartBtn = cartSidebar.querySelector('.close-cart');
    
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function updateCartSidebar() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.querySelector('.total-amount');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-shopping-cart text-4xl mb-4"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item flex items-center justify-between py-4 border-b';
            cartItem.innerHTML = `
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800">${item.name}</h4>
                    <p class="text-sm text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span class="font-semibold text-sky-600">$${itemTotal.toFixed(2)}</span>
                    <button class="remove-item text-red-500 hover:text-red-700 ml-2" data-name="${item.name}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners to remove buttons
        const removeButtons = cartItemsContainer.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemName = button.getAttribute('data-name');
                removeFromCart(itemName);
            });
        });
    }
    
    totalAmountElement.textContent = `$${total.toFixed(2)}`;
}

// Pagination functionality
function initializePagination() {
    const paginationButtons = document.querySelectorAll('nav button');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            paginationButtons.forEach(btn => {
                btn.classList.remove('bg-sky-500', 'text-white');
                btn.classList.add('text-gray-700', 'hover:bg-sky-100');
            });
            
            // Add active class to clicked button
            this.classList.add('bg-sky-500', 'text-white');
            this.classList.remove('text-gray-700', 'hover:bg-sky-100');
        });
    });
}

// Search functionality (basic implementation)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products...';
    searchInput.className = 'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500';
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Wishlist functionality
function initializeWishlist() {
    let wishlist = [];
    
    function addToWishlist(productName) {
        if (!wishlist.includes(productName)) {
            wishlist.push(productName);
            showToast(`${productName} added to wishlist!`, 'success');
        } else {
            showToast(`${productName} is already in your wishlist!`, 'info');
        }
    }
    
    function removeFromWishlist(productName) {
        const index = wishlist.indexOf(productName);
        if (index > -1) {
            wishlist.splice(index, 1);
            showToast(`${productName} removed from wishlist!`, 'info');
        }
    }
}

// Product quick view functionality
function initializeQuickView() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'absolute top-2 left-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100';
        quickViewBtn.innerHTML = '<i class="fas fa-eye text-gray-700"></i>';
        
        const imageContainer = card.querySelector('.relative');
        imageContainer.classList.add('group');
        imageContainer.appendChild(quickViewBtn);
        
        quickViewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showQuickView(card);
        });
    });
}

function showQuickView(productCard) {
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.text-sky-600').textContent;
    const productImage = productCard.querySelector('img').src;
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">${productName}</h2>
                <button class="close-modal text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <img src="${productImage}" alt="${productName}" class="w-full h-64 object-cover rounded-lg mb-4">
            <p class="text-3xl font-bold text-sky-600 mb-4">${productPrice}</p>
            <button class="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg transition-colors">
                Add to Cart
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeModal = () => {
        document.body.removeChild(modal);
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializePagination();
    initializeQuickView();
    initializeWishlist();
    
    // Add some entrance animations
    const elements = document.querySelectorAll('.glassmorphism, .product-card, .bg-white');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update carousel on resize
    updateCarousel();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close cart with Escape key
    if (e.key === 'Escape') {
        const cartSidebar = document.querySelector('.cart-sidebar');
        if (cartSidebar.classList.contains('open')) {
            cartSidebar.classList.remove('open');
            document.querySelector('.cart-overlay').classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Carousel navigation with arrow keys
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading on DOM ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);
