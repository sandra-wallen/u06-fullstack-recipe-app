import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {  
  }

  ngOnInit(): void {

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/recipes']);
    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.minLength(6)]),
    });
  }

  checkPasswords() {
    return this.form.value.password === this.form.value.repeatPassword ? true : false;
  }

  onSubmit() {{
    if (this.checkPasswords()) {
      const user = {
        "username": this.form.value.username,
        "fullName": this.form.value.fullname,
        "email": this.form.value.email,
        "password": this.form.value.password
      };

      this.authService.register(user).subscribe({
        next: res => {
          this.form.reset();
          this.router.navigate(['/login']);
        },
        error: err => {
          if (err.status === 422) {
            alert(err.error.message);
          }
        }
      })
      
    } else {
      alert("Passwords must match");
    }
  }}

}
