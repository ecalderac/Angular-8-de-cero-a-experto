import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(
    private auth: AuthService,
    private router: Router  
  ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    this.usuario.email = 'ecc.calderac@gmail.com';
   }

   onSubmit(form: NgForm){

    if(form.invalid) {return;}

    Swal.fire({
      title: 'Espere',
      text: 'Espere porfavor',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.auth.registrarUsuario(this.usuario).subscribe( (resp:any) => {
      console.log(resp);
      Swal.close();
      if(this.recordarme){
        localStorage.setItem('email', this.usuario.email)
      }
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        text: err.error.error.message,
        icon: 'error'
      });
    })
     
   }


}
