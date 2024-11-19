import { createRestaurant } from "./factories/restaurantFactory.js";

const restaurantsJsonUrl = 'https://gist.githubusercontent.com/baiello/a42c640d3bd6a52d965b29e3e0de6db7/raw/01f153c8c1099605476721b5326df0d533b283c7/restaurants.json';

const searchParams = new URLSearchParams(window.location.search);
const id = parseInt(searchParams.get('id'));


const restoFetchedEvent = new Event('restaurant-fetched');

let restaurant = {};


function displayRestaurant() {
    document.querySelector('body').append(restaurant.renderMenu());
}


async function fetchRestaurantById(id) {
    const response = await fetch(restaurantsJsonUrl);
    const data = await response.json();
    if (data.length > 0) {
        restaurant = createRestaurant(data.find(item => item.id === id));
        document.dispatchEvent(restoFetchedEvent);
    }
}

fetchRestaurantById(id);

document.addEventListener('restaurant-fetched', () => {
    displayRestaurant();
});
