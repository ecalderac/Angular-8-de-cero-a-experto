import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(){
    this.cargando = true;
    this.heroesService.getHeroes().subscribe( resp => {
      this.heroes = resp;
      this.cargando = false;
    })
  }

  borrarHeroe(heroe: HeroeModel, i: number){

    Swal.fire({
      title: 'Está seguro',
      text: `Esta seguro que desea borrar a ${heroe.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then( (borrar) => {
      //console.log(borrar.isConfirmed);
      if(borrar.isConfirmed){
        this.heroes.slice(i,1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
        this.getHeroes();
      }

    })

  }

}
