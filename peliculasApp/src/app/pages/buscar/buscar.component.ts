import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto: string = '';
  public movies: Movie[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasServide: PeliculasService
    ) { }

  ngOnInit(): void {
    this.getBuscar();
  }

  //Obtener valor por params
  getBuscar(){
    this.activatedRoute.params.subscribe(params => {
      console.log(params.texto)
      //llamar servicio
      this.peliculasServide.buscarPeliculas(params.texto).subscribe(movies => {
        this.movies = movies;
      })
    })
  }

}
