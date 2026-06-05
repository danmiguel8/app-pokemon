import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees/pokemon';
import { POKEMONS } from '../donnees/mock-pokemons';
import { DatePipe } from '@angular/common';
import { PokemonTypeColorPipe } from '../pipes/pokemon-type-color.pipe';
import { BorderCardDirective } from '../directives/border-card.directive';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { SearchPokemonsComponent } from "../search-pokemons/search-pokemons.component";

@Component({
  standalone: true,
  selector: 'list-pokemons',
  templateUrl: './pokemons.component.html',
  imports: [DatePipe, PokemonTypeColorPipe, BorderCardDirective, SearchPokemonsComponent]
})
export class PokemonsComponent implements OnInit {

  favoris() {
    let link = ["/pokemon/favoris"];
    this.router.navigate(link);
  }

  addToFavoris(pokemon: Pokemon) {
    this.pokemonsService.addPokemonToFavoris(pokemon).subscribe( () =>
      this.router.navigate(['/'])
    );
  }
  removeToFavoris(pokemon: Pokemon) {
    this.pokemonsService.removePokemonToFavoris(pokemon).subscribe( () =>
      this.router.navigate(['/'])
    );
  }

  navigateTocreatePokemon() {
    let link = ["/pokemon/create"];
    this.router.navigate(link);
  }

  selectPokemon(pokemon: Pokemon) {
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  pokemons: Pokemon[];

  constructor(private router: Router, private pokemonsService: PokemonsService) { this.pokemons = []; }

  ngOnInit(): void {
    this.pokemonsService.getPokemons().subscribe((pokemons) => {
        console.log(pokemons);
        this.pokemons = pokemons
        console.log(this.pokemons);
      });
      console.log(this.pokemons);
  }

}
