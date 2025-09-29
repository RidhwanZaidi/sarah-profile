// Business Profile JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add click event listeners
    initializeEventListeners();
    
    // Initialize code animation for desktop
    initializeCodeAnimation();
});

function initializeAnimations() {
    // Staggered animation for elements
    const animatedElements = document.querySelectorAll('.contact-card, .tech-chip, .stat-card');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${0.1 * index}s`;
    });
}

function initializeEventListeners() {
    // Add ripple effect to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function initializeCodeAnimation() {
    // Animate code lines on desktop
    if (window.innerWidth >= 768) {
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0.7';
                line.style.animation = 'codeGlow 2s ease-in-out infinite alternate';
            }, index * 200);
        });
    }
}

function handlePhoneContact() {
    // Add loading state
    const phoneCard = document.querySelector('.phone-card');
    phoneCard.classList.add('loading');
    
    // Simulate API call
    fetch('/contact/phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        // Remove loading state
        phoneCard.classList.remove('loading');
        
        // Show success message
        showNotification('Phone contact initiated!', 'success');
        
        // In a real app, this would open the phone dialer
        console.log('Phone contact:', data.phone);
        
        // For demo purposes, we'll just show an alert
        // In production, you might want to use tel: protocol
        if (confirm(`Call ${data.phone}?`)) {
            window.open(`tel:${data.phone}`, '_self');
        }
    })
    .catch(error => {
        phoneCard.classList.remove('loading');
        showNotification('Failed to initiate phone contact', 'error');
        console.error('Error:', error);
    });
}

function handleEmailContact() {
    // Add loading state
    const emailCard = document.querySelector('.email-card');
    emailCard.classList.add('loading');
    
    // Simulate API call
    fetch('/contact/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        // Remove loading state
        emailCard.classList.remove('loading');
        
        // Show success message
        showNotification('Email contact initiated!', 'success');
        
        // In a real app, this would open the email client
        console.log('Email contact:', data.email);
        
        // For demo purposes, we'll just show an alert
        // In production, you might want to use mailto: protocol
        if (confirm(`Send email to ${data.email}?`)) {
            window.open(`mailto:${data.email}`, '_self');
        }
    })
    .catch(error => {
        emailCard.classList.remove('loading');
        showNotification('Failed to initiate email contact', 'error');
        console.error('Error:', error);
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #00D4FF, #0099CC)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #FF6B6B, #FF5252)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #4ECDC4, #44A08D)';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for ripple effect and notifications
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle window resize for responsive animations
window.addEventListener('resize', function() {
    // Reinitialize code animation if switching to desktop
    if (window.innerWidth >= 768) {
        initializeCodeAnimation();
    }
});

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should animate when they come into view
    document.querySelectorAll('.contact-card, .tech-chip, .stat-card').forEach(el => {
        observer.observe(el);
    });
}
