import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn$ = new ReplaySubject<boolean>(1);
  private user$ = new ReplaySubject<firebase.User>(1);

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFirestore,
    private ngZone: NgZone
  ) {
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
   * Log users in with Google Auth Provider Pop-up. It also create users in the bd
   * @author Germano Rojas
   */
  public loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(uAuth => {
      console.log(uAuth);
      const userSubscribe = this.af.collection('users').doc(uAuth.user.uid).snapshotChanges().subscribe(u => {
        console.log(u);
        if (!u.payload.exists) {
          const user: User = {
            firstName: uAuth.user.displayName.split(' ')[0],
            lastName: uAuth.user.displayName.split(' ')[1],
            email: uAuth.user.email
          };
          this.af.collection('users').doc(uAuth.user.uid).set(user);
        }
        userSubscribe.unsubscribe();
      });
    });
  }

  public loginWithEmailCredential() {

  }

  /**
   * Log users out.
   * @author Germano Rojas
   */
  logout() {
    this.afAuth.auth.signOut();
  }


}
