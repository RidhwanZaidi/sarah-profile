// Contact handling functions
async function handlePhoneContact() {
    try {
        const response = await fetch('/api/contact/phone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Create a temporary link to initiate phone call
            const phoneLink = document.createElement('a');
            phoneLink.href = `tel:${data.phone}`;
            phoneLink.click();
            
            // Show success message
            showNotification('Phone contact initiated!', 'success');
        } else {
            showNotification('Failed to initiate phone contact', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to initiate phone contact', 'error');
    }
}

async function handleEmailContact() {
    try {
        const response = await fetch('/api/contact/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Create a temporary link to initiate email
            const emailLink = document.createElement('a');
            emailLink.href = `mailto:${data.email}`;
            emailLink.click();
            
            // Show success message
            showNotification('Email contact initiated!', 'success');
        } else {
            showNotification('Failed to initiate email contact', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Failed to initiate email contact', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f56565, #e53e3e)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add click animations to contact cards
document.addEventListener('DOMContentLoaded', function() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('contact-card')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});