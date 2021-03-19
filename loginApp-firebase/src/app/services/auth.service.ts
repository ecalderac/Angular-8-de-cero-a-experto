import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDi4M3CqkNMD8h_teMhmugaVFpSOZdDW1U';

  userToken: string;

  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Loguear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http: HttpClient) {
    this.leerToken();
   }

  logout(){
    console.log("logout");
  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`, authData).pipe(map(resp => {
      console.log("entro");
      this.guardarToken(resp['idToken']);
      return resp;
  }))

  }

  registrarUsuario(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signUp?key=${this.apikey}`, authData).pipe(map(resp => {
      console.log("entro");
        this.guardarToken(resp['idToken']);
        return resp;
    }))

  }

  private guardarToken(idToken: string){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken(){

    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado(){

    return this.userToken.length > 2;

  }

}
