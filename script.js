document.getElementById('file-input').addEventListener('change', function (event) {
  const file = event.target.files[0];

  if (file && file.type === "text/plain") {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      displayPokemon(fileContent);
    };

    reader.readAsText(file);
  } else {
    alert("Please upload a valid .txt file.");
  }
});

function displayPokemon(content) {
  const setsContainer = document.getElementById('sets-container');
  setsContainer.innerHTML = '';  // Clear previous content

  const pokemonSets = content.split('\n');
  pokemonSets.forEach((set, index) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon-set');
    pokemonDiv.innerHTML = `<span>Set ${index + 1}:</span> ${set}`;
    setsContainer.appendChild(pokemonDiv);
  });
}

