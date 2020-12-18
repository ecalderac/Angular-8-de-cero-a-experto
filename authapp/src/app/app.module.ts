import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProtegidaComponent } from './components/protegida/protegida.component';
import { PreciosComponent } from './components/precios/precios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProtegidaComponent,
    PreciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'ecalderac.us.auth0.com',
      clientId: 'dXbo8b9l5b5Wy9moq2QOkWe53t4Kmgdp'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
