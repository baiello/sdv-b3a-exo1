function openBookingModal() {
    bookingModalElement.style.display = 'grid';
}

function closeBookingModal() {
    bookingModalElement.style.display = 'none';
}


const bookingModalElement = document.getElementById('booking-modal');

document.getElementById('booking-button').addEventListener('click', () => {
    openBookingModal();
});

document.getElementById('close-booking-modal').addEventListener('click', () => {
    closeBookingModal();
})

// bookingModalElement.addEventListener('click', () => {
//     closeBookingModal();
// });





document.getElementById('booking-submit').addEventListener('click', (event) => {
    event.preventDefault();

    const bookingFormElement = document.querySelector('form#booking-form');
    const formData = new FormData(bookingFormElement);

    for (const value of formData.values()) {
        console.log(value);
    }
});
