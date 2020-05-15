import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private hasErrors: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    try {
      this.userService.register(
        this.registerForm.get('email').value,
        this.registerForm.get('password').value,
        this.registerForm.get('username').value
      )
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    catch (e) {
      console.log(e);
    }
  }
}
