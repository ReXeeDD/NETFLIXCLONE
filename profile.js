// DOM Elements
const changePlanBtn = document.querySelector('.change-plan');
const cancelMembershipBtn = document.querySelector('.cancel-membership');
const changeEmailBtn = document.querySelector('.change-email');
const changePasswordBtn = document.querySelector('.change-password');
const changePhoneBtn = document.querySelector('.change-phone');
const managePaymentBtn = document.querySelector('.manage-payment');
const changeBillingDayBtn = document.querySelector('.change-billing-day');
const manageProfileBtns = document.querySelectorAll('.manage-profile');
const settingItems = document.querySelectorAll('.setting-item');

// Mock user data (in a real app, this would come from a backend)
const userData = {
    email: 'user@example.com',
    phone: '(555) 123-4567',
    plan: 'Premium',
    planFeatures: '4K + HDR',
    paymentMethod: 'Visa •••• 1234',
    billingDay: '15th of every month'
};

// Event Listeners
changePlanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPlanSelection();
});

cancelMembershipBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to cancel your membership? You will lose access to Netflix at the end of your billing period.')) {
        // Handle membership cancellation
        alert('Your membership will be canceled at the end of your billing period.');
    }
});

changeEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newEmail = prompt('Enter your new email address:', userData.email);
    if (newEmail && validateEmail(newEmail)) {
        // In a real app, this would make an API call to update the email
        userData.email = newEmail;
        alert('Email updated successfully!');
    } else if (newEmail) {
        alert('Please enter a valid email address.');
    }
});

changePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real app, this would open a modal with a proper password change form
    const currentPassword = prompt('Enter your current password:');
    if (currentPassword) {
        const newPassword = prompt('Enter your new password:');
        if (newPassword && newPassword.length >= 6) {
            // In a real app, this would make an API call to update the password
            alert('Password updated successfully!');
        } else {
            alert('Password must be at least 6 characters long.');
        }
    }
});

changePhoneBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newPhone = prompt('Enter your new phone number:', userData.phone);
    if (newPhone && validatePhone(newPhone)) {
        // In a real app, this would make an API call to update the phone number
        userData.phone = newPhone;
        alert('Phone number updated successfully!');
    } else if (newPhone) {
        alert('Please enter a valid phone number.');
    }
});

managePaymentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real app, this would open a modal with payment management options
    alert('Payment management feature coming soon!');
});

changeBillingDayBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real app, this would open a modal with billing day options
    alert('Billing day change feature coming soon!');
});

manageProfileBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const profileName = e.target.closest('.profile-item').querySelector('.profile-details strong').textContent;
        // In a real app, this would open a modal with profile management options
        alert(`Profile management for ${profileName} coming soon!`);
    });
});

settingItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const setting = e.target.closest('.setting-item').querySelector('span').textContent;
        // In a real app, this would navigate to the respective setting page
        alert(`${setting} feature coming soon!`);
    });
});

// Helper Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\(\d{3}\) \d{3}-\d{4}$/;
    return re.test(phone);
}

function showPlanSelection() {
    // In a real app, this would open a modal with plan selection options
    const plans = [
        { name: 'Basic', price: '8.99', features: 'Good video quality in SD' },
        { name: 'Standard', price: '13.99', features: 'Better video quality in HD' },
        { name: 'Premium', price: '17.99', features: 'Best video quality in Ultra HD (4K) and HDR' }
    ];
    
    let planMessage = 'Available Plans:\n\n';
    plans.forEach(plan => {
        planMessage += `${plan.name}: $${plan.price}/month\n${plan.features}\n\n`;
    });
    
    alert(planMessage + 'Plan change feature coming soon!');
} 