import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

  <app-ng-style></app-ng-style> 
  <br>

  <app-css></app-css>
  <br>
  
  <app-clases></app-clases> 
  <br><br/>

  <p [appResaltado]="'red'">
      Hola mundo
  </p>
  
  <br>
  <app-ng-switch></app-ng-switch>

  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("ngOnInit");
  }

}
