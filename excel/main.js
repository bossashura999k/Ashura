// ===========================
// Navigation Functionality
// ===========================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-links a');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateActiveNavLink();
});

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (in production, this would send to a server)
    console.log('Form submitted:', formData);
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'grid';
        formSuccess.style.display = 'none';
    }, 3000);
});

// ===========================
// Service Modal Functionality
// ===========================

const serviceModal = document.getElementById('serviceModal');
const modalBody = document.getElementById('modalBody');

const serviceContent = {
    'symptom-checker': {
        title: 'Symptom Checker',
        icon: 'fa-diagnoses',
        description: 'Our intelligent symptom assessment tool helps you understand your health concerns by analyzing your symptoms using advanced AI technology.',
        features: [
            'Step-by-step symptom analysis',
            'Comprehensive health questionnaire',
            'Risk level assessment',
            'Recommended actions and next steps',
            'Emergency condition detection',
            'Medical information resources'
        ],
        cta: 'Start Symptom Assessment',
        info: 'This tool is designed to provide guidance and does not replace professional medical diagnosis. If you have severe symptoms or a medical emergency, please call 911 or visit the nearest emergency room.'
    },
    'telemedicine': {
        title: 'Telemedicine Consultation',
        icon: 'fa-video',
        description: 'Connect with licensed healthcare professionals through secure, HIPAA-compliant video consultations from the comfort of your home.',
        features: [
            'Board-certified physicians',
            'Same-day appointments available',
            'Secure HD video platform',
            'Electronic prescription services',
            'Medical record access',
            'Follow-up care coordination'
        ],
        cta: 'Schedule Consultation',
        info: 'Consultations typically last 15-30 minutes. Insurance accepted. Co-pays may apply based on your plan.'
    },
    'medication': {
        title: 'Medication Management',
        icon: 'fa-pills',
        description: 'Take control of your medication regimen with our comprehensive management tools designed to improve adherence and safety.',
        features: [
            'Smart medication reminders',
            'Drug interaction checker',
            'Pharmacy integration',
            'Refill notifications',
            'Dosage tracking',
            'Medication history log'
        ],
        cta: 'Start Managing Medications',
        info: 'Our system integrates with major pharmacy chains for seamless prescription management. All data is encrypted and HIPAA-compliant.'
    },
    'mental-health': {
        title: 'Mental Health Support',
        icon: 'fa-brain',
        description: 'Access confidential mental health resources, self-assessment tools, and connect with licensed therapists who specialize in various areas of mental wellness.',
        features: [
            'Depression and anxiety screening',
            'Licensed therapist network',
            'Private therapy sessions',
            'Crisis support resources',
            'Mindfulness and coping tools',
            'Progress tracking'
        ],
        cta: 'Get Mental Health Support',
        info: 'All sessions are completely confidential. Crisis support available 24/7. If you are in crisis, call the National Suicide Prevention Lifeline at 988.'
    },
    'health-records': {
        title: 'Health Record Management',
        icon: 'fa-notes-medical',
        description: 'Securely store, organize, and access your complete medical history in one convenient digital platform.',
        features: [
            'Encrypted cloud storage',
            'Easy provider sharing',
            'Lab results tracking',
            'Vaccination records',
            'Health timeline visualization',
            'Document scanning'
        ],
        cta: 'Manage Your Records',
        info: 'Your health records are protected with bank-level encryption and are fully HIPAA-compliant. You maintain complete control over who can access your information.'
    },
    'chronic-disease': {
        title: 'Chronic Disease Management',
        icon: 'fa-heartbeat',
        description: 'Comprehensive support for managing chronic conditions with personalized care plans, monitoring tools, and ongoing professional guidance.',
        features: [
            'Diabetes management',
            'Hypertension monitoring',
            'Asthma care plans',
            'Heart disease support',
            'Educational resources',
            'Regular health check-ins'
        ],
        cta: 'Start Managing Your Condition',
        info: 'Our chronic disease management programs are designed in collaboration with medical specialists to provide evidence-based care tailored to your needs.'
    }
};

function showServiceModal(serviceId) {
    const service = serviceContent[serviceId];
    if (!service) return;
    
    modalBody.innerHTML = `
        <div class="modal-service-content">
            <div class="modal-header">
                <i class="fas ${service.icon}"></i>
                <h2>${service.title}</h2>
            </div>
            <p class="modal-description">${service.description}</p>
            <div class="modal-features">
                <h3>Key Features:</h3>
                <ul>
                    ${service.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-info">
                <i class="fas fa-info-circle"></i>
                <p>${service.info}</p>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="handleServiceCTA('${serviceId}')">${service.cta}</button>
                <button class="btn btn-secondary" onclick="closeServiceModal()">Close</button>
            </div>
        </div>
    `;
    
    serviceModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function handleServiceCTA(serviceId) {
    // In a real application, this would navigate to the service page or start the process
    alert(`Starting ${serviceContent[serviceId].title}...\n\nThis feature would be fully implemented in production. For now, please use the contact form to inquire about our services.`);
    closeServiceModal();
    
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === serviceModal) {
        closeServiceModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.style.display === 'block') {
        closeServiceModal();
    }
});

// ===========================
// Scroll Animations
// ===========================

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .service-card, .stat');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .stat');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// ===========================
// Utility Functions
// ===========================

// Smooth scroll to top button (can be added if needed)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Format phone numbers
function formatPhoneNumber(input) {
    const phoneNumber = input.value.replace(/\D/g, '');
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    input.value = formattedNumber;
}

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        formatPhoneNumber(this);
    });
}

// ===========================
// Initialize on Page Load
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href').length > 1) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Initialize navbar state
    handleNavbarScroll();
    updateActiveNavLink();
    
    console.log('DHC Healthcare Website Loaded Successfully');
});

// ===========================
// Additional Modal Styles
// ===========================

// Add modal styles dynamically
const style = document.createElement('style');
style.textContent = `
    .modal-service-content {
        padding: 1rem 0;
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .modal-header i {
        font-size: 3rem;
        color: var(--primary-blue);
    }
    
    .modal-header h2 {
        font-size: 2rem;
        color: var(--text-dark);
        margin: 0;
    }
    
    .modal-description {
        color: var(--text-gray);
        line-height: 1.7;
        margin-bottom: 2rem;
        font-size: 1.05rem;
    }
    
    .modal-features {
        background: var(--light-blue);
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
    }
    
    .modal-features h3 {
        color: var(--text-dark);
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .modal-features ul {
        list-style: none;
        padding: 0;
    }
    
    .modal-features li {
        color: var(--text-gray);
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .modal-features li i {
        color: var(--accent-green);
        font-size: 1rem;
    }
    
    .modal-info {
        background: #FFF3CD;
        border-left: 4px solid #FFA500;
        padding: 1rem;
        border-radius: 4px;
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .modal-info i {
        color: #FFA500;
        font-size: 1.5rem;
        margin-top: 0.25rem;
    }
    
    .modal-info p {
        color: #856404;
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }
    
    @media (max-width: 768px) {
        .modal-header {
            flex-direction: column;
            text-align: center;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);
