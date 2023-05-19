import { Injectable } from "@angular/core";
import { NgForage } from "ngforage";
import { Observable, from, of, switchMap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LocalforageService {
  constructor(private $ngf: NgForage) {}

  getItem<T>(key: string): Observable<NonNullable<T> | undefined> {
    return from(this.$ngf.getItem<T>(key)).pipe(
      switchMap((value) => of(value || undefined))
    );
  }

  setItem<T>(key: string, value: T): Observable<NonNullable<T> | undefined> {
    return from(this.$ngf.setItem<T>(key, value)).pipe(
      switchMap((value) => of(value || undefined))
    );
  }

  removeItem(key: string): Observable<void> {
    return from(this.$ngf.removeItem(key));
  }
}
