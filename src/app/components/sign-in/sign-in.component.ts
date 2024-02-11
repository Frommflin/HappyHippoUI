import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'hippo-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent {
  credentials: IUser = { username: '', password: '' };
  signinerror: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  signIn() {
    this.signinerror = false;
    this.userService.signIn(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/books'])
      },
      error: () => this.signinerror = true
    });
  }
}
