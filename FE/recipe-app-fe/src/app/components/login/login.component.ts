import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../../emitters/emitters';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.form.value);

    //this.http.post('http://localhost:8000/api/login', this.form.value)
    //  .subscribe((res: any) => {
    //    console.log(res);
    //    localStorage.setItem('token', res.token);
    //    Emitters.authEmitter.emit(true);
    //    this.router.navigate(['/register'])
    //  });
  }

}
