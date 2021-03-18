import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../models/usuario.models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    this.usuario.email = 'ecc.calderac@gmail.com';
   }

   onSubmit(form: NgForm){

    if(form.invalid) {return;}

    this.auth.registrarUsuario(this.usuario).subscribe( (resp:any) => {
      console.log(resp);
    }, (err) => {
      console.log(err.error.error.message);
    })
     
   }


}
