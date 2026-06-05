import { Component, OnInit } from '@angular/core';
import { POKEMONS } from '../donnees/mock-pokemons';
import { Pokemon } from '../donnees/pokemon';
import { PokemonTypeColorPipe } from '../pipes/pokemon-type-color.pipe';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { PokemonRaretePipe } from '../pipes/pokemon-rarete.pipe';

@Component({
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  imports : [DatePipe,PokemonTypeColorPipe, PokemonRaretePipe]
})
export class DetailComponent implements OnInit {

  deletePokemon(pokemon: any) {
    this.pokemonsService.deletePokemon(pokemon).subscribe( () =>
      this.router.navigate(['pokemon/all'])
    );
  }

  constructor(private route: ActivatedRoute, private router: Router,
              private pokemonsService : PokemonsService
              ){
  }
  pokemon: any = null;
  pokemonsSize: any = POKEMONS.length;

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe((pokemon) => this.pokemon = pokemon);
  }

  goBack(){
    this.router.navigate(['/']);
  }

  selectPokemonToEdit(pokemon: Pokemon) {
    let link = ['pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

}
