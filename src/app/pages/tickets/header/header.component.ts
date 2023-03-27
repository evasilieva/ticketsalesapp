import {Component, OnDestroy, OnInit, Input, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from "@angular/common";
import {IUser} from "@shared/models/users";
import {UserService} from "@service/user/user.service";
import {Router} from "@angular/router";
import {IMenuType} from "@shared/models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  items: MenuItem[];
  time: Date = new Date();
  user: IUser;
  private timeInterval: number;

  @Input() menuType: IMenuType;

  private settingsActive = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {

    registerLocaleData(localeRu, 'ru-RU');

    this.initMenu();

    this.initTimeInterval();


    const tmpuser = this.userService.getUser();

    if (!tmpuser) {
      this.router.navigate(['auth']);
      return;
    }
    this.user = tmpuser;
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      window.clearInterval(this.timeInterval);
    }
  }

  private initMenu() {
    this.items = [
      {
        label: 'Билеты',
        routerLink: ['tickets-list'],
      },
      {
        label: 'Заказы',
        routerLink: ['orders'],
      },
      {
        label: 'Настройки',
        routerLink: ['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink: ['/logout'],
        // command: () => {
        //   this.userService.clear();
        // }
      },
    ];
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.initMenu();
  }


  private initTimeInterval() {
    this.timeInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

}
