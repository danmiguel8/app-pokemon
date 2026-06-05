import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'pokemonRarete',
  standalone: true
})
export class PokemonRaretePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(rarete: string): SafeHtml {

    if (!rarete) return '';

    const count = rarete.length;
    let color: string;

    if (count <= 2) {
      color = '#ce8946';
    }
    else if (count <= 4) {
      color = '#c4c4c4';
    }
    else {
      color = '#ffd700';
    }

    const filled = `<i class="material-icons" style="color:${color}">star</i>`.repeat(count);
    const empty = `<i class="material-icons" style="color:#ccc">star_border</i>`.repeat(5 - count);

    return this.sanitizer.bypassSecurityTrustHtml(filled + empty);
  }

}
