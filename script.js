// Firebase Configuration and Initialization
const firebaseConfig = {
  apiKey: "AIzaSyCJfVxYXdvCUEOFevfGz8BzT_MVTklatVU",
  authDomain: "whysoocean-71c75.firebaseapp.com",
  projectId: "whysoocean-71c75",
  storageBucket: "whysoocean-71c75.firebasestorage.app",
  messagingSenderId: "977702944697",
  appId: "1:977702944697:web:9b7fe9e25af31cc1a20068",
  measurementId: "G-F079RRJV2D",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to parse and process the uploaded file
async function processFile(file) {
  const text = await file.text();
  const lines = text.split("\\n");
  lines.shift(); // Remove the first line

  const data = {};
  lines.forEach((line) => {
    const match = line.match(/\\d+\\s+(.*)\\s+\\[([^\\]]+)\\]/);
    if (match) {
      const [_, name, set] = match;
      const numberMatch = name.match(/(-?\\d+\\/\\d+|-?\\d+)$/);
      const number = numberMatch ? numberMatch[0] : null;
      const cleanName = number ? name.replace(number, "").trim() : name.trim();

      if (!data[set]) data[set] = [];
      if (!data[set].some((entry) => entry.name === cleanName && entry.number === number)) {
        data[set].push({ name: cleanName, number });
      }
    }
  });

  await saveToFirestore(data);
  displayData(data);
}

// Save processed data to Firestore
async function saveToFirestore(data) {
  for (const set in data) {
    const setDocRef = db.collection("pokemon_sets").doc(set);
    await setDocRef.set({ pokemons: data[set] });
  }
}

// Display data in dropdowns and tables
function displayData(data) {
  const container = document.getElementById("sets-container");
  container.innerHTML = "";

  for (const set in data) {
    const dropdown = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = set;
    dropdown.appendChild(summary);

    const table = document.createElement("table");
    table.innerHTML = `<tr><th>Name</th><th>Number</th></tr>`;

    data[set].forEach((pokemon) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${pokemon.name}</td><td>${pokemon.number || ""}</td>`;
      table.appendChild(row);
    });

    dropdown.appendChild(table);
    container.appendChild(dropdown);
  }
}

// File upload handler
document.getElementById("file-input").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    processFile(file);
  }
});
