import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
   * @param id id of the current user
   * @author Germano Rojas
   */
  public getCurrentUser(id: string): Observable<Action<DocumentSnapshot<User>>> {
    return this.af.collection(this.path).doc<User>(id).snapshotChanges();
    /* PENDIENTE: Determinar si será Action<DocumentSnapshot<User>>> o solamente el payload (<DocumentSnapshot<User>>) */
    // .pipe(map( u => {
    //   let newData: DocumentSnapshot<User> = u.payload;
    //   return newData;
    // }));
  }
}
