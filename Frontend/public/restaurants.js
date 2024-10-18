// Restaurant search functionality
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the page from reloading
    const query = e.target.querySelector('input').value.toLowerCase();
    filterRestaurants(query);
});

function filterRestaurants(query) {
    const restaurants = document.querySelectorAll('.restaurant');

    restaurants.forEach((restaurant) => {
        const name = restaurant.querySelector('h3').textContent.toLowerCase();
        const cuisine = restaurant.getAttribute('data-cuisine');

        // If the query matches either the name or the cuisine
        if (name.includes(query) || cuisine.includes(query)) {
            restaurant.style.display = '';
        } else {
            restaurant.style.display = 'none';
        }
    });
}

// Filter functionality
document.getElementById('filter-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Get selected filter values
    const cuisine = document.querySelector('select[name="cuisine"]').value.toLowerCase();
    const price = document.querySelector('select[name="price"]').value;
    const distance = document.querySelector('select[name="distance"]').value;

    // Convert distance to a number (or Infinity if not specified)
    const maxDistance = distance === "" ? Infinity : parseFloat(distance);

    // Get all restaurant divs
    const restaurants = document.querySelectorAll('.restaurant');

    // Loop through each restaurant and check if it matches the filter
    restaurants.forEach(restaurant => {
        const restaurantCuisine = restaurant.getAttribute('data-cuisine');
        const restaurantPrice = restaurant.getAttribute('data-price');
        const restaurantDistance = parseFloat(restaurant.getAttribute('data-distance'));

        // Check if the restaurant matches the selected filters
        const matchesCuisine = cuisine === "" || restaurantCuisine === cuisine;
        const matchesPrice = price === "" || restaurantPrice === price;
        const matchesDistance = isNaN(restaurantDistance) || restaurantDistance <= maxDistance;

        if (matchesCuisine && matchesPrice && matchesDistance) {
            restaurant.style.display = ""; // Show the restaurant
        } else {
            restaurant.style.display = "none"; // Hide the restaurant
        }
    });
});


const restaurants = [
    {
        img: 'restaurant1.jpg',
        name: 'Restaurant Name 1',
        cuisine: 'italian', // Use lowercase
        priceRange: '$$',
        distance: '0.5 miles away',
        rating: '4.5/5',
        status: 'Open Now'
    },
    {
        img: 'restaurant2.jpg',
        name: 'Restaurant Name 2',
        cuisine: 'chinese',
        priceRange: '$',
        distance: '1.0 miles away',
        rating: '4.2/5',
        status: 'Open Now'
    },
    // Add more restaurants as needed
];
