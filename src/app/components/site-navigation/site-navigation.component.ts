import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'hippo-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.sass']
})
export class SiteNavigationComponent {
  user: string | null = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (response) => {
        if (response != null || response != '') {
          this.user = response
        }
      }
    });
  }

  signOut() {
    this.userService.signOut();
    localStorage.removeItem('authToken');
    this.router.navigate(['/home'])
  }
}
