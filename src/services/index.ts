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