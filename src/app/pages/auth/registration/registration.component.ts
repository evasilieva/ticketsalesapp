import {Component, OnInit} from '@angular/core';
import {AuthService} from "@service/auth/auth.service";
import {IUser} from "@models/users";
import {MessageService} from "primeng/api";
import {ConfigService} from "@service/config/config.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "@models/errors";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public login: string;
  public password: string;
  public passwordConfirm: string;
  public cardNumber: string;
  public email: string;
  // saveOnLocalStorage: string;
  showCardNumber: boolean;

  constructor(private authService: AuthService,
              private messageService: MessageService) {
    this.showCardNumber = ConfigService.config?.useUserCard ?? false;
  }

  ngOnInit(): void {
  }

  register(event: Event) {
    const newUser: IUser = {
      login: this.login,
      password: this.password,
      cardNumber: this.cardNumber,
      email: this.email
    }
    // console.log(this.saveOnLocalStorage)
    // const result = this.authService.addUser(newUser, !!this.saveOnLocalStorage)
    // if (this.authService.checkUserExist(newUser)) {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Ошибка регистрации',
    //     detail: 'Такой пользователь уже есть'
    //   });
    //   return;
    // }
    this.authService.addUser(newUser, true)
      .subscribe((res) => {
        this.messageService.add({severity: 'success', summary: 'Регистрация успешна', detail: 'ok'});
      }
      ,(error: HttpErrorResponse) => {
          console.log(error);
          const serverError = <ServerError>error.error;
        this.messageService.add({severity: 'error', summary: 'Ошибка регистрации', detail:serverError.errorText??'Ошибка'});
        }
      );


    // if (result) {
    //   this.messageService.add({severity: 'success', summary: 'Регистрация успешна', detail: 'ok'});
    // } else {
    //   this.messageService.add({severity: 'error', summary: 'Ошибка регистрации', detail: 'что-то пошло не так'});
    // }
  }


  clear() {
    this.messageService.clear();
  }
}
