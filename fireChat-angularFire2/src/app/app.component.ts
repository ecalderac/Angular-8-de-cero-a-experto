import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'fireChat-angularFire2';
  public chats: Observable<any[]>;

  constructor(
    firestore: AngularFirestore,
    public _cs: ChatService
    ){

    this.chats = firestore.collection('chats').valueChanges();
    
  }

}
