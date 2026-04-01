import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

// Registration Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('confRegistrationForm');
    
    if (registrationForm) {
        const submitBtnForValidation = registrationForm.querySelector('button[type="submit"]');
        if (submitBtnForValidation) {
            submitBtnForValidation.addEventListener('click', function(e) {
                const termsInput = registrationForm.querySelector('input[name="terms"]');
                const newsletterInput = registrationForm.querySelector('input[name="newsletter"]');

                const missing = [];
                if (termsInput && !termsInput.checked) missing.push('Terms & Conditions');
                if (newsletterInput && !newsletterInput.checked) missing.push('Newsletter');

                if (missing.length > 0) {
                    e.preventDefault();
                    e.stopPropagation();

                    const msg = `Please accept: ${missing.join(' and ')} to complete registration.`;
                    if (window.UACPopup?.alert) {
                        window.UACPopup.alert(msg, { type: 'error', title: 'Action required' });
                    } else {
                        alert(msg);
                    }

                    const firstMissing = (termsInput && !termsInput.checked) ? termsInput : newsletterInput;
                    try {
                        firstMissing?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstMissing?.focus();
                    } catch (err) {}
                }
            }, true);
        }

        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            try {
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);

                const countrySelect = document.getElementById('country');
                const selectedOption = countrySelect?.options?.[countrySelect.selectedIndex];
                const phoneCountryCode = selectedOption?.getAttribute('data-code') || document.getElementById('countryCodeDisplay')?.textContent || '';
                const phoneFull = `${phoneCountryCode}${data.phone || ''}`;
                
                // Calculate total price based on selections
                let totalAmount = 0;
                if (data.registrationPackage === 'delegate') {
                    totalAmount = 30; // USD base
                } else if (data.registrationPackage === 'partner') {
                    totalAmount = 300;
                } else if (data.registrationPackage === 'sponsor') {
                    totalAmount = 3000;
                }
                
                // Add optional extras
                if (data.fieldTour === 'yes') totalAmount += 150;
                if (data.workshop === 'yes') totalAmount += 50;
                if (data.galaDinner === 'yes') totalAmount += 75;
                
                // Prepare registration data
                const registrationData = {
                    registrationType: 'conference',
                    personalInfo: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        phoneCountryCode: phoneCountryCode,
                        phoneFull: phoneFull,
                        country: data.country,
                        organization: data.organization || ''
                    },
                    package: {
                        type: data.registrationPackage,
                        totalAmount: totalAmount,
                        currency: data.country === 'UG' ? 'UGX' : 'USD'
                    },
                    professionalCategory: data.category,
                    additionalOptions: {
                        fieldTour: data.fieldTour === 'yes',
                        workshop: data.workshop === 'yes',
                        galaDinner: data.galaDinner === 'yes',
                        dietary: data.dietary || ''
                    },
                    newsletter: data.newsletter === 'on',
                    timestamp: serverTimestamp(),
                    status: 'pending',
                    paymentStatus: 'unpaid',
                    source: window.location.href
                };
                
                // Save to Firebase
                const docRef = await addDoc(collection(db, 'registrations'), registrationData);
                console.log('Registration saved with ID:', docRef.id);
                
                // Store in localStorage for reference
                localStorage.setItem('lastRegistrationId', docRef.id);
                
                // Show success message
                showNotification('success', 'Registration successful! Check your email for confirmation.');
                
                // Reset form
                this.reset();
                
                // Redirect to thank you page or show payment info
                setTimeout(() => {
                    window.location.href = 'thank-you.html?reg=' + docRef.id;
                }, 2000);
                
            } catch (error) {
                console.error('Error saving registration:', error);
                showNotification('error', 'Registration failed. Please try again or contact us.');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Sponsor/Exhibitor Inquiry Form
    const sponsorForm = document.getElementById('sponsorInquiryForm');
    if (sponsorForm) {
        sponsorForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                const inquiryData = {
                    registrationType: data.inquiryType || 'sponsor',
                    companyInfo: {
                        companyName: data.companyName,
                        contactName: data.contactName,
                        email: data.email,
                        phone: data.phone,
                        country: data.country
                    },
                    interests: {
                        package: data.package || '',
                        boothSize: data.boothSize || '',
                        additionalInfo: data.additionalInfo || ''
                    },
                    timestamp: serverTimestamp(),
                    status: 'new',
                    source: window.location.href
                };
                
                const docRef = await addDoc(collection(db, 'inquiries'), inquiryData);
                console.log('Inquiry saved with ID:', docRef.id);
                
                showNotification('success', 'Thank you for your interest! We\'ll contact you within 24 hours.');
                this.reset();
                
            } catch (error) {
                console.error('Error saving inquiry:', error);
                showNotification('error', 'Submission failed. Please try again or email us directly.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Helper function for notifications
    function showNotification(type, message) {
        // Check if notification container exists
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
            `;
            document.body.appendChild(container);
        }
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
