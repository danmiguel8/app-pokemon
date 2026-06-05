import { Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/list/pokemons.component';
import { IncrementComponent } from './increment/increment';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { pokemonsRoutes } from './pokemons/pokemons.routes';

export const routes: Routes = [
  {path:'', component: PokemonsComponent},
  { path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
  { path: 'pokemon', children: pokemonsRoutes },
  { path:'increment', component: IncrementComponent },


  {path: '**', component: PageNotFoundComponent},
];
