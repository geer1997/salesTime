import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: firebase.User;
  user$: Observable<firebase.User>;

  constructor(private authServ: AuthService) { }

  ngOnInit() {
    /*this.authServ.user.subscribe( (user) => {
      this.user = user;
      console.log(user);
      if(user) {
        console.log(user.displayName);
      }
    });*/
    this.user$ = this.authServ.user;

  }

  public login() {
    this.authServ.loginWithGoogle();
  }

  logout() {
    this.authServ.logout();
  }

}
