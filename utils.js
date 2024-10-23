// utils.js

// Utility function to save user preferences
function saveUserPreferences(userId, preferences) {
    return db.collection('users').doc(userId).set(preferences, { merge: true });
}

// Utility function to get user preferences
function getUserPreferences(userId) {
    return db.collection('users').doc(userId).get();
}

// Export the functions if using modules (Optional)
// Uncomment the following lines if you're using ES6 modules
// export { saveUserPreferences, getUserPreferences };
