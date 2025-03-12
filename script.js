window.onload = function() {
    const emailModal = document.getElementById('email-modal');
    if (emailModal) {
        emailModal.style.display = 'flex';
        console.log('Modal opened on page load');
    } else {
        console.error('Email modal not found in DOM');
    }
};

document.getElementById('email-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const emailModal = document.getElementById('email-modal');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        alert('Please enter an email address.');
        return;
    }
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    try {
        console.log('Submitting email:', email);
        const response = await fetch('http://localhost:3000/submit-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const data = await response.json();
        console.log('Server response:', data);

        if (data.success) {
            alert('Thank you for subscribing!');
            if (emailModal) {
                emailModal.style.display = 'none';
                console.log('Modal closed after successful submission');
            } else {
                console.error('Email modal not found when trying to close');
            }
            emailInput.value = '';
        } else {
            alert(data.message || 'Something went wrong. Please try again.');
            console.log('Server indicated failure:', data.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Error submitting your email. Please try again later.');
    }
});

document.getElementById('close-modal').addEventListener('click', function() {
    const emailModal = document.getElementById('email-modal');
    if (emailModal) {
        emailModal.style.display = 'none';
        console.log('Modal closed via close button');
    }
});