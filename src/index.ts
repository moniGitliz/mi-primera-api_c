// import { startServer } from "./api";

import { PollingWatchKind } from "typescript";

// startServer();

// Promesas
const getPockemonById = (id: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((pokemon: any) => pokemon.name);
};

// let miPokemon = getPockemonById(1);
// console.log({ miPokemon });

getPockemonById(1)
  .then((nombre) => console.log("El Pokémon es:", nombre))
  .catch((error) => console.error("Error al obtener el Pokémon:", error));

//  async - await

const getPockemonById2 = async (id: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const respuesta = await fetch(url);
  const pokemon = (await respuesta.json()) as { name: string };
  return pokemon.name;
};

getPockemonById2(2).then((pockemonName) => {
  console.log({ pockemonName });
});
