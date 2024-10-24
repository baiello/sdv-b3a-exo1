const today = new Date();
today.setHours(2,0,0,0);
const dateInThreeMonths = new Date(today);
dateInThreeMonths.setMonth(dateInThreeMonths.getMonth() + 3);




const bodyElement = document.querySelector('body');

const modalElement = document.createElement('div');
modalElement.setAttribute('class', 'modal');
modalElement.setAttribute('id', 'booking-modal');

modalElement.innerHTML = `
    <div id="booking-modal-content" class="modal-container">
        <form id="booking-form" method="get" action="/resto1.html" novalidate>
            <div>
                <div>
                    <label for="firstname">Prénom :</label>
                </div>
                <div>
                    <input type="text" id="firstname" name="firstname">
                </div>
                <div class="error" id="firstname-error"></div>
            </div>
            <div>
                <div>
                    <label for="email">Email :</label>
                </div>
                <div>
                    <input type="email" id="email" name="email">
                </div>
                <div class="error" id="email-error"></div>
            </div>
            <div>
                <div>
                    <label for="phone">Téléphone :</label>
                </div>
                <div>
                    <input type="tel" id="phone" name="phone" placeholder="+33677889900">
                </div>
                <div class="error" id="phone-error"></div>
            </div>
            <div>
                <div>
                    <label for="date">Date :</label>
                </div>
                <div>
                    <input type="date" id="date" name="date" min="${today.toISOString().split('T')[0]}" max="${dateInThreeMonths.toISOString().split('T')[0]}">
                </div>
                <div class="error" id="date-error"></div>
            </div>
            <div>
                <div>
                    <label for="guests">Nombre de convives :</label>
                </div>
                <div>
                    <input type="number" id="guests" name="guests">
                </div>
                <div class="error" id="guests-error"></div>
            </div>
            <div>
                <div>
                    <input id="booking-submit" class="button" type="submit" value="Réserver">
                </div>
            </div>
        </form>
    </div>
`

bodyElement.append(modalElement);




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

    const firstname = formData.get('firstname');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const date = new Date(formData.get('date'));
    const guests = formData.get('guests');

    const emailRegex = /^[a-zA-Z0-9.-_+%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
    const phoneRegex = /^\+33[6,7][0-9]{8}$/gm;

    if (firstname.length < 2) {
        document.getElementById('firstname-error').innerText = "Veuillez entrer plus de 2 charactères."
    }

    if (!emailRegex.test(email)) {
        document.getElementById('email-error').innerText = "Email incorrect."
    }

    if (!phoneRegex.test(phone)) {
        document.getElementById('phone-error').innerText = "Numéro de mobile incorrect."
    }

    if (date < today || date > dateInThreeMonths) {
        document.getElementById('date-error').innerText = "La date de réservation doit être entre aujourd'hui et dans 3 mois."
    }

    if (guests < 1 || guests > 10 ) {
        document.getElementById('guests-error').innerText = "Vous devez être entre 1 et 10 personnes."
    }

});







const myEvent = new Event('userFetched');


let user = {};

function fetchUserA(id) {
    fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
            return response.json();
        })
        .then(userData => {
            user = userData;
            document.dispatchEvent(myEvent);
        });
}

async function fetchUserB(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const userData = await response.json();
    user = userData;
    document.dispatchEvent(myEvent);
}

fetchUserA(1);
fetchUserB(2);

document.addEventListener('userFetched', () =>  {
    console.log(user);
});
