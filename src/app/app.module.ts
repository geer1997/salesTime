import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { ChartsModule } from 'ng2-charts-x';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserComponent } from './components/auth/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HomeGreetingComponent } from './components/home/home-greeting/home-greeting.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    HomeGreetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ChartsModule
  ],
  providers: [
    AngularFireAuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
