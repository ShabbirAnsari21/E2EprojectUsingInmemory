import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  token: string = '';

  constructor(private userService: UserService, private router: Router) {}

  // Login function
  login(): void {
    if (this.username && this.password) {
      this.userService.login(this.username, this.password).subscribe(
        (response: any) => {
          this.token = response.token; // Storing JWT token
          this.message = 'Login successful';
          localStorage.setItem('authToken', this.token); // Store the token locally
          this.router.navigate(['/inventory']);
        },
        (error) => {
          this.message = 'Login failed: ' + error.message;
        }
      );
    } else {
      this.message = 'Please enter a valid username and password';
    }
  }
}
