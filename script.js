function openBookingModal() {
    bookingModalElement.style.display = 'grid';
}

function closeBookingModal() {
    bookingModalElement.style.display = 'none';
}


document.getElementById('booking-button').addEventListener('click', () => {
    openBookingModal();
});

const bookingModalElement = document.getElementById('booking-modal');
const bookingModalContent = document.getElementById('booking-modal-content');

bookingModalElement.addEventListener('click', (event) => {
    if (event.target === bookingModalElement) {
        closeBookingModal();
    }
});

document.getElementById('booking-submit').addEventListener('click', (event) => {
    event.preventDefault();

    const bookingFormElement = document.querySelector('form#booking-form');
    const formData = new FormData(bookingFormElement);

    for (const value of formData.values()) {
        console.log(value);
    }
});
