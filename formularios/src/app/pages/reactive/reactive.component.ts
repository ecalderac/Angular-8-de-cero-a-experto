import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
   }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }

  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([ [], [] ])
    });
  }

  //Dejar datos cargados automaticamente al formulario
  cargarDataAlFormulario(){
    //this.forma.reset (resetea los datos del formulario)
    this.forma.setValue({
      nombre: 'Eduardo',
      apellido: 'Caldera',
      correo: 'ecc.calderac@gmail.com',
      direccion: {
        distrito: 'Arica',
        ciudad: 'Arica y Parinacota',
      },
      pasatiempos: [ [], [] ]
    });
  }

  guardar(){
    console.log(this.forma);
    //Verifica que todos los campos de formgroup son validos
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach( control => {
        //Este if es para el formgroup anidado(distriot, ciudad), sacar este if si no se ocupa un formgroup anidado y dejar solo contenido de else
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
  }

}
