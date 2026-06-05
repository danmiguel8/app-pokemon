export class Pokemon{
  id: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: Array<string>;
  created: Date;
  rarete : string;
  isFavorite: boolean;

  constructor(){
    this.id = 0;
    this.hp = 0;
    this.cp = 0;
    this.name = 'Pika Pika';
    this.picture = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png';
    this.types = ['Electric'];
    this.created = new Date();
    this.rarete = '*';
    this.isFavorite = false;
  }

}
