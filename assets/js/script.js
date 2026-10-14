let datosPokemonGlobales = [];

async function cargarDatosAPI() {
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await respuesta.json();
        
        datosPokemonGlobales = data.results;
        
        renderizarPokemon(datosPokemonGlobales);
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        document.getElementById('contenedorResultados').innerHTML = `<p class="text-danger text-center">Error al cargar la API.</p>`;
    }
}

function renderizarPokemon(listaPokemon) {
    const contenedor = document.getElementById('contenedorResultados');
    contenedor.innerHTML = "";
    
    if (listaPokemon.length === 0) {
        contenedor.innerHTML = `<div class="col-12 text-center"><p>No se encontraron Pokémon con ese nombre.</p></div>`;
        return;
    }

    listaPokemon.forEach((pokemon, index) => {
        const partesUrl = pokemon.url.split('/');
        const idPokemon = partesUrl[partesUrl.length - 2];
        const urlImagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idPokemon}.png`;

        const tarjetaHTML = `
            <div class="col-md-6 col-lg-4 tarjeta-pokemon">
                <div class="card h-100 text-center border-warning shadow-sm">
                    <img src="${urlImagen}" class="card-img-top w-50 mx-auto mt-2" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title text-capitalize fw-bold">${pokemon.name}</h5>
                        <span class="badge bg-danger">Nº ${idPokemon}</span>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}


function filtrarDOM() {
    const textoBusqueda = document.getElementById('inputFiltro').value.toLowerCase();
    
    const listaFiltrada = datosPokemonGlobales.filter(pokemon => 
        pokemon.name.toLowerCase().includes(textoBusqueda)
    );
    
    renderizarPokemon(listaFiltrada);
}

cargarDatosAPI();