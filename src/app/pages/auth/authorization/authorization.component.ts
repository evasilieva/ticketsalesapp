import {Component, OnInit} from '@angular/core';
import {AuthService} from "@service/auth/auth.service";
import {IUser} from "@models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "@service/user/user.service";
import {ConfigService} from "@service/config/config.service";
import {ServerError} from "@models/errors";
import {HttpErrorResponse} from "@angular/common/http";
import {IAccessToken} from "@models/accessToken";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public login: string = '';
  public password: string = '';
  public cardNumber: string = '';
  selectedValue: string;
  authTextBtn: string;
  showCardNumber: boolean;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService) {
    this.showCardNumber = ConfigService.config?.useUserCard ?? false;
  }

  ngOnInit(): void {
    this.authTextBtn = 'Войти';
  }

  onAuth(event: Event) {
    const authUser: IUser = {
      login: this.login,
      password: this.password,
    }
    this.authService.authUser(authUser)
      .subscribe((user: IAccessToken) => {
          authUser.id = user.id;
          this.userService.setUser(authUser);
          this.userService.setToken(user.access_token);
          this.router.navigate(['tickets/tickets-list']);
        }
        , (error: HttpErrorResponse) => {
          console.log(error);
          const serverError = <ServerError>error.error;
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка авторизации',
            detail: serverError.errorText ?? 'Ошибка'
          });
        });
  }

  onVipStatusSelected(event: any) {
    console.log(event);
  }
}
