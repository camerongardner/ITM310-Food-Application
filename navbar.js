// navbar.js

// Firebase configuration
// Ensure this matches your existing Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwaBdzp7urh_mWA9PTFrK0_Kb20e9DBi0",
    authDomain: "user-database-a77c4.firebaseapp.com",
    projectId: "user-database-a77c4",
    storageBucket: "user-database-a77c4.appspot.com",
    messagingSenderId: "128334599354",
    appId: "1:128334599354:web:42bb2024c0df113ba25e83"
  };
  
  // Initialize Firebase if it hasn't been initialized yet
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // Use existing app
  }
  
  // Get Firebase Auth instance
  const auth = firebase.auth();
  
  // Function to update the navigation menu based on user authentication state
  function updateNavMenu(user) {
    const navMenu = document.getElementById('nav-menu');
    
    if (!navMenu) {
      console.warn('Nav menu element with ID "nav-menu" not found.');
      return;
    }
  
    // Clear existing menu items
    navMenu.innerHTML = '';
  
    if (user) {
      // User is signed in
      navMenu.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="restaurants.html">Restaurants</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="preferences.html">Preferences</a></li>
        <li><a href="#" id="sign-out">Sign Out</a></li>
      `;
  
      // Add event listener for "Sign Out"
      const signOutLink = document.getElementById('sign-out');
      if (signOutLink) {
        signOutLink.addEventListener('click', (e) => {
          e.preventDefault();
          auth.signOut()
            .then(() => {
              console.log('User signed out successfully.');
              // Optionally, redirect to home or login page
              // window.location.href = 'index.html';
            })
            .catch((error) => {
              console.error('Error signing out:', error);
              alert('Error signing out. Please try again.');
            });
        });
      }
    } else {
      // No user is signed in
      navMenu.innerHTML = `
        <li><a href="index.html">Home</a></li>
        <li><a href="restaurants.html">Restaurants</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="login.html">Sign In</a></li>
        <li><a href="signup.html">Sign Up</a></li>
      `;
    }
  }
  
  // Listen for authentication state changes
  auth.onAuthStateChanged((user) => {
    updateNavMenu(user);
  });
  