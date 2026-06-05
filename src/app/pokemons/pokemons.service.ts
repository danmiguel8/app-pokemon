import { Injectable } from "@angular/core";
import { Pokemon } from "./donnees/pokemon";
import { POKEMONS } from "./donnees/mock-pokemons";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap, Observable, of, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient){}

  private pokemonUrl = 'api/pokemons';

  //Permet de regarder le flux de donnée en continu
  private log(log: string){
    console.info(log);
  }

  // permet de gérer proprement les erreurs des appels http sans faire planter l'application
  private handleError<T>(operation='operation', result?: T){
    return(error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  //Permet de récupérer tout les pokémons
  getPokemons(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
      tap(_ => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`, []))
    );
  }

  getPokemonsFavoris(): Observable<Pokemon[]> {
    const url = `${this.pokemonUrl}?isFavorite=true`;

    return this.http.get<Pokemon[]>(url).pipe(
      tap(_ => this.log(`fetched pokemon isFavorite=true`)),
      catchError(this.handleError<Pokemon[]>(`getPokemonsFavoris`))
    );
  }

  //Permet de récupérer un pokémon
  getPokemon(id: number): Observable<Pokemon>{
    const url = `${this.pokemonUrl}/${id}`;

    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  getPokemonTypes(): string[]{
    return ['Plante', 'Feu', 'Eau', 'Poison', 'Psy', 'Electrik', 'Normal', 'Fée', 'Vol', 'Insecte'];
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon>{

    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    }
    const url = `${this.pokemonUrl}/${pokemon.id}`;

    return this.http.put<Pokemon>(url, pokemon, httpOptions).pipe(
      tap(_ => this.log(`update pokemon id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>(`updatePokemon id=${pokemon.id}`))
    )

  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{

    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    }
    const url = `${this.pokemonUrl}`;

    return this.http.post<Pokemon>(url, pokemon, httpOptions).pipe(
      tap(_ => this.log(`add pokemon`)),
      catchError(this.handleError<Pokemon>(`addPokemon`))
    )

  }

  deletePokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    }
    const url = `${this.pokemonUrl}/${pokemon.id}`;

    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.log(`delete pokemon id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>(`deletePokemon id=${pokemon.id}`))
    )

  }

searchPokemons(term: string, param: string = "name"): Observable<Pokemon[]> {
  if (!term.trim()) return of([]);

  return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
    map((pokemons: any[]) => pokemons.filter(p => {
      const value = (p as any)[param];
      if (typeof value === 'string') {
        return value.toLowerCase() === term.toLowerCase();
      }
      if (Array.isArray(value)) {
        return value.some(v => v.toLowerCase().includes(term.toLowerCase()));
      }
      return false;
    })),
    catchError(this.handleError<Pokemon[]>('searchPokemons', []))
  );
}

  addPokemonToFavoris(pokemon: Pokemon) {
    pokemon.isFavorite = true;
    return this.updatePokemon(pokemon);
  }

  removePokemonToFavoris(pokemon: Pokemon) {
    pokemon.isFavorite = false;
    return this.updatePokemon(pokemon);
  }


}
