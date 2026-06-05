import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav.component";

@Component({
  selector: 'app-increment',
  imports: [NavComponent],
  templateUrl: './increment.html',
  styleUrl: './increment.css',
})
export class IncrementComponent implements OnInit {
  counter: number;

  constructor() { this.counter = 0; }

  ngOnInit(): void {
    this.counter = 0;
  }

}
