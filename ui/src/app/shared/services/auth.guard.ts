import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of, switchMap } from "rxjs";
import { AuthService } from "./auth.service";
import { RouteEnum } from "../utils";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private $auth: AuthService, private $router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.$auth.getToken().pipe(
      switchMap((token) => {
        if (!token) this.$router.navigateByUrl(RouteEnum.HomePage);

        return this.$auth.getCurrentUser();
      }),
      switchMap((user) => {
        if (!user?.roles) {
          this.$router.navigate([""]);
          return of(false);
        }

        const roles: string[] = route.data["roles"];
        if (!Array.isArray(roles)) {
          throw new Error(
            "'roles' must be defined in the data besides AuthGuard."
          );
        }

        if (user.roles.some((role) => roles.includes(role))) {
          return of(true);
        }

        return of(false);
      })
    );
  }
}
