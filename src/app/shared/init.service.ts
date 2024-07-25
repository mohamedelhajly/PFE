import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})
export class InitService {

  constructor(
    private userService: UserService
  ) {}

  getCurrentUser() {
    return firstValueFrom(
      this.userService.getCurrentUser().pipe(
        map((currentUser: any) => {
          this.userService.currentUser = currentUser;
          console.log(
            'Current user',this.userService.currentUser
          );

        })
      )
    );
  }
}
