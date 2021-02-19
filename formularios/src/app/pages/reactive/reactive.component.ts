import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
    ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
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

  get usuarioNoValido(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
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

  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return (pass1 === pass2) ? false: true;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([ ])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners(){
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    // this.forma.statusChanges.subscribe(status => console.log({status}));
    this.forma.get('nombre')?.valueChanges.subscribe(console.log);
  }

  //Dejar datos cargados automaticamente al formulario
  cargarDataAlFormulario(){
    //this.forma.reset (resetea los datos del formulario)
    this.forma.setValue({
      nombre: 'Eduardo',
      apellido: 'Caldera',
      correo: 'ecc.calderac@gmail.com',
      usuario: '',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Arica',
        ciudad: 'Arica y Parinacota',
      },
      pasatiempos: []
    });
    //Para dejar cargada la data automaticamente, debemos dejar lo de la sgte linea con los valores que se quieran colocar
    //['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));

  }


  agregarPasatiempo(){
    //this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required));
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i);
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
