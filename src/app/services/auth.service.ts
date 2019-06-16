import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: firebase.User;
  authStateObservable: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private af: AngularFirestore
    ) {
    afAuth.user.subscribe((authUser) => {
      this.authUser = authUser;
    });
    this.authStateObservable = afAuth.authState;
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

  public loginWithEmailCredential(){

  }

  /**
   * Log users out.
   * @author Germano Rojas
   */
  logout() {
    this.afAuth.auth.signOut();
  }
}
