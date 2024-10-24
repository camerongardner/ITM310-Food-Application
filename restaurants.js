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
    {
        "name": "Sunset Sushi",
        "cuisine": "Japanese",
        "priceRange": "$$",
        "distance": "3 miles away",
        "rating": 4.6,
        "status": "Open",
        "img": "images/michael-discenza-5C_G-aIylp8-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free"],
        "spiceLevel": 1,
        "services": ["Dine-In", "Takeout", "Delivery"]
    },
    {
        "name": "Fiery Taco",
        "cuisine": "Mexican",
        "priceRange": "$$",
        "distance": "4 miles away",
        "rating": 4.8,
        "status": "Open",
        "img": "images/fahmi-fakhrudin-nzyzAUsbV0M-unsplash.jpg",
        "dietaryOptions": ["Vegetarian"],
        "spiceLevel": 4,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "The Pita Palace",
        "cuisine": "Mediterranean",
        "priceRange": "$$",
        "distance": "2.5 miles away",
        "rating": 4.4,
        "status": "Closed",
        "img": "images/nadya-spetnitskaya-QPRIsk8JnzE-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free"],
        "spiceLevel": 3,
        "services": ["Dine-In", "Delivery"]
    },
    {
        "name": "Dragon's Breath",
        "cuisine": "Chinese",
        "priceRange": "$$",
        "distance": "6 miles away",
        "rating": 4.9,
        "status": "Open",
        "img": "images/farhad-ibrahimzade-xRxDsRF-9a4-unsplash.jpg",
        "dietaryOptions": ["Vegetarian", "Nut-Free"],
        "spiceLevel": 5,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Green Leaf Cafe",
        "cuisine": "Vegan",
        "priceRange": "$$",
        "distance": "1.2 miles away",
        "rating": 4.7,
        "status": "Closed",
        "img": "images/heather-barnes-k9KQeJdL8bg-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free", "Nut-Free"],
        "spiceLevel": 2,
        "services": ["Takeout", "Delivery"]
    },
    {
        "name": "Saffron Delight",
        "cuisine": "Indian",
        "priceRange": "$$$",
        "distance": "5 miles away",
        "rating": 4.8,
        "status": "Open",
        "img": "images/nishaan-ahmed-aQXEKqRRo1o-unsplash.jpg",
        "dietaryOptions": ["Vegetarian"],
        "spiceLevel": 5,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Mama's Kitchen",
        "cuisine": "Italian",
        "priceRange": "$$",
        "distance": "3 miles away",
        "rating": 4.5,
        "status": "Open",
        "img": "images/zakaria-ahada-AvSFPw5Tp68-unsplash.jpg",
        "dietaryOptions": ["Vegetarian"],
        "spiceLevel": 1,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Golden Curry House",
        "cuisine": "Thai",
        "priceRange": "$$",
        "distance": "2.5 miles away",
        "rating": 4.9,
        "status": "Open",
        "img": "images/jarett-lopez-9QTQFihyles-unsplash.jpg",
        "dietaryOptions": ["Vegetarian", "Gluten-Free"],
        "spiceLevel": 5,
        "services": ["Dine-In", "Takeout", "Delivery"]
    },
    {
        "name": "Burger Haven",
        "cuisine": "American",
        "priceRange": "$$",
        "distance": "1.8 miles away",
        "rating": 4.3,
        "status": "Closed",
        "img": "images/brian-chan-6l0OqHA8V6U-unsplash.jpg",
        "dietaryOptions": ["Vegetarian"],
        "spiceLevel": 2,
        "services": ["Takeout", "Delivery"]
    },
    {
        "name": "Coconut Grove",
        "cuisine": "Caribbean",
        "priceRange": "$$$",
        "distance": "4.5 miles away",
        "rating": 4.6,
        "status": "Open",
        "img": "images/louis-hansel-shotsoflouis-xf7CFzY7BXM-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free", "Dairy-Free"],
        "spiceLevel": 4,
        "services": ["Dine-In", "Takeout", "Delivery"]
    },
    {
        "name": "Basil & Thyme",
        "cuisine": "Italian",
        "priceRange": "$$$",
        "distance": "2.2 miles away",
        "rating": 4.8,
        "status": "Open",
        "img": "images/jason-leung-tCrDKr6SjYY-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free"],
        "spiceLevel": 1,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Phở Paradise",
        "cuisine": "Vietnamese",
        "priceRange": "$$",
        "distance": "3.3 miles away",
        "rating": 4.7,
        "status": "Open",
        "img": "images/joseph-gonzalez-eQ7iWo-u7xI-unsplash.jpg",
        "dietaryOptions": ["Vegetarian", "Nut-Free"],
        "spiceLevel": 3,
        "services": ["Dine-In", "Delivery"]
    },
    {
        "name": "Tandoori Nights",
        "cuisine": "Indian",
        "priceRange": "$$$",
        "distance": "5 miles away",
        "rating": 4.9,
        "status": "Open",
        "img": "images/mgg-vitchakorn-LA6eff6ofI0-unsplash.jpg",
        "dietaryOptions": ["Vegetarian", "Dairy-Free"],
        "spiceLevel": 5,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Hummus & Co.",
        "cuisine": "Mediterranean",
        "priceRange": "$$",
        "distance": "2 miles away",
        "rating": 4.5,
        "status": "Closed",
        "img": "images/sylvain-brison-vJ3yo61oa3E-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free"],
        "spiceLevel": 2,
        "services": ["Dine-In", "Takeout", "Delivery"]
    },
    {
        "name": "Sizzle Steakhouse",
        "cuisine": "American",
        "priceRange": "$$$",
        "distance": "6 miles away",
        "rating": 4.8,
        "status": "Open",
        "img": "images/emerson-vieira-aoQ4DYZLE_E-unsplash.jpg",
        "dietaryOptions": ["Vegetarian", "Dairy-Free"],
        "spiceLevel": 3,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Noodle Nirvana",
        "cuisine": "Asian Fusion",
        "priceRange": "$$",
        "distance": "3 miles away",
        "rating": 4.6,
        "status": "Open",
        "img": "images/mei-xing-pKkaHIm-oAE-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free"],
        "spiceLevel": 4,
        "services": ["Dine-In", "Delivery"]
    },
    {
        "name": "The Rustic Bowl",
        "cuisine": "American",
        "priceRange": "$$",
        "distance": "1 mile away",
        "rating": 4.4,
        "status": "Closed",
        "img": "images/louis-hansel-shotsoflouis-mA8TqxH_x54-unsplash.jpg",
        "dietaryOptions": ["Vegetarian", "Nut-Free"],
        "spiceLevel": 2,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Spice & Rice",
        "cuisine": "Thai",
        "priceRange": "$$",
        "distance": "4 miles away",
        "rating": 4.7,
        "status": "Open",
        "img": "images/benjamin-sow-CtF-bSG5OEI-unsplash.jpg",
        "dietaryOptions": ["Vegetarian"],
        "spiceLevel": 5,
        "services": ["Dine-In", "Takeout"]
    },
    {
        "name": "Golden Lotus",
        "cuisine": "Chinese",
        "priceRange": "$$",
        "distance": "3.5 miles away",
        "rating": 4.5,
        "status": "Open",
        "img": "images/chad-montano-MqT0asuoIcU-unsplash.jpg",
        "dietaryOptions": ["Vegan", "Gluten-Free"],
        "spiceLevel": 3,
        "services": ["Dine-In", "Delivery"]
    },
    {
        "name": "Café de Paris",
        "cuisine": "French",
        "priceRange": "$$$",
        "distance": "1.5 miles away",
        "rating": 4.8,
        "status": "Closed",
        "img": "images/cory-schadt-uA8wcsl-YJM-unsplash.jpg",
        "dietaryOptions": ["Vegetarian"],
        "spiceLevel": 1,
        "services": ["Dine-In", "Takeout"]
    },
    
    // Add more restaurant objects as needed
];
