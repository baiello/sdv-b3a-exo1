import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/global.css';
import '../styles/page-home.css';

import { createRestaurant } from "./factories/restaurantFactory.js";

const restaurantsJsonUrl = 'https://gist.githubusercontent.com/baiello/a42c640d3bd6a52d965b29e3e0de6db7/raw/01f153c8c1099605476721b5326df0d533b283c7/restaurants.json';

const restaurantsListElement = document.getElementById('restaurants-container');

const restoFetchedEvent = new Event('restaurants-fetched');

let restaurants = [];

function displayRestaurantsCards() {
    const restaurantsLength = restaurants.length;
    if (restaurantsLength > 0) {
        for (let i=0; i < restaurantsLength; i++) {
            const restaurant = createRestaurant(restaurants[i]);
            restaurantsListElement.append(restaurant.renderCard());
        }
    }
}

fetch(restaurantsJsonUrl)
    .then(response => response.json())
    .then(restaurantsData => {
        restaurants = restaurantsData;
        document.dispatchEvent(restoFetchedEvent);
    });

document.addEventListener('restaurants-fetched', () => {
    displayRestaurantsCards();
});
