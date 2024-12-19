function processFile(inputId, category) {
    const fileInput = document.getElementById(inputId);
    const files = fileInput.files;

    if (files.length > 0) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result.split('\n').slice(1); // Ignore first line
            
            const processedData = content.map(line => {
                // Extract name and set
                const match = line.match(/^(\d+)\s([A-Za-z\s\-]+)\s?\-?\s?(\d{3,})?\s?\[(.*?)\]/);
                if (match) {
                    const name = match[2].trim();
                    const set = match[4].trim();
                    const number = match[3] ? match[3] : null;

                    // Adjust set name using external database (will handle later)
                    const adjustedSet = adjustSetName(set);

                    return { name, set: adjustedSet, number, category };
                }
                return null;
            }).filter(data => data !== null);

            // Display the processed data (you can modify this display function later)
            displayProcessedData(processedData);
        };

        reader.readAsText(files[0]);
    }
}

// Adjust the set name using the external database (implement later)
function adjustSetName(set) {
    // Placeholder function to process set names, replace with actual database call
    return set;  // Temporarily returns the same set name
}

function displayProcessedData(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';  // Clear previous output

    data.forEach(item => {
        const cardDiv = document.createElement('div');
        cardDiv.textContent = `${item.name} - ${item.set}${item.number ? ` - ${item.number}` : ''}`;
        if (item.category === 'Holo') {
            cardDiv.style.fontWeight = 'bold'; // Mark Holos with bold text
            cardDiv.style.color = 'gold';      // Could use a shiny color or symbol for Holos
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
