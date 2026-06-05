import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-increment',
  imports: [],
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
