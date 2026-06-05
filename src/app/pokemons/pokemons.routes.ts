import { Routes } from "@angular/router";
import { PokemonsComponent } from './list/pokemons.component';
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";
import { DetailComponent } from "./detail/detail.component";
import { AddPokemonComponent } from "./add-pokemon/add-pokemon.component";
import { FavorisPokemonComponent } from "./favoris-pokemon/favoris-pokemon.component";

export const pokemonsRoutes: Routes = [
  { path: 'all', loadComponent:() => PokemonsComponent },
  { path: 'create', loadComponent:() => AddPokemonComponent },
  { path: 'favoris', loadComponent:() => FavorisPokemonComponent },
  { path: 'edit/:id', loadComponent:() => EditPokemonComponent },
  { path: ':id', loadComponent:() => DetailComponent },
]
