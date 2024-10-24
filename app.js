// app.js

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
window.db = firebase.firestore(); // Make Firestore accessible globally
var db = firebase.firestore(); // Initialize Firestore

// DOM Elements
const authContainer = document.getElementById('auth-container');
const signUpContainer = document.getElementById('sign-up-container');
const navMenu = document.getElementById('nav-menu');

// Toggle between sign-in and sign-up forms
document.getElementById('show-sign-up').addEventListener('click', (e) => {
  e.preventDefault();
  authContainer.style.display = 'none';
  signUpContainer.style.display = 'block';
});

document.getElementById('show-sign-in').addEventListener('click', (e) => {
  e.preventDefault();
  signUpContainer.style.display = 'none';
  authContainer.style.display = 'block';
});

// Sign In
document.getElementById('sign-in-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('sign-in-email').value;
  const password = document.getElementById('sign-in-password').value;

  auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed in
          console.log('Signed In:', userCredential.user);
          // Hide auth forms
          authContainer.style.display = 'none';
          // Update navigation menu
          updateNavMenu(userCredential.user);
      })
      .catch((error) => {
          console.error('Error Signing In:', error.message);
          alert(error.message);
      });
});

// Sign Up
document.getElementById('sign-up-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('sign-up-email').value;
  const password = document.getElementById('sign-up-password').value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed up
          console.log('Account Created:', userCredential.user);
          // Hide auth forms
          signUpContainer.style.display = 'none';
          // Update navigation menu
          updateNavMenu(userCredential.user);
      })
      .catch((error) => {
          console.error('Error Signing Up:', error.message);
          alert(error.message);
      });
});

// Update navigation menu based on authentication state
function updateNavMenu(user) {
  navMenu.innerHTML = ''; // Clear existing menu items

  if (user) {
      // User is signed in
      navMenu.innerHTML = `
          <li><a href="#">Home</a></li>
          <li><a href="#">Restaurants</a></li>
          <li><a href="#">Reviews</a></li>
          <li><a href="preferences.html">Preferences</a></li> <!-- Preferences Menu Item -->
          <li><a href="#" id="sign-out">Sign Out</a></li>
      `;

      document.getElementById('sign-out').addEventListener('click', (e) => {
          e.preventDefault();
          auth.signOut().then(() => {
              console.log('User signed out.');
              // Reset navigation menu
              updateNavMenu(null);
              // Show auth forms
              authContainer.style.display = 'block';
          });
      });
  } else {
      // No user is signed in
      navMenu.innerHTML = `
          <li><a href="#">Home</a></li>
          <li><a href="#">Restaurants</a></li>
          <li><a href="#">Reviews</a></li>
          <li><a href="#" id="show-sign-in">Sign In</a></li>
      `;

      // Attach event listener to "Sign In" link
      document.getElementById('show-sign-in').addEventListener('click', (e) => {
          e.preventDefault();
          signUpContainer.style.display = 'none';
          authContainer.style.display = 'block';
      });
  }
}

// Listen for authentication state changes
auth.onAuthStateChanged(async (user) => {
    if (user) {
        try {
            const doc = await getUserPreferences(user.uid);
            if (doc.exists) {
                const preferences = doc.data();
                console.log('User Preferences:', preferences);
                // ... rest of the code ...
            } else {
                console.log('No preferences found for user:', user.uid);
                displayAllRestaurants();
            }
        } catch (error) {
            console.error('Error fetching preferences:', error);
            displayAllRestaurants();
        }
    } else {
        console.log('No user is signed in. Displaying all restaurants.');
        displayAllRestaurants();
    }
});

// Restaurants list code
// Assuming 'restaurants' array is defined in restaurants.js

const restaurantList = document.getElementById('restaurant-list');

restaurants.forEach(restaurant => {
  const restaurantDiv = document.createElement('div');
  restaurantDiv.classList.add('restaurant');

  // Set data attributes
  restaurantDiv.setAttribute('data-cuisine', restaurant.cuisine.toLowerCase());
  restaurantDiv.setAttribute('data-price', restaurant.priceRange);

  // Extract numeric value from distance string (e.g., '0.5 miles away' -> 0.5)
  const distanceMatch = restaurant.distance.match(/[\d\.]+/);
  const distanceValue = distanceMatch ? parseFloat(distanceMatch[0]) : Infinity;
  restaurantDiv.setAttribute('data-distance', distanceValue);

  restaurantDiv.innerHTML = `
      <img src="${restaurant.img}" alt="Restaurant Image">
      <div class="info">
          <h3>${restaurant.name}</h3>
          <p>${restaurant.cuisine} | ${restaurant.priceRange} | ${restaurant.distance}</p>
          <p>Rating: ${restaurant.rating}</p>
          <p>${restaurant.status}</p>
          <div class="actions">
              <button>View Menu</button>
              <button>Reserve Table</button>
          </div>
      </div>
  `;

  restaurantList.appendChild(restaurantDiv);
});

// Assist with AI

// Function to display restaurants based on an array of restaurant names
function displayRestaurants(recommendedRestaurants) {
    restaurantList.innerHTML = ''; // Clear existing restaurants
  
    recommendedRestaurants.forEach(restaurantName => {
      // Normalize the names for comparison
      const normalizedRestaurantName = restaurantName.toLowerCase().trim();
  
      const restaurant = restaurants.find(r => r.name.toLowerCase().trim() === normalizedRestaurantName);
  
      if (restaurant) {
        const restaurantDiv = createRestaurantDiv(restaurant);
        restaurantList.appendChild(restaurantDiv);
      } else {
        console.warn(`Restaurant "${restaurantName}" not found in the restaurants array.`);
      }
    });
  }

// Helper function to create a restaurant div
function createRestaurantDiv(restaurant) {
    const restaurantDiv = document.createElement('div');
    restaurantDiv.classList.add('restaurant');

    // Set data attributes for filtering/search
    restaurantDiv.setAttribute('data-cuisine', restaurant.cuisine.toLowerCase());
    restaurantDiv.setAttribute('data-price', restaurant.priceRange);
    restaurantDiv.setAttribute('data-distance', parseFloat(restaurant.distance));

    restaurantDiv.innerHTML = `
        <img src="${restaurant.img}" alt="Restaurant Image">
        <div class="info">
            <h3>${restaurant.name}</h3>
            <p>${restaurant.cuisine} | ${restaurant.priceRange} | ${restaurant.distance}</p>
            <p>Rating: ${restaurant.rating}</p>
            <p>${restaurant.status}</p>
            <div class="actions">
                <button>View Menu</button>
                <button>Reserve Table</button>
            </div>
        </div>
    `;

    return restaurantDiv;
}

function displayAllRestaurants() {
    const allRestaurantNames = restaurants.map(r => r.name);
    displayRestaurants(allRestaurantNames);
}


// AI integration

// On page load or when the user navigates to the restaurant list
window.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.getElementById('restaurant-list');

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const doc = await getUserPreferences(user.uid);
                if (doc.exists) {
                    const preferences = doc.data();
                    const prompt = prepareAIInput(preferences, restaurants);

                    try {
                        const responseText = await getPersonalizedRecommendations(prompt);
                        const recommendedRestaurants = parseAIResponse(responseText);
                        displayRestaurants(recommendedRestaurants);
                    } catch (error) {
                        console.error('Error getting recommendations:', error);
                        // Fallback to displaying all restaurants
                        displayAllRestaurants();
                    }
                } else {
                    console.log('No preferences found. Displaying all restaurants.');
                    displayAllRestaurants();
                }
            } catch (error) {
                console.error('Error fetching preferences:', error);
                displayAllRestaurants();
            }
        } else {
            console.log('No user is signed in. Displaying all restaurants.');
            displayAllRestaurants();
        }
    });
});