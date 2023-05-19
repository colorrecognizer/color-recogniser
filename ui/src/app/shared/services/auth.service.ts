import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { User, UserApi } from "../auto-generated/apis";
import { NgForage } from "ngforage";
import { LocalforageService } from "./localforage.service";

const JWT_TOKEN = "jwtToken";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _currentUser?: User;

  constructor(
    private $userApi: UserApi,
    private $router: Router,
    private $localforage: LocalforageService
  ) {}

  getCurrentUser(forceRefresh = false): Observable<User | undefined> {
    if (!forceRefresh && this._currentUser) return of(this._currentUser);

    return this.$userApi.findCurrentUser().pipe(
      switchMap((user) => {
        if (!user?.id) {
          this.logout(false);
          return of(undefined);
        }

        this._currentUser = user;
        return of(user);
      }),
      catchError(() => {
        this.logout(false);
        return of(undefined);
      })
    );
  }

  // login(request: { emailOrPhoneNumber: string; password: string }) {
  //   return this.$userApi
  //     .login(
  //       new AuthenticationRequest({
  //         emailOrPhoneNumber: request.emailOrPhoneNumber,
  //         password: request.password,
  //       })
  //     )
  //     .pipe(
  //       switchMap((response) => {
  //         if (response.errorMessage) {
  //           throw new Error(response.errorMessage);
  //         }

  //         if (response.token) {
  //           localStorage.setItem(this.JWT_TOKEN, response.token);
  //         }

  //         return of(response);
  //       })
  //     );
  // }

  logout(forceNavigateToLogin = true) {
    this._currentUser = undefined;
    this.$localforage.removeItem(JWT_TOKEN).subscribe(() => {
      if (forceNavigateToLogin) this.$router.navigate(["auth", "login"]);
    });
  }

  getToken(): Observable<string | undefined> {
    return this.$localforage.getItem<string>(JWT_TOKEN);
  }
}
