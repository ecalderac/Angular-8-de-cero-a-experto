import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    return this.itemsCollection.valueChanges().pipe(map(mensajes => {
      console.log(mensajes);
      this.chats = [];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
    }))

  }

  agregarMensaje(texto: string){

    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);

  }

}
