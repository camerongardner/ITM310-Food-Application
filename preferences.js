// preferences.js

// Ensure that utils.js is loaded before preferences.js

const preferencesForm = document.getElementById('preferences-form');
const spiceLevelDisplay = document.getElementById('spice-level-display');

// Update spice level display as the slider moves
const spiceLevelSlider = preferencesForm.querySelector('input[name="spiceLevel"]');
spiceLevelSlider.addEventListener('input', (e) => {
    spiceLevelDisplay.textContent = e.target.value;
});

// Listen for form submission
preferencesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather form data
    const dietaryElements = preferencesForm.querySelectorAll('input[name="dietary"]:checked');
    const dietaryRestrictions = Array.from(dietaryElements).map(el => el.value);

    const spiceLevel = spiceLevelSlider.value;

    const serviceElements = preferencesForm.querySelectorAll('input[name="service"]:checked');
    const servicePreferences = Array.from(serviceElements).map(el => el.value);

    const user = auth.currentUser;
    if (user) {
        // Save preferences using utility function
        saveUserPreferences(user.uid, {
            dietaryRestrictions,
            spiceLevel,
            servicePreferences
        })
        .then(() => {
            alert('Preferences saved successfully!');
        })
        .catch((error) => {
            console.error('Error saving preferences:', error);
            alert('Failed to save preferences. Please try again.');
        });
    } else {
        alert('No authenticated user found.');
    }
});

// Load existing preferences when the page loads
window.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Get user preferences using utility function
            getUserPreferences(user.uid)
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        populateForm(data);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching preferences:', error);
                    alert('Failed to load preferences. Please try again.');
                });
        } else {
            alert('You must be signed in to access preferences.');
            window.location.href = 'index.html'; // Redirect to home or sign-in page
        }
    });
});

// Function to populate the form with existing preferences
function populateForm(data) {
    // Set dietary restrictions
    if (data.dietaryRestrictions) {
        data.dietaryRestrictions.forEach(restriction => {
            const checkbox = preferencesForm.querySelector(`input[name="dietary"][value="${restriction}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    // Set spice level
    if (data.spiceLevel !== undefined) {
        spiceLevelSlider.value = data.spiceLevel;
        spiceLevelDisplay.textContent = data.spiceLevel;
    }

    // Set service preferences
    if (data.servicePreferences) {
        data.servicePreferences.forEach(service => {
            const checkbox = preferencesForm.querySelector(`input[name="service"][value="${service}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }
}
