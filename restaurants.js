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
        name: "Green Garden",
        cuisine: "Vegan",
        priceRange: "$$",
        distance: "2 miles away",
        rating: 4.5,
        status: "Open",
        img: "images/clay-banks-hwLAI5lRhdM-unsplash.jpg",
        dietaryOptions: ["Vegan", "Gluten-Free"],
        spiceLevel: 2,
        services: ["Dine-In", "Takeout", "Delivery"]
    },
    {
        name: "Spice Symphony",
        cuisine: "Indian",
        priceRange: "$$$",
        distance: "5 miles away",
        rating: 4.7,
        status: "Open",
        img: "images/fakhrir-amrullah-6I7nZBtnzkA-unsplash.jpg",
        dietaryOptions: ["Vegetarian"],
        spiceLevel: 5,
        services: ["Dine-In", "Delivery"]
    },
    {
        name: "Bella Italia",
        cuisine: "Italian",
        priceRange: "$$",
        distance: "1 mile away",
        rating: 4.3,
        status: "Closed",
        img: "images/imen-chakir-0POulTFqgjc-unsplash.jpg",
        dietaryOptions: ["Vegetarian"],
        spiceLevel: 1,
        services: ["Dine-In", "Takeout"]
    },
    // Add more restaurant objects as needed
];
