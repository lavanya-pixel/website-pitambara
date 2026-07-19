/* 
   Pitambara Dudh Dairy – Main Application Script
   Handles general UI interactions, loaders, sliders, modals, and helper utilities.
*/

// Main Configuration Object - Easily customizable by the owners
const PitambaraConfig = {
    businessName: "Pitambara Doodh Dairy",
    owners: ["Vandana Purohit", "Deelip Purohit"],
    phoneVandana: "+917668459330",
    phoneDeelip: "+917817873319",
    whatsapp: "+917817873319", // Primary operations WhatsApp
    address: "Devpura, Jaitpur Kala, District Agra, Uttar Pradesh"
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Preloader on window load
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // In case window load event already fired
    if (document.readyState === 'complete') {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }

    // 2. Scroll Progress Bar & Sticky Navbar & Back-to-top Button
    const progressBar = document.getElementById('scrollProgress');
    const navbar = document.querySelector('.navbar-custom');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollTop = window.scrollY;
        
        // Scroll progress
        if (progressBar && scrollHeight > 0) {
            const percentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${percentage}%`;
        }

        // Sticky Navbar state
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back-to-top button visibility
        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });

    // 3. Back to Top Click Action
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Floating Milk Drops Generator (Aesthetics)
    const initMilkDrops = () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        let container = heroSection.querySelector('.milk-drops-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'milk-drops-container';
            heroSection.appendChild(container);
        }

        const maxDrops = 15;
        for (let i = 0; i < maxDrops; i++) {
            createDrop(container);
        }
    };

    const createDrop = (container) => {
        const drop = document.createElement('div');
        drop.className = 'milk-drop';
        
        const size = Math.random() * 20 + 8; // Size between 8px and 28px
        const left = Math.random() * 100; // Left offset %
        const duration = Math.random() * 12 + 8; // Speed between 8s and 20s
        const delay = Math.random() * -20; // Pre-warm animation to start immediately

        drop.style.width = `${size}px`;
        drop.style.height = `${size}px`;
        drop.style.left = `${left}%`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;

        container.appendChild(drop);

        // Recycle drop when animation finishes
        drop.addEventListener('animationiteration', () => {
            drop.style.left = `${Math.random() * 100}%`;
            const newSize = Math.random() * 20 + 8;
            drop.style.width = `${newSize}px`;
            drop.style.height = `${newSize}px`;
        });
    };

    initMilkDrops();

    // 5. Testimonial Auto Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialSlider && testimonialSlides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        // Clear existing dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            // Generate dots
            testimonialSlides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });
        }

        const goToSlide = (index) => {
            currentIndex = index;
            testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update active dot
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        const nextSlide = () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= testimonialSlides.length) {
                nextIndex = 0;
            }
            goToSlide(nextIndex);
        };

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000); // Auto slide every 5 seconds
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Pause on hover
        testimonialSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        testimonialSlider.addEventListener('mouseleave', startInterval);

        startInterval();
    }

    // 6. Buy Modal & Order Action
    const buyModal = document.getElementById('buyModal');
    const orderButtons = document.querySelectorAll('.btn-order-now');
    
    if (buyModal) {
        const buyModalClose = buyModal.querySelector('.buy-modal-close');
        const modalProductName = document.getElementById('modalProductName');
        const orderForm = document.getElementById('orderForm');

        // Open modal
        orderButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = btn.getAttribute('data-product') || "Fresh Dairy Product";
                if (modalProductName) modalProductName.textContent = productName;
                buyModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        const closeModal = () => {
            buyModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (buyModalClose) buyModalClose.addEventListener('click', closeModal);
        buyModal.addEventListener('click', (e) => {
            if (e.target === buyModal) closeModal();
        });

        // Order Form submit redirection to WhatsApp
        if (orderForm) {
            orderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('orderName').value;
                const phone = document.getElementById('orderPhone').value;
                const quantity = document.getElementById('orderQuantity').value;
                const note = document.getElementById('orderNote').value;
                const product = modalProductName ? modalProductName.textContent : "Dairy Product";

                // Construct message
                const message = `Hello Pitambara Dudh Dairy! I would like to place an order:%0A%0A` +
                                `*Product:* ${product}%0A` +
                                `*Quantity:* ${quantity}%0A` +
                                `*Name:* ${name}%0A` +
                                `*Phone:* ${phone}%0A` +
                                `*Special Instructions:* ${note || 'None'}`;
                
                const whatsappUrl = `https://wa.me/${PitambaraConfig.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`;
                
                // Open WhatsApp in new tab
                window.open(whatsappUrl, '_blank');
                closeModal();
                showCustomToast("Order request initialized! Opening WhatsApp...", "success");
            });
        }
    }
});

// Toast notification helper
function showCustomToast(message, type = "success") {
    // Check if toast already exists
    let toast = document.querySelector('.custom-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = `custom-toast custom-toast-${type}`;
        
        const icon = document.createElement('span');
        icon.className = 'custom-toast-icon';
        icon.innerHTML = type === 'success' ? '✓' : 'ℹ';
        
        const text = document.createElement('span');
        text.className = 'custom-toast-text';
        
        toast.appendChild(icon);
        toast.appendChild(text);
        document.body.appendChild(toast);
    }
    
    toast.querySelector('.custom-toast-text').textContent = message;
    toast.className = `custom-toast custom-toast-${type} active`;
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}
