const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrevious = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (ApiResponse.status == 200) {
    const data = await ApiResponse.json();
    return data;
  }

}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Carregando...';
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'Não encontrado :('
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  }

}



form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrevious.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }

});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);