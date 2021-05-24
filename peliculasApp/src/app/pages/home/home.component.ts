import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  //metodo para detectar scroll en navegador
  @HostListener('window: scroll', ['$event'])
  onScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){
      //LLAMAR AL SERVICIO
      if(this.peliculasService.cargando){return;}
      this.peliculasService.getCartelera().subscribe((movies: any) => {
        this.movies.push(...movies );
      })
    }
    //console.log(pos, max);

  }

  constructor(private peliculasService: PeliculasService) {
    
  }

  ngOnInit(){
    this.getCartelera();
  }

  ngOnDestroy(){
    this.peliculasService.resetCarteleraPage();
  }

  getCartelera(){
    this.peliculasService.getCartelera().subscribe( (movies: any) => {
      //console.log(this.movies);
      this.movies = movies;
      this.moviesSlideshow = movies;
    })
  }

}
