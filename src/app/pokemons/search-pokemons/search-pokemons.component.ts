import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { POKEMONS } from '../donnees/mock-pokemons';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Pokemon } from '../donnees/pokemon';
import { AsyncPipe } from '@angular/common';
import { PokemonsService } from '../pokemons.service';
import { PokemonTypeColorPipe } from "../pipes/pokemon-type-color.pipe";

@Component({
  standalone: true,
  selector: 'app-search-pokemons',
  templateUrl: './search-pokemons.component.html',
  imports: [FormsModule, AsyncPipe, PokemonTypeColorPipe],
})
export class SearchPokemonsComponent implements OnInit {

  gotToDetail(pokemon: any) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  private searchTerms = new Subject<string>();
  pokemons!:Observable<Pokemon[]>;
  param:string = "";

  search(term: string, param:string="name"): void{
    this.searchTerms.next(term);
    this.param = param;
  }


  constructor(private router: Router, private pokemonService: PokemonsService) { }

  ngOnInit() {
    this.pokemons = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.pokemonService.searchPokemons(term,this.param)),
    );
  }

}
