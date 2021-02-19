import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-heroes-8fa22-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) { }


  crearHeroe(heroe: HeroeModel){
    
    return this.http.post(`${this.url}/heroes.json`, heroe)
                .pipe(
                  map((resp: any) => {
                    heroe.id = resp.name;
                    return heroe;
                  })
                )

  }

  actualizarHeroe(heroe: HeroeModel){

    //hace referencioa a todos los datos que contiene el objeto de heroes
    //ejmp nombre: heroe.nombre, apellido, heore.apellido, etc
    // const heroeTemp = {
    //   ...heroe
    // };

    const heroeTemp = {
      nombre: heroe.nombre,
      poder: heroe.poder,
      vivo: heroe.vivo
    }

    //delete heroeTemp.id;
    
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)

  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
                .pipe(map(this.crearArreglo));
  }

  private crearArreglo(heroesObj: any){

    const heroes: HeroeModel[] = [];

    if(heroesObj === null){return [];}

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);

    })

    return heroes;
  }

  getHeroe(id: string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  borrarHeroe(id: any){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

}
