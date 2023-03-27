import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketsRoutingModule} from './tickets-routing.module';
import {TicketsComponent} from './tickets.component';
import {MessageService} from "primeng/api";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {TicketListComponent} from './ticket-list/ticket-list.component';
import {AsideComponent} from './aside/aside.component';
import {MenubarModule} from "primeng/menubar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BlocksStyleDirective} from "@app/directive/blocks-style.directive";
import {SettingsComponent} from './settings/settings.component';
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {TabViewModule} from "primeng/tabview";
import { StatisticsComponent } from './settings/statistics/statistics.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import {TableModule} from "primeng/table";
import { TourLoaderComponent } from './settings/tour-loader/tour-loader.component';


@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlocksStyleDirective,
    SettingsComponent,
    StatisticsComponent,
    ChangePasswordComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ToastModule,
    InputTextModule,
    TabViewModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [
    MessageService,
    {provide: LOCALE_ID, useValue: "ru-RU"}
  ]
})
export class TicketsModule {
}
