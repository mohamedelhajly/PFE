import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { ApiService } from "./api.service";



@Injectable({
  providedIn: 'root',
})
export class UserService {
   currentUser$: BehaviorSubject<any | null> =
    new BehaviorSubject<any | null>(null);

  constructor(private apiService: ApiService) {}

  public get currentUser(): any | null {
    return this.currentUser$.value;
  }

  public set currentUser(user: any | null) {
    this.currentUser$.next(user);
  }

  getCurrentUser() {
    return this.apiService
      .get<any>('account/userinfo')
      .pipe(tap(user => (this.currentUser = user)));
  }
}
