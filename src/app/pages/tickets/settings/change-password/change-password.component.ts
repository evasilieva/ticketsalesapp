import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {IUser} from "@models/users";
import {TestingService} from "@service/testing/testing.service";
import {SettingsService} from "@service/settings/settings.service";
import {UserService} from "@service/user/user.service";
import {AuthService} from "@service/auth/auth.service";
import {MessageService} from "primeng/api";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ISettings} from "@models/settings";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  private subjectForUnsubscribe = new Subject();
  private user: IUser | null;

  constructor(testingObservable: TestingService,
              private settingsService: SettingsService,
              private userService: UserService,
              private authService: AuthService,
              private messageService: MessageService,
              ) {
  }

  changePasswordForm: FormGroup;

  ngOnInit(): void {

    this.settingsService
      .loadUserSettings()
      .pipe(takeUntil(this.subjectForUnsubscribe))
      .subscribe((data: ISettings) => {
        console.log('settings data', data)
      });

    this.settingsService
      .getSettingsSubjectObservable()
      .pipe(takeUntil(this.subjectForUnsubscribe))
      .subscribe((data: ISettings) => {
        console.log('settings data subject', data)
      });

    this.user = this.userService.getUser()


    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required,
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        this.dontUserOldPasswordValidator(),
      ]),
      newPasswordRepeat: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        this.dontUserOldPasswordValidator(),
      ]),
    });

    // this.changePasswordForm.addValidators()
    //.setValidators(this.passwordValidator(this.changePasswordForm));

  }

  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

  onSubmitChangePassword() {
    if (!this.user) {
      console.log('что-то не так');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'что-то не так'
      });
      return;
    }
    if (this.user.password !== this.changePasswordForm.value.currentPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'текущий пароль не верный'
      });
      console.log('текущий пароль не верный');
      return;
    }

    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.newPasswordRepeat) {
      console.log('пароли не совпадают');
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'Пароли не совпадают'
      });
      return;
    }
    console.log('try update user');

    this.user.password = this.changePasswordForm.value.newPassword;
    if (!this.authService.updateUser(this.user)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка обновления пароля',
        detail: 'не удалось обновить пароль'
      });
      return;
    }
    this.userService.setUser(this.user);

    this.messageService.add({
      severity: 'success',
      summary: 'Пароль обновлен',
      // detail: 'текущий пароль не верный'
    });

  }

  dontUserOldPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value == this.user?.password;
      return forbidden ? {dontUserOldPassword: {value: control.value}} : null;
    };
  }


  // passwordValidator(formGroup: FormGroup): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     console.log(formGroup.get('newPassword')?.value);
  //     console.log(formGroup.get('newPasswordRepeat')?.value);
  //     console.log(formGroup.get('newPassword')?.value === formGroup.get('newPasswordRepeat')?.value);
  //     return formGroup.get('newPassword')?.value === formGroup.get('newPasswordRepeat')?.value
  //       ? null
  //       : {password: {value: control.value}};
  //   }
  // }

}
