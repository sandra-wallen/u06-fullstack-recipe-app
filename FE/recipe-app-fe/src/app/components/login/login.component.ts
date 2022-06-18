import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/recipes']);
    }

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: res => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('_id', res.user.id);
        localStorage.setItem('username', res.user.username);
        localStorage.setItem('fullname', res.user.fullName);
        localStorage.setItem('email', res.user.email);
        this.router.navigate(['/recipes']);
      },
      error: err => {
        if (err.status === 401 || err.status === 422) {
          alert(err.error.message);
        }
      }
    })
  }

}
