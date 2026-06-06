import { Injectable } from "@angular/core";
import { Pokemon } from "./donnees/pokemon";
import { catchError, Observable, of, from, map } from "rxjs";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from "../../environnements/environnement";
import { getNextEvolution } from "./donnees/evolutions.config";


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getPokemons(): Observable<Pokemon[]> {
    return from(
      this.supabase.from('pokemons').select('*').order('id')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        this.log('fetched pokemons');
        return data as Pokemon[];
      }),
      catchError(this.handleError('getPokemons', []))
    );
  }

  getPokemonsFavoris(): Observable<Pokemon[]> {
    return from(
      this.supabase.from('pokemons').select('*').eq('isFavorite', true)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        this.log('fetched pokemon isFavorite=true');
        return data as Pokemon[];
      }),
      catchError(this.handleError<Pokemon[]>('getPokemonsFavoris', []))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    return from(
      this.supabase.from('pokemons').select('*').eq('id', id).single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        this.log(`fetched pokemon id=${id}`);
        return data as Pokemon;
      }),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  getPokemonTypes(): string[] {
    return ['Plante', 'Feu', 'Eau', 'Poison', 'Psy', 'Electrik', 'Normal', 'Fée', 'Vol', 'Insecte'];
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return from(
      this.supabase.from('pokemons').update(pokemon).eq('id', pokemon.id).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        this.log(`update pokemon id=${pokemon.id}`);
        return data as Pokemon;
      }),
      catchError(this.handleError<Pokemon>(`updatePokemon id=${pokemon.id}`))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    pokemon.created = new Date();
    const { id, ...pokemonSansId } = pokemon;
    return from(
      this.supabase.from('pokemons').insert(pokemonSansId).select().single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        this.log('add pokemon');
        return data as Pokemon;
      }),
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  deletePokemon(pokemon: Pokemon): Observable<any> {
    return from(
      this.supabase.from('pokemons').delete().eq('id', pokemon.id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
        this.log(`delete pokemon id=${pokemon.id}`);
      }),
      catchError(this.handleError(`deletePokemon id=${pokemon.id}`))
    );
  }

  searchPokemons(term: string, param: string = 'name'): Observable<Pokemon[]> {
    if (!term.trim()) return of([]);

    let query;

    if (param === 'types') {
      query = this.supabase.from('pokemons').select('*').or(`types.cs.{"${term}"},types.cs.{"${term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()}"}`)
    }
    else if (param === 'rarete') {
      query = this.supabase.from('pokemons').select('*').eq('rarete', term);
    }
    else {
      query = this.supabase.from('pokemons').select('*').ilike(param, `%${term}%`);
    }

    return from(query).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Pokemon[];
      }),
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  }

  addPokemonToFavoris(pokemon: Pokemon): Observable<Pokemon> {
    pokemon.isFavorite = true;
    return this.updatePokemon(pokemon);
  }

  removePokemonToFavoris(pokemon: Pokemon): Observable<Pokemon> {
    pokemon.isFavorite = false;
    return this.updatePokemon(pokemon);
  }

  getXpRequired(level: number): number {
  return level * 100;
}

trainPokemon(pokemon: Pokemon): Observable<Pokemon> {
  let { xp, level, hp, cp } = pokemon;
  xp += 50;

  if (xp >= this.getXpRequired(level)) {
    xp = xp - this.getXpRequired(level);
    level += 1;
    hp += 10;
    cp += 5;
  }

  const updated = { ...pokemon, xp, level, hp, cp };

  return from(
    this.supabase
      .from('pokemons')
      .update({ xp, level, hp, cp })
      .eq('id', pokemon.id)
      .select()
      .single()
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data as Pokemon;
    })
  );
}

evolvePokemon(pokemon: Pokemon, allPokemons: Pokemon[]): Observable<Pokemon> | null {
  const nextName = getNextEvolution(pokemon.name);
  if (!nextName) return null;

  const urlParts = pokemon.picture.split('/');
  const fileName = urlParts[urlParts.length - 1];
  const currentNum = parseInt(fileName.split('.')[0], 10);
  const nextNum = currentNum + 1; // 2
  urlParts[urlParts.length - 1] = `${nextNum}.webp`;
  const nextPicture = urlParts.join('/');

  return from(
    this.supabase
      .from('pokemons')
      .update({ name: nextName, picture: nextPicture })
      .eq('id', pokemon.id)
      .select()
      .single()
  ).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data as Pokemon;
    })
  );
}
}
