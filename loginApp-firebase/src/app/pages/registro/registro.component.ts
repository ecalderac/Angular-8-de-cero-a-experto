import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    this.usuario.email = 'ecc.calderac@gmail.com';
   }

   onSubmit(form: NgForm){

    if(form.invalid) {return;}

     console.log(this.usuario);
     console.log(form);
   }


}
