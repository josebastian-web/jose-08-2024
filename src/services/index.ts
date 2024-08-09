import { BASE_URL } from "@/constants";
import { IResponse } from "@/interfaces/interfaces";
import axios, { AxiosRequestConfig } from "axios";

export function getListPokemon(
    url: string,
    config: AxiosRequestConfig
): IResponse | any {
  return axios.get(url, { ...config })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export function getPokemon(
    url: string,
): IResponse | any {
  return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export function getDescription(
    id: any,
): IResponse | any {
  return axios.get(`${BASE_URL.LIST_POKEMON}/pokemon-species/${id}`)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export function getEvolution(
    id: any,
): IResponse | any {
  return axios.get(`${BASE_URL.LIST_POKEMON}/evolution-chain/${id}`,)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}