import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login_mode = true
  invalid_cred = ""
  state = "init"

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl("", [Validators.required, Validators.minLength(6)])
  })


  constructor(private auth: AuthService) {
    if (this.auth.get_key()) {
      this.state = "validate_key"
      this.auth.validate_key().subscribe(data => {
        if (data.message == "Valid token") {
          this.auth.log_user_in(data)
          this.state = "valid_key"
        }
      }, err => {
        this.state = "invalid_key"
        this.auth.log_user_out()
      })
    }
  }


  change_form() {
    this.invalid_cred = ''
    this.login_mode = !this.login_mode
  }

  login_user() {
    this.invalid_cred = ''
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    const username = this.loginForm.get("username")?.value
    const password = this.loginForm.get("password")?.value
    if (username && password) {

      this.auth.login(username, password).subscribe((data) => {
        if (data.message == "Valid token") {
          this.auth.log_user_in(data)
          this.state = "valid_key"
        }
      }, err => {
        if (err.error.message == "Invalid credentials") {
          this.invalid_cred = err.error.message
        }
      })
    }
  }

  register_user() {
    this.invalid_cred = ''
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return
    }
    
    const name = this.registerForm.get("name")?.value
    const email = this.registerForm.get("email")?.value
    const password = this.registerForm.get("password")?.value
    const rePassword = this.registerForm.get("rePassword")?.value
    
    if (name && email && password && rePassword) {
      if (rePassword == password) {
        this.auth.register(name, email, password).subscribe((data) => {
          if (data.message == "Valid token") {
            this.auth.log_user_in(data)
            this.state = "valid_key"
          }
        }, err => {
          console.log(err)
          if(err.error.message == "The email has already been taken.") {
            this.invalid_cred = "The email has already been taken."    
          }
        })
      } else {
        this.invalid_cred = "Password does not match"
      }

    }
  }
}
