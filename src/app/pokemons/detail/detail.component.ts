import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../donnees/pokemon';
import { PokemonsService } from '../pokemons.service';
import { getEvolutionChain, getEvolutionStage, getNextEvolution } from '../donnees/evolutions.config';
import { fadeSlideIn, cardFlipIn, rowFadeIn, evolutionAnim, xpBarAnim } from '../../animation';
import { DatePipe } from '@angular/common';
import { PokemonTypeColorPipe } from '../pipes/pokemon-type-color.pipe';
import { PokemonRaretePipe } from '../pipes/pokemon-rarete.pipe';
import { NavComponent } from '../../nav.component';

@Component({
  standalone: true,
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  imports: [DatePipe, PokemonTypeColorPipe, PokemonRaretePipe, NavComponent],
  animations: [fadeSlideIn, cardFlipIn, rowFadeIn, evolutionAnim, xpBarAnim]
})
export class DetailComponent implements OnInit {
  pokemon!: Pokemon;
  pokemonsSize: number = 0;
  allPokemons: Pokemon[] = [];
  evolutionChain: string[] = [];
  currentStage: number = 0;
  nextEvolution: string | null = null;
  isEvolving: boolean = false;
  levelUpMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonsService: PokemonsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemonsService.getPokemon(id).subscribe(pokemon => {
      this.pokemon = pokemon;
      this.refreshEvolution();
    });

    this.pokemonsService.getPokemons().subscribe(pokemons => {
      this.allPokemons = pokemons;
      this.pokemonsSize = pokemons.length;
    });
  }

  refreshEvolution(): void {
    this.evolutionChain = getEvolutionChain(this.pokemon.name) ?? [];
    this.currentStage = getEvolutionStage(this.pokemon.name);
    this.nextEvolution = getNextEvolution(this.pokemon.name);
  }

  get xpPercent(): number {
    const required = this.pokemon.level * 100;
    return Math.min(Math.round((this.pokemon.xp / required) * 100), 100);
  }

  get xpRequired(): number {
    return this.pokemon.level * 100;
  }

  train(): void {
    this.levelUpMessage = '';
    const prevLevel = this.pokemon.level;
    this.pokemonsService.trainPokemon(this.pokemon).subscribe(updated => {
      this.pokemon = updated;
      this.refreshEvolution();
      if (updated.level > prevLevel) {
        this.levelUpMessage = `Niveau ${updated.level} atteint ! +10 PV, +5 Dégâts`;
        setTimeout(() => this.levelUpMessage = '', 3000);
      }
    });
  }

  evolve(): void {
    this.isEvolving = true;
    const obs = this.pokemonsService.evolvePokemon(this.pokemon, this.allPokemons);
    if (!obs) { this.isEvolving = false; return; }
    obs.subscribe(updated => {
      this.pokemon = updated;
      this.refreshEvolution();
      this.isEvolving = false;
    });
  }

  goBack(): void { this.router.navigate(['/pokemon/all']); }

  selectPokemonToEdit(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon/edit', pokemon.id]);
  }

  deletePokemon(pokemon: Pokemon): void {
    this.pokemonsService.deletePokemon(pokemon).subscribe(() =>
      this.router.navigate(['/pokemon/all'])
    );
  }
}
