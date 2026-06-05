import { Routes } from '@angular/router';
import { PokemonsComponent } from './pokemons/list/pokemons.component';
import { IncrementComponent } from './increment/increment';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { pokemonsRoutes } from './pokemons/pokemons.routes';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
  { path:'', component: PokemonsComponent, canActivate: [AuthGuard] },
  { path: 'pokemon', children: pokemonsRoutes, canActivate: [AuthGuard] },
  { path:'increment', component: IncrementComponent, canActivate: [AuthGuard] },
  { path:'login', component: AuthComponent },

  { path:'logout', component: LogoutComponent },

  {path: '**', component: PageNotFoundComponent},
];
