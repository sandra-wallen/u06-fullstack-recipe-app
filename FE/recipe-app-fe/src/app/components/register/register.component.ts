import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {  
  }

  ngOnInit(): void {
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

      this.authService.register(user).subscribe((res: any) => {
        if (res.user) {
          this.form.reset();
          this.router.navigate(['/login']);
        }
      })

      //this.http.post("http://localhost:8000/api/register", {
      //  "username": this.form.value.username,
      //  "fullName": this.form.value.fullname,
      //  "email": this.form.value.email,
      //  "password": this.form.value.password
      //}).subscribe(() => this.router.navigate(['/login']));
    } else {
      alert("Passwords must match");
    }
  }}

}
