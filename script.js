function processCardData(cardLines) {
  const processedCards = [];

  cardLines.forEach(line => {
    // Step 1: Trim and split the line
    const parts = line.trim().split(' ');

    // Step 2: Ignore the first number (quantity) and join the rest
    const nameAndSetText = parts.slice(1).join(' ');  // Join everything after the quantity

    // Step 3: Extract the set (inside square brackets [])
    const setMatch = nameAndSetText.match(/\[([A-Za-z0-9\-]+)\]/);
    if (!setMatch) return;  // Skip if no set is found
    const set = setMatch[1];

    // Step 4: Remove the set from the name and clean up the remaining text
    let name = nameAndSetText.replace(setMatch[0], '').trim();

    // Step 5: Check if there is a number after the name (e.g., "182/197")
    const numberMatch = name.match(/(\d+\/\d+|\d+)/);  // Match a number or a range like 182/197
    const number = numberMatch ? numberMatch[0] : '';  // Extract the number if present

    // Step 6: Remove the number from the name if present
    if (number) {
      name = name.replace(number, '').trim();  // Remove the number from the name string
    }

    // Step 7: Add the processed data
    processedCards.push({ name, set, number });
  });

  return processedCards;
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJfVxYXdvCUEOFevfGz8BzT_MVTklatVU",
  authDomain: "whysoocean-71c75.firebaseapp.com",
  projectId: "whysoocean-71c75",
  storageBucket: "whysoocean-71c75.firebasestorage.app",
  messagingSenderId: "977702944697",
  appId: "1:977702944697:web:9b7fe9e25af31cc1a20068",
  measurementId: "G-F079RRJV2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);