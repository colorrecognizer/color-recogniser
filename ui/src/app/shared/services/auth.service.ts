import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { LoginRequest, User, UserApi } from "../auto-generated/apis";
import { NgForage } from "ngforage";
import { LocalforageService } from "./localforage.service";
import { RouteEnum } from "../utils";

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

    return this.$userApi.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user?.id) {
          return of(undefined);
        }

        this._currentUser = user;
        return of(user);
      }),
      catchError(() => {
        return of(undefined);
      })
    );
  }

  login(request: LoginRequest) {
    return this.$userApi.login(request).pipe(
      switchMap((response) => {
        if (response?.token) {
          return this.$localforage.setItem(JWT_TOKEN, response.token);
        }

        return of(undefined);
      }),
      map(() => {
        this.$router.navigateByUrl(RouteEnum.HomePage);
      })
    );
  }

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
