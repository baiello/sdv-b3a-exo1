import { createRestaurant } from "../scripts/factories/restaurantFactory";

const restaurantData = {
    id: 123,
    new: true,
    name: 'Chez Dédé',
    location: 'Chantepie',
    pictureUrl: 'https://uniiti.com/images/shops/logos/888a2f86efe8a57dc68abdb44e4468f3a027d639.png',
    menu: {},
}

describe('When I create a restaurant from the factory', () => {
    test('Then I get a valid restaurant object', () => {
        const restaurant = createRestaurant(restaurantData);
        expect(restaurant.renderCard).toBeTruthy();
        expect(restaurant.renderMenu).toBeTruthy();
    });
});
