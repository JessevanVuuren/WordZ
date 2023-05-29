import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "./http.service";
import { AuthResponse } from "src/models/AuthResponse.model";

@Injectable({ providedIn: 'root' })
export class AuthService {

  is_logged_in = new BehaviorSubject<boolean>(false);
  user_model?: AuthResponse

  constructor(private http: HttpService, private route: Router) { }


  get_key(): string | undefined {
    return localStorage.getItem("wordz") || undefined
  }

  validate_key(): Observable<AuthResponse> {
    return this.http.getSingleData<AuthResponse>("/api/validate_token")
  }

  async validate_key_auth_guard(): Promise<boolean> {
    return new Promise((res, rej) => {
      this.http.getSingleData<AuthResponse>("/api/validate_token").subscribe((data) => {
        res(data.message === "Valid token")
      }, err => {
        res(false)
      })
    })
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.sendData<AuthResponse>("/api/login", {
      "email": username,
      "password": password
    })
  }

  log_user_in(response: AuthResponse) {
    this.user_model = response
    this.saveKey(response.token)
    this.is_logged_in.next(true)
    this.route.navigate(["/"])
  }

  log_user_out() {
    this.user_model = undefined
    this.is_logged_in.next(false)
    localStorage.removeItem("wordz")
    this.route.navigate(["/login"])
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.sendData<AuthResponse>("/api/register", {
      "name": name,
      "email": email,
      "password": password,
      "password_confirmation": password
    })
  }

  saveKey(token: string) {
    localStorage.setItem("wordz", token)
  }
}


export const canActivate: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!await authService.validate_key_auth_guard()) {
    router.navigate(["/login"])
    return false
  }
  return true
};

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => canActivate(route, state);