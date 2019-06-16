import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$ = new ReplaySubject<boolean>(1);
  private user$ = new ReplaySubject<firebase.User>(1);
  
  constructor(public afAuth: AngularFireAuth, private ngZone: NgZone) {
    this.isLoggedIn$.next(false);
    this.afAuth.auth.onAuthStateChanged(async (user) => {
      this.ngZone.run(() => {
        this.isLoggedIn$.next(Boolean(user));
        this.user$.next(user);
      })
    });
   }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  get user(): Observable<firebase.User> {
    return this.user$.asObservable();
  }

  /**
   * Log users in with Google Auth Provider Pop-up
   * @author Germano Rojas
   */
  public loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  
}
