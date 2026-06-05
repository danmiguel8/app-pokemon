import { Component, OnInit } from '@angular/core';
import { FormAddPokemonComponent } from './form-add-pokemon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  imports: [FormAddPokemonComponent]
})
export class AddPokemonComponent implements OnInit {

  pokemon: any = null;

  constructor(private router: Router){  }

  ngOnInit(): void {

  }

  goBack(){
    this.router.navigate(['/']);
  }

}
