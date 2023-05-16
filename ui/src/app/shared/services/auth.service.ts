import { Injectable } from "@angular/core";
import { AuthProvider, GoogleAuthProvider } from "firebase/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    public $afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}
  // Sign in with Google
  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider: AuthProvider) {
    return this.$afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("You have been successfully logged in!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
