document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
        });
    }

    // 2. Logic for Band Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.onsubmit = async (e) => {
            e.preventDefault();

            const bandName = document.getElementById('bandName').value;
            const price = document.getElementById('bandPrice').value;
            const location = document.getElementById('bandLocation').value;

            const submitBtn = registerForm.querySelector('button[type="submit"]');

            const bandData = {
                name: bandName,
                price: price,
                location: location
            };

            submitBtn.disabled = true;
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Saving...';

            try {
                const response = await fetch('http://localhost:3000/api/bands', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bandData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(`Your band ${bandName} has successfully registered.`);
                    registerForm.reset();
                    submitBtn.innerText = 'Registered Successfully!';
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    console.error("Failed to register:", result.message);
                    submitBtn.innerText = 'Error! Try Again.';
                    setTimeout(() => { submitBtn.disabled = false; submitBtn.innerText = originalText; }, 2000);
                }
            } catch (error) {
                console.error("Error connecting to server:", error);
                submitBtn.innerText = 'Server Error!';
                setTimeout(() => { submitBtn.disabled = false; submitBtn.innerText = originalText; }, 2000);
            }
        };
    }

    // 3. Logic for Contact Form 
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = async (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            const submitBtn = contactForm.querySelector('button[type="submit"]');

            const messageData = {
                name: name,
                email: email,
                message: message
            };

            submitBtn.disabled = true;
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';

            try {
                const response = await fetch('http://localhost:3000/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(messageData)
                });

                if (response.ok) {
                    alert(`Thanks for reaching out, ${name}! Your message has been sent. We will get back to you soon.`);
                    contactForm.reset();
                    submitBtn.innerText = 'Message Sent!';
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    alert("There was an error sending your message. Please try again.");
                    submitBtn.innerText = 'Error! Try Again.';
                    setTimeout(() => { submitBtn.disabled = false; submitBtn.innerText = originalText; }, 2000);
                }
            } catch (error) {
                console.error("Contact Error:", error);
                alert("Server error. Make sure your Node.js backend is running.");
                submitBtn.innerText = 'Server Error!';
                setTimeout(() => { submitBtn.disabled = false; submitBtn.innerText = originalText; }, 2000);
            }
        };
    }

    // 4. Bulletproof Logic for HARDCODED "Book Now" buttons (REDIRECT TO BOOK.HTML)
    const bookButtons = document.querySelectorAll('.book-btn');
    if (bookButtons.length > 0) {
        bookButtons.forEach(button => {
            button.onclick = (event) => {
                event.preventDefault();
                const card = event.target.closest('.band-card');
                const bandName = card.querySelector('.festival-name').innerText;

                // Extract price and remove commas/symbols for the URL
                let priceRaw = card.querySelector('.band-price').innerText;
                const cleanPrice = priceRaw.replace(/[^0-9]/g, '');

                // Redirect to the booking page with parameters
                window.location.href = `book.html?band=${encodeURIComponent(bandName)}&price=${encodeURIComponent(cleanPrice)}`;
            };
        });
    }

    // 5. Fetch and Display Bands from MongoDB (REDIRECT TO BOOK.HTML)
    const bandsGrid = document.getElementById('bandsGrid');

    async function loadDatabaseBands() {
        if (!bandsGrid) return;

        try {
            const response = await fetch('http://localhost:3000/api/bands');
            const bands = await response.json();

            bands.forEach(band => {
                const bandCard = document.createElement('div');
                bandCard.className = 'band-card bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 flex flex-col group';

                const defaultImage = `https://images.unsplash.com/photo-1516457360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop`;

                bandCard.innerHTML = `
                    <div class="overflow-hidden h-52 relative">
                        <img src="${defaultImage}" alt="${band.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                    </div>
                    <div class="p-6 flex flex-col flex-grow relative -mt-12 z-10">
                        <h3 class="text-2xl font-bold text-white mb-2 drop-shadow-md festival-name">${band.name}</h3>
                        <p class="text-gray-300 mb-1 flex items-center gap-2 location-text"><i class="fas fa-map-marker-alt text-pink-500"></i> ${band.location}</p>
                        <p class="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6 band-price">₹${band.price}</p>
                        <div class="mt-auto flex justify-end">
                            <button class="dynamic-book-btn bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300">
                                Book Now
                            </button>
                        </div>
                    </div>
                `;

                const bookBtn = bandCard.querySelector('.dynamic-book-btn');
                bookBtn.onclick = (event) => {
                    event.preventDefault();
                    // Clean price and redirect
                    const cleanPrice = String(band.price).replace(/[^0-9]/g, '');
                    window.location.href = `book.html?band=${encodeURIComponent(band.name)}&price=${encodeURIComponent(cleanPrice)}`;
                };

                bandsGrid.appendChild(bandCard);
            });

        } catch (error) {
            console.error("Error fetching bands from database:", error);
        }
    }

    loadDatabaseBands();

    // 6. Search Functionality
    const searchInput = document.getElementById('searchInput');
    const noResultsMsg = document.getElementById('noResults');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            const currentBandCards = document.querySelectorAll('.band-card');
            let visibleCount = 0;

            currentBandCards.forEach(card => {
                const name = card.querySelector('.festival-name').innerText.toLowerCase();
                const location = card.querySelector('.location-text').innerText.toLowerCase();

                if (name.includes(query) || location.includes(query)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (visibleCount === 0) {
                noResultsMsg.classList.remove('hidden');
            } else {
                noResultsMsg.classList.add('hidden');
            }
        });
    }

    // 7. Booking Page Logic (WITH UPI PAYMENT MODAL)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const bandName = urlParams.get('band');
        const price = urlParams.get('price');

        // Modal Elements
        const paymentModal = document.getElementById('paymentModal');
        const modalAmount = document.getElementById('modalAmount');
        const upiQRCode = document.getElementById('upiQRCode');
        const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
        const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');

        if (bandName && price) {
            document.getElementById('summaryBandName').innerText = bandName;
            const formattedPrice = parseInt(price).toLocaleString('en-IN');

            document.getElementById('summaryPrice').innerText = `₹${formattedPrice}`;
            document.getElementById('summaryTotal').innerText = `₹${formattedPrice}`;

            // Update the Modal text
            modalAmount.innerText = `₹${formattedPrice}`;

            // Generate a real dynamic QR Code for UPI
            // Format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT
            const upiString = `upi://pay?pa=vishwakarmaranjit8109@okaxis&pn=BandMitra&am=${price}&cu=INR`;
            upiQRCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;

        } else {
            window.location.href = 'Bands.html';
        }

        // 1. When form is submitted, show the modal instead of sending to database
        let pendingBookingData = {}; // Store data temporarily

        bookingForm.onsubmit = (e) => {
            e.preventDefault();
            const inputs = bookingForm.querySelectorAll('input, textarea');

            // Save the data temporarily
            pendingBookingData = {
                customerName: inputs[0].value,
                phoneNumber: inputs[1].value,
                eventDate: inputs[2].value,
                eventTime: inputs[3].value,
                venueAddress: inputs[4].value,
                bandName: bandName,
                totalPrice: parseInt(price)
            };

            // Open the Payment Modal
            paymentModal.classList.remove('hidden');
        };

        // 2. If they cancel, hide the modal
        cancelPaymentBtn.onclick = (e) => {
            e.preventDefault();
            paymentModal.classList.add('hidden');
        };

        // 3. If they click "I Have Paid", NOW we send to the database
        confirmPaymentBtn.onclick = async (e) => {
            e.preventDefault();

            confirmPaymentBtn.disabled = true;
            confirmPaymentBtn.innerText = 'Verifying...';

            try {
                const response = await fetch('http://localhost:3000/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pendingBookingData)
                });

                if (response.ok) {
                    alert(`Payment verified! Your booking for ${bandName} is confirmed. We will contact you shortly.`);
                    window.location.href = 'index.html';
                } else {
                    alert("There was an error processing your booking. Please try again.");
                    confirmPaymentBtn.disabled = false;
                    confirmPaymentBtn.innerText = 'I Have Paid';
                }
            } catch (error) {
                console.error("Booking Error:", error);
                alert("Server error. Make sure your Node.js backend is running.");
                confirmPaymentBtn.disabled = false;
                confirmPaymentBtn.innerText = 'I Have Paid';
            }
        };
    }

    // 8. Admin Dashboard Logic
    const adminDashboard = document.getElementById('adminDashboardPage');
    if (adminDashboard) {

        // --- NEW: Dynamic Sidebar Highlight Logic ---
        const adminNavLinks = document.querySelectorAll('aside nav a[href^="#"]');
        adminNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                // 1. Reset all links to the default gray inactive style
                adminNavLinks.forEach(nav => {
                    nav.className = 'block px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-700 hover:text-white transition-colors';
                });
                // 2. Apply the active pink style to the specific link that was just clicked
                this.className = 'block px-4 py-3 rounded-xl bg-gray-900 text-pink-400 font-bold border border-gray-700 hover:border-pink-500 transition-colors';
            });
        });

        // Fetch and render Bookings
        async function loadAdminBookings() {
            const tbody = document.getElementById('adminBookingsTable');
            try {
                const res = await fetch('http://localhost:3000/api/bookings');
                const bookings = await res.json();

                tbody.innerHTML = '';
                if (bookings.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" class="p-6 text-center text-gray-500">No bookings yet.</td></tr>`;
                    return;
                }

                bookings.forEach(b => {
                    const priceFormatted = parseInt(b.totalPrice).toLocaleString('en-IN');
                    tbody.innerHTML += `
                        <tr class="hover:bg-gray-750 transition-colors">
                            <td class="p-4 font-medium text-white">${b.customerName}<br><span class="text-xs text-gray-400">${b.phoneNumber}</span></td>
                            <td class="p-4 text-pink-400 font-bold">${b.bandName}</td>
                            <td class="p-4 text-gray-300">${b.eventDate}<br><span class="text-xs text-gray-500">${b.eventTime}</span></td>
                            <td class="p-4 text-green-400 font-bold">₹${priceFormatted}</td>
                        </tr>
                    `;
                });
            } catch (err) {
                tbody.innerHTML = `<tr><td colspan="4" class="p-6 text-center text-red-400">Failed to load data.</td></tr>`;
            }
        }

        // Fetch and render Messages
        async function loadAdminMessages() {
            const grid = document.getElementById('adminMessagesGrid');
            try {
                const res = await fetch('http://localhost:3000/api/messages');
                const messages = await res.json();

                grid.innerHTML = '';
                if (messages.length === 0) {
                    grid.innerHTML = `<p class="text-gray-500 col-span-full">No messages yet.</p>`;
                    return;
                }

                messages.forEach(m => {
                    const date = new Date(m.submittedAt).toLocaleDateString();
                    grid.innerHTML += `
                        <div class="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg relative">
                            <div class="absolute top-4 right-4 text-xs text-gray-500">${date}</div>
                            <h4 class="font-bold text-lg text-white">${m.name}</h4>
                            <p class="text-orange-400 text-sm mb-3">${m.email}</p>
                            <p class="text-gray-300 text-sm bg-gray-900 p-3 rounded-lg border border-gray-700">${m.message}</p>
                        </div>
                    `;
                });
            } catch (err) {
                grid.innerHTML = `<p class="text-red-400 col-span-full">Failed to load data.</p>`;
            }
        }

        // Fetch and render Bands
        async function loadAdminBands() {
            const tbody = document.getElementById('adminBandsTable');
            try {
                const res = await fetch('http://localhost:3000/api/bands');
                const bands = await res.json();

                tbody.innerHTML = '';
                if (bands.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="3" class="p-6 text-center text-gray-500">No bands registered yet.</td></tr>`;
                    return;
                }

                bands.forEach(b => {
                    const priceFormatted = parseInt(b.price).toLocaleString('en-IN');
                    tbody.innerHTML += `
                        <tr class="hover:bg-gray-750 transition-colors">
                            <td class="p-4 font-bold text-white">${b.name}</td>
                            <td class="p-4 text-gray-300"><i class="fas fa-map-marker-alt text-gray-500 mr-2"></i>${b.location}</td>
                            <td class="p-4 text-purple-400 font-bold">₹${priceFormatted}</td>
                        </tr>
                    `;
                });
            } catch (err) {
                tbody.innerHTML = `<tr><td colspan="3" class="p-6 text-center text-red-400">Failed to load data.</td></tr>`;
            }
        }

        // Run all three functions
        loadAdminBookings();
        loadAdminMessages();
        loadAdminBands();
    }

}); // End of DOMContentLoaded