const today = new Date();
today.setUTCHours(0,0,0,0);
const dateInThreeMonths = new Date(today);
dateInThreeMonths.setUTCMonth(dateInThreeMonths.getUTCMonth() + 3);

function validateFormInputs(FormHtmlElement) {
    let isValid = true;

    const formData = new FormData(FormHtmlElement);

    const firstname = formData.get('firstname');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const date = new Date(formData.get('date'));
    const guests = formData.get('guests');

    const emailRegex = /^[a-zA-Z0-9.-_+%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
    const phoneRegex = /^\+33[6,7][0-9]{8}$/gm;

    if (firstname.length < 2) {
        isValid = false;
        document.getElementById('firstname-error').innerText = "Veuillez entrer plus de 2 charactères."
    }

    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById('email-error').innerText = "Email incorrect."
    }

    if (!phoneRegex.test(phone)) {
        isValid = false;
        document.getElementById('phone-error').innerText = "Numéro de mobile incorrect."
    }

    if (date < today || date > dateInThreeMonths) {
        isValid = false;
        document.getElementById('date-error').innerText = "La date de réservation doit être entre aujourd'hui et dans 3 mois."
    }

    if (guests < 1 || guests > 10 ) {
        isValid = false;
        document.getElementById('guests-error').innerText = "Vous devez être entre 1 et 10 personnes."
    }

    return isValid;
}

export function renderModal() {
    const modalElement = document.createElement('div')
    modalElement.setAttribute('class', 'modal');
    modalElement.setAttribute('id', 'booking-modal');

    const modalContainerElement = document.createElement('div')
    modalContainerElement.setAttribute('class', 'modal-container');
    modalContainerElement.setAttribute('id', 'booking-modal-content');

    const modalFormElement = document.createElement('form')
    modalFormElement.setAttribute('id', 'booking-form');
    modalFormElement.setAttribute('method', 'get');
    modalFormElement.setAttribute('action', '/resto1.html');
    modalFormElement.setAttribute('novalidate', 'true');


    modalFormElement.innerHTML = `
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
    `;

    modalContainerElement.append(modalFormElement);
    modalElement.append(modalContainerElement);

    modalFormElement.addEventListener('submit', event => {
        event.preventDefault();
        modalFormElement.querySelectorAll('.error').forEach(element => element.innerHTML = "");
        validateFormInputs(modalFormElement);

        // Si tout est bon, on envoie le formulaire
        if (validateFormInputs(modalFormElement)) {
            console.log('Le formulaire est envoyé !');
        }
    });

    return modalElement;
}

export function openBookingModal() {
    const bookingModalElement = document.getElementById('booking-modal');
    bookingModalElement.style.display = 'grid';
}

export function closeBookingModal() {
    const bookingModalElement = document.getElementById('booking-modal');
    bookingModalElement.style.display = 'none';
}
