import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../donnees/pokemon';
import { PokemonRaretePipe } from "../pipes/pokemon-rarete.pipe";

declare var M: any;

@Component({
  standalone: true,
  selector: 'app-pokemon-comparateur',
  templateUrl: './comparateur-pokemon.component.html',
  imports: [FormsModule, PokemonRaretePipe],
})

export class PokemonComparateurComponent implements OnInit, AfterViewInit  {
  pokemons: Pokemon[] = [];
  pokemon1: Pokemon | null = null;
  pokemon2: Pokemon | null = null;
  resultat: boolean = false;

    ngAfterViewInit(): void {
    M.FormSelect.init(document.querySelectorAll('select'));
  }

  constructor(private pokemonsService: PokemonsService) {}

ngOnInit(): void {
  this.pokemonsService.getPokemons().subscribe(p => {
    this.pokemons = p;
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'));
    }, 0);
  });
}

  comparer(): void {
    if (this.pokemon1 && this.pokemon2) {
      this.resultat = true;
      setTimeout(() => {
        M.FormSelect.init(document.querySelectorAll('select'));
      }, 0);
    }
  }

  reinitialiser(): void {
    this.pokemon1 = null;
    this.pokemon2 = null;
    this.resultat = false;
  }

  score(p: Pokemon): number {
    return p.hp + p.cp + p.rarete.length;
  }

  isWinner(p: Pokemon): boolean {
    if (!this.pokemon1 || !this.pokemon2) return false;
    return this.score(p) >= this.score(p === this.pokemon1 ? this.pokemon2 : this.pokemon1);
  }
}
