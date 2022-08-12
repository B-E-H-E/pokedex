const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonType = document.querySelector('.pokemon_type');
const pokemonType1 = document.querySelector('.type1');
const pokemonType2 = document.querySelector('.type2');
//const pokemonTypeColor = document.getElementsByClassName('type__Color');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

//get data from API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);    
    if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
    }
}

//show it to user
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);    
   
    if (data) {
        input.value='';
        searchPokemon = data.id;        
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.style.display = 'block';    
        pokemonType1.innerHTML = data['types']['0']['type']['name'];        

            // define and show the number of types
            if (!(data['types']['1'])) {    
                pokemonType2.style.display = 'none';            
            } else {            
                pokemonType2.style.display = 'flex';            
                pokemonType2.innerHTML = data['types']['1']['type']['name'];
            };

            //show sprite
            if (data.id >= 100) {
                pokemonImage.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data.id}.png`;
            } else if (data.id < 100 && data.id >= 10) {
                pokemonImage.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${data.id}.png`; 
            } else if (data.id < 10) {
                pokemonImage.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${data.id}.png`;
            };  
    } else {
    pokemonImage.style.display = 'none';
    pokemonType.style.display = 'none';    
    pokemonNumber.innerHTML = '???'
    pokemonName.innerHTML = 'Not found.<br>Could be added in the next Gen tho...'
    };
};

//search field
form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    renderPokemon(input.value.toLowerCase());
});

//buttons
buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1) {
    pokemonImage.style.display ='none';
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', (event) => {
    pokemonImage.style.display ='none';
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);