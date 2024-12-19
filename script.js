function processFile(inputId, category) {
    const fileInput = document.getElementById(inputId);
    const files = fileInput.files;

    if (files.length > 0) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result.split('\n').slice(1); // Ignore the first line
            
            const processedData = content.map(line => {
                // Regex to match: Ignore the quantity, get the name, set, and number if present
                const match = line.match(/^(\d+)\s([A-Za-z\s\-]+)\s?\[([^\]]+)\](?:\s?(\d+\/\d+|\d+))?/);
                if (match) {
                    const name = match[2].trim();  // Extract the Pokémon name
                    const set = match[3].trim();   // Extract the set name inside the []
                    const number = match[4] ? match[4].trim() : null;  // Extract the number if present

                    // Adjust the set name using external database (implement later)
                    const adjustedSet = adjustSetName(set);

                    return { name, set: adjustedSet, number, category };
                }
                return null;
            }).filter(data => data !== null);

            // Display the processed data
            displayProcessedData(processedData);
        };

        reader.readAsText(files[0]);
    }
}

// Adjust the set name using an external database (implement later)
function adjustSetName(set) {
    // Placeholder function to process set names, replace with actual database call
    return set;  // Temporarily returns the same set name
}

function displayProcessedData(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';  // Clear previous output

    data.forEach(item => {
        const cardDiv = document.createElement('div');
        let displayText = `${item.name} - ${item.set}`;
        
        // Append the number after the set if it exists
        if (item.number) {
            displayText += ` ${item.number}`;
        }

        cardDiv.textContent = displayText;

        // Mark Holos with bold and gold color (could use other styling)
        if (item.category === 'Holo') {
            cardDiv.style.fontWeight = 'bold'; 
            cardDiv.style.color = 'gold'; 
        }

        outputDiv.appendChild(cardDiv);
    });
}

// Functions for each category
function processCommonFiles() {
    processFile('commonFileInput', 'Common');
}

function processTrainerFiles() {
    processFile('trainerFileInput', 'Trainer');
}

function processHoloFiles() {
    processFile('holoFileInput', 'Holo');
}
