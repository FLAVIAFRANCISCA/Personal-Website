// EmailJS Contact Form Submission
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const { name, email, message } = form;

  const templateParams = {
    from_name: name.value.trim(),
    from_email: email.value.trim(),
    message: message.value.trim()
  };

  try {
    //  Send email to myselff
    await emailjs.send('service_4fwfgzt', 'template_7upmncq', templateParams);

    //  Send auto-reply
    await emailjs.send('service_4fwfgzt', 'Ytemplate_kb3gwk4', {
      to_name: name.value.trim(),
      to_email: email.value.trim()
    });

    showModal('Message Sent!', 'Thank you for reaching out — I’ll get back to you soon!');
    form.reset();
  } catch (error) {
    console.error('EmailJS Error:', error);
    showModal('Oops! Something went wrong.', 'Please try again later or reach out via LinkedIn.');
  }
});
