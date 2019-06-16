import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(
    private authServ: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser('id').subscribe(u => {
      this.user = u.payload.data();
      console.log(u);
    })
  }

  public GoogleAuth() {
    this.authServ.loginWithGoogle();
  }

}
