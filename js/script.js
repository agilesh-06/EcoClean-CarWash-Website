document.addEventListener('DOMContentLoaded', () => {

    // --- Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    window.dispatchEvent(new Event('scroll'));

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navList = document.querySelector('.nav-list');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');

            const icon = mobileToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when link clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');

                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal, .fade-up');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    setTimeout(revealOnScroll, 100);

    const heroElements = document.querySelectorAll('.hero .fade-up');
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('active'));
    }, 300);

    // ==========================
    // BOOKING FORM
    // ==========================
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {

        bookingForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const submitBtn =
                bookingForm.querySelector('button[type="submit"]');

            const originalText =
                submitBtn.textContent;

            submitBtn.textContent = 'Processing...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            try {

                const data = {
                    name: document.getElementById("name").value,
                    phone: document.getElementById("phone").value,
                    service: document.getElementById("service").value,
                    date: document.getElementById("date").value,
                    time: document.getElementById("time").value,
                    address: document.getElementById("address").value
                };

                // Save to Google Sheet
                await fetch(
                    "https://script.google.com/macros/s/AKfycbxAeWXKlMOcf8kZ42ZEOBnS5renZHH8ZSmwifcZNirkxica_6Z9dJhGDIkYJrCkLn4-/exec",
                    {
                        method: "POST",
                        mode: "no-cors",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                        body: JSON.stringify(data)
                    }
                );

                submitBtn.textContent = 'Booking Confirmed!';
                submitBtn.style.backgroundColor = 'green';

                // WhatsApp Message
                const whatsappMessage =
                    `🚗 NEW CAR WASH BOOKING

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📦 Plan: ${data.service}
📅 Date: ${data.date}
🕐 Time: ${data.time}
📍 Address: ${data.address}

Please confirm my booking.`;

                // Admin Number
                const whatsappURL =
                    `https://wa.me/918072919126?text=${encodeURIComponent(whatsappMessage)}`;

                // Reset form
                bookingForm.reset();

                // Open WhatsApp
                window.location.href = whatsappURL;

            } catch (err) {

                console.error("Script Error:", err);

                alert(
                    "Booking failed. Please try again."
                );

                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }

        });

    }

    // ==========================
    // NEWSLETTER
    // ==========================
    const newsletterForm =
        document.querySelector('.newsletter-form');

    if (newsletterForm) {

        newsletterForm.addEventListener('submit', (e) => {

            e.preventDefault();

            const input =
                newsletterForm.querySelector('input');

            if (input.value) {

                alert(
                    `Thank you for subscribing with ${input.value}!`
                );

                input.value = '';

            }

        });

    }

});