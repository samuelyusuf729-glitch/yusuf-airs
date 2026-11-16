// Sample airline data to display dynamically on search
const mockFlights = [
    { id: 1, airline: "Emirates", flightNo: "EK-202", route: "New York (JFK) ➔ Dubai (DXB)", time: "08:00 AM - 08:30 PM", price: "$850" },
    { id: 2, airline: "Qatar Airways", flightNo: "QR-704", route: "New York (JFK) ➔ Doha (DOH)", time: "10:15 AM - 11:00 PM", price: "$790" },
    { id: 3, airline: "Singapore Airlines", flightNo: "SQ-026", route: "New York (JFK) ➔ Frankfurt (FRA)", time: "09:30 PM - 11:00 AM", price: "$650" },
    { id: 4, airline: "British Airways", flightNo: "BA-178", route: "New York (JFK) ➔ London (LHR)", time: "07:00 PM - 07:15 AM", price: "$580" }
];

const searchBtn = document.getElementById('search-flights-btn');
const resultsSection = document.getElementById('results-section');
const flightResultsContainer = document.getElementById('flight-results-container');
const paymentModal = document.getElementById('payment-modal');
const successModal = document.getElementById('success-modal');
const closeModal = document.getElementById('close-modal');
const paymentForm = document.getElementById('payment-form');
const bookingSummary = document.getElementById('booking-summary');
const finishBtn = document.getElementById('finish-btn');

let selectedFlightData = null;

// Handle Flight Search
searchBtn.addEventListener('click', () => {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    
    if(!origin || !destination) {
        alert('Please enter both origin and destination cities.');
        return;
    }

    // Reveal results
    resultsSection.classList.remove('hidden');
    flightResultsContainer.innerHTML = '';

    // Render flights
    mockFlights.forEach(flight => {
        const card = document.createElement('div');
        card.className = 'flight-card';
        card.innerHTML = `
            <div>
                <div class="flight-airline"><i class="fa-solid fa-plane"></i> ${flight.airline} (${flight.flightNo})</div>
                <div class="flight-route">${flight.route}</div>
                <div class="flight-time"><i class="fa-regular fa-clock"></i> ${flight.time}</div>
            </div>
            <div>
                <div class="flight-price">${flight.price}</div>
                <button class="btn-book" onclick="openPayment('${flight.airline}', '${flight.flightNo}', '${flight.price}')">Book Now</button>
            </div>
        `;
        flightResultsContainer.appendChild(card);
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
});

// Open Payment Modal
window.openPayment = function(airline, flightNo, price) {
    selectedFlightData = { airline, flightNo, price };
    bookingSummary.innerHTML = `
        <strong>Selected Flight:</strong> ${airline} (${flightNo})<br>
        <strong>Total Fare:</strong> <span style="color:var(--primary-blue); font-weight:bold;">${price}</span>
    `;
    paymentModal.classList.remove('hidden');
}

// Close Modal
closeModal.addEventListener('click', () => {
    paymentModal.classList.add('hidden');
});

// Handle Payment Submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    paymentModal.classList.add('hidden');
    
    // Generate random reference code
    const randomRef = '#YA-' + Math.floor(10000 + Math.random() * 90000);
    document.getElementById('ref-code').innerText = randomRef;
    
    successModal.classList.remove('hidden');
});

// Finish booking process
finishBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
    paymentForm.reset();
    resultsSection.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});