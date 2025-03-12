// Show the modal on page load
window.onload = function() {
    document.getElementById('email-modal').style.display = 'flex';
  };
  
  document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission
  
    const email = document.getElementById('email').value;
    
    // Basic validation to check if email is empty
    if (!email) {
      alert('Please enter an email address.');
      return;
    }
  
    // Send email to the server
    fetch('/submit-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Thank you for subscribing!');
        document.getElementById('email-modal').style.display = 'none';
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting your email.');
    });
  });
  