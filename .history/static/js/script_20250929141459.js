// Contact handling functions
function handlePhoneContact() {
    try {
        // Get phone number from the page
        const phoneElement = document.querySelector('.contact-card .contact-value');
        const phoneNumber = phoneElement ? phoneElement.textContent.trim() : '016-4282828';
        
        // Create a temporary link to initiate phone call
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phoneNumber}`;
        phoneLink.style.display = 'none';
        document.body.appendChild(phoneLink);
        phoneLink.click();
        document.body.removeChild(phoneLink);
        
        // Show success message
        showNotification(`Calling ${phoneNumber}...`, 'success');
        
    } catch (error) {
        console.error('Error initiating phone call:', error);
        showNotification('Unable to initiate phone call. Please dial manually.', 'error');
    }
}

function handleEmailContact() {
    try {
        // Get email from the page
        const emailElements = document.querySelectorAll('.contact-card .contact-value');
        const emailElement = Array.from(emailElements).find(el => el.textContent.includes('@'));
        const emailAddress = emailElement ? emailElement.textContent.trim() : 'maisarah@otamy.net';
        
        // Create a temporary link to initiate email
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${emailAddress}`;
        emailLink.style.display = 'none';
        document.body.appendChild(emailLink);
        emailLink.click();
        document.body.removeChild(emailLink);
        
        // Show success message
        showNotification(`Opening email to ${emailAddress}...`, 'success');
        
    } catch (error) {
        console.error('Error initiating email:', error);
        showNotification('Unable to open email client. Please copy the email address manually.', 'error');
    }
}

// Add to contacts functionality
function addToContacts() {
    try {
        // Get contact information from the page
        const name = 'Maisarah';
        const title = 'Senior Business Development Manager';
        const company = 'OTA MY SDN BHD';
        const phone = '016-4282828';
        const email = 'maisarah@otamy.net';
        
        // Create vCard content
        const vCardContent = createVCard(name, title, company, phone, email);
        
        // Create and download vCard file
        downloadVCard(vCardContent, `${name.replace(' ', '_')}.vcf`);
        
        // Show success message
        showNotification('Contact saved! Check your downloads folder.', 'success');
        
    } catch (error) {
        console.error('Error saving contact:', error);
        showNotification('Unable to save contact. Please try again.', 'error');
    }
}

// Create vCard content
function createVCard(name, title, company, phone, email) {
    return `BEGIN:VCARD
VERSION:3.0
FN:${name}
N:${name.split(' ').reverse().join(';')};;;
ORG:${company}
TITLE:${title}
TEL:${phone}
EMAIL:${email}
END:VCARD`;
}

// Download vCard file
function downloadVCard(content, filename) {
    const blob = new Blob([content], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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