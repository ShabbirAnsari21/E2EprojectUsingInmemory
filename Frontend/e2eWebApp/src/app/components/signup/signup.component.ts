import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private userService: UserService) {}

  // Signup function
  signup(): void {
    if (this.username && this.password) {
      this.userService.signup(this.username, this.password).subscribe(
        () => {
          this.message = 'User registered successfully';
        },
        (error) => {
          this.message = 'Error: ' + error.message;
        }
      );
    } else {
      this.message = 'Please enter a valid username and password';
    }
  }
}
