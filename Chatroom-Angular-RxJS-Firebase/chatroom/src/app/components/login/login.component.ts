import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private hasErrors: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    try {
      this.userService.login(this.loginForm.get('email').value,this.loginForm.get('password').value)
        .then(res => {
          this.hasErrors = false;
          console.log(res);
        })
        .catch(err => {
          this.hasErrors = true;
          console.log(`Login catch error: ${err}`);
        });
    } catch (e) {
      console.log(`Login error: ${e}`);
    }
  }
}
