import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = '/users';
  currentUser: Observable<Action<DocumentSnapshot<User>>>;

  constructor(
    private af: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    
   }

  /**
   * Description: the method search the current user in the bd
   * @author Germano Rojas
   */
  public getCurrentUser(): Observable<User> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
          console.log("user", user);
          
        if (user) {
          return this.af.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
    /* PENDIENTE: Determinar si será Action<DocumentSnapshot<User>>> o solamente el payload (<DocumentSnapshot<User>>) */
    // .pipe(map( u => {
    //   let newData: DocumentSnapshot<User> = u.payload;
    //   return newData;
    // }));
  }
}
