import { defineStore } from "pinia"

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    prevLink: '',
    nextLink: '',
    currentPage: '',
    limit: 151,
    perPage: 25,
    listPokemon: [],
  }),
  getters: {
    getPokemons: (state) => state.listPokemon,
  },
  actions: {
    setListPokemon(listPokemon: any) {
      this.listPokemon = listPokemon;
    }
  },
})