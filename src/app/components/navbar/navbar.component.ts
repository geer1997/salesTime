import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;
  user$: Observable<firebase.User>;

  constructor(
    private authServ: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    /*this.authServ.user.subscribe( (user) => {
      this.user = user;
      console.log(user);
      if(user) {
        console.log(user.displayName);
      }
    });*/
    this.user$ = this.authServ.user;
    this.userService.getCurrentUser().subscribe(u => {
      console.log("user nav", u);
      
      this.user = u;
    })

  }

  public login() {
    this.authServ.loginWithGoogle();
  }

  logout() {
    this.authServ.logout();
  }

}
