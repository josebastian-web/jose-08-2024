import { IResultPokemon } from "@/interfaces/interfaces";
import { defineStore } from "pinia"

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    prevLink: '' as string,
    nextLink: '' as string,
    currentPage: '' as string,
    perPage: 25 as number,
    listPokemon: [] as IResultPokemon[],
    selectedPokemon: [] as IResultPokemon[],
  }),
  getters: {
    getPokemons: (state) => state.listPokemon,
    getSelectedPokemons: (state) => state.selectedPokemon,
  },
  actions: {
    setPrevLink(prevLink: string) {
      this.prevLink = prevLink;
    },
    setNextLink(nextLink: string) {
      this.nextLink = nextLink;
    },
    setListPokemon(listPokemon: IResultPokemon[]) {
      this.listPokemon = listPokemon;
    },
    setSelectedPokemon(listPokemon: IResultPokemon) {
      this.selectedPokemon.push(listPokemon);
    },
    deletePokemon (name: string) {
      let index = this.selectedPokemon.findIndex(item => item.name === name);
      this.selectedPokemon.splice(index, 1);
    }
  },
})