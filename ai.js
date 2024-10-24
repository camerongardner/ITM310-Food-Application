// ai.js

// Function to prepare data for the AI model
function prepareAIInput(preferences, restaurants) {
    const dietaryRestrictions = preferences.dietaryRestrictions.length > 0
        ? preferences.dietaryRestrictions.join(', ')
        : 'None';

    const spiceLevel = preferences.spiceLevel !== undefined
        ? preferences.spiceLevel
        : 'Not specified';

    const servicePreferences = preferences.servicePreferences.length > 0
        ? preferences.servicePreferences.join(', ')
        : 'None';
    const preferenceText = `User Preferences:
- Dietary Restrictions: ${dietaryRestrictions}
- Spice Level: ${spiceLevel}
- Service Preferences: ${servicePreferences}`;

    const restaurantListText = restaurants.map(r => `
Name: ${r.name}
Cuisine: ${r.cuisine}
Price Range: ${r.priceRange}
Distance: ${r.distance}
Rating: ${r.rating}
Dietary Options: ${r.dietaryOptions.join(', ')}
Spice Level: ${r.spiceLevel}
Services: ${r.services.join(', ')}
`).join('\n');

    const prompt = `
${preferenceText}

Available Restaurants:
${restaurantListText}

Based on the user preferences, recommend the top 5 restaurants by name. List each restaurant on a new line without numbers or additional text.
`;

    return prompt;
}

// Function to get personalized recommendations from the AI model
async function getPersonalizedRecommendations(prompt) {
    const url = 'http://192.168.4.145:8000/api/generate';
    console.log('Fetching from URL:', url);
    console.log('Prompt:', prompt);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ model: 'llama3.1:8b', prompt: prompt })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Read the response as a stream of text
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = '';
        let done = false;
        let fullResponse = '';

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            if (value) {
                const chunk = decoder.decode(value);
                result += chunk;

                // Process each line in the chunk
                const lines = result.split('\n');
                result = lines.pop(); // Keep the last partial line (if any) for the next chunk

                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const jsonLine = JSON.parse(line);
                            fullResponse += jsonLine.response;
                            if (jsonLine.done) {
                                // We can break out of the loop if the AI is done
                                done = true;
                                break;
                            }
                        } catch (e) {
                            console.error('Error parsing JSON line:', e);
                            continue; // Skip malformed lines
                        }
                    }
                }
            }
        }
        console.log('Prompt sent to AI:', prompt); // Log the prompt
        console.log('Full AI Response:', fullResponse);
        return fullResponse.trim();
    } catch (error) {
        console.error('Error fetching AI recommendations:', error);
        alert('An error occurred while fetching AI recommendations. Please try again later.');
        throw error;
    }
}

// Function to parse the AI response into a list of restaurant names
function parseAIResponse(responseText) {
    console.log('Response Text to Parse:', responseText);

    // Use a regular expression to match restaurant names
    const regex = /^\d*\.*\s*(.+)$/gm;
    let match;
    const recommendedRestaurants = [];

    while ((match = regex.exec(responseText)) !== null) {
        recommendedRestaurants.push(match[1].trim());
    }

    console.log('Parsed Restaurant Names:', recommendedRestaurants);
    return recommendedRestaurants;
}