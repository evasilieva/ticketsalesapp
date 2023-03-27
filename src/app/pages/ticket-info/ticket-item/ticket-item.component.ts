import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INearestTourWithLocation, INearestTour, ITour, ITourLocation} from "@models/tours";
import {ActivatedRoute, Event, Router} from "@angular/router";
import {TicketsStorageService} from "@service/tiсkets-storage/tickets-storage.service";
import {IUser} from "@models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "@service/user/user.service";
import {ConfigService} from "@service/config/config.service";
import {forkJoin, fromEvent, Subscription} from "rxjs";
import {TicketsService} from "@service/tickets/tickets.service";
import {IOrder} from "@models/order";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {

  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;
  showCardNumber: boolean;
  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];
  // nearestToursWithLocation: INearestTourWithLocation[];
  nearestToursWithLocation: ITour[];

  ticketSearchValue: string = '';

  @ViewChild('ticketSearch')
  ticketSearch: ElementRef;

  searchTypes = [1, 2, 3]

  private tourId: string;
  private searchTicketSubscription: Subscription;
  private ticketRestSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketsService: TicketsService,
              private messageService: MessageService,
              private router: Router,
  ) {
    this.showCardNumber = ConfigService.config?.useUserCard ?? false;
  }

  ngOnInit(): void {

    // parse url params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');

    const paramId = routeIdParam || queryIdParam;
    if (paramId) {
      this.tourId = paramId;
    }

    this.getTicket(this.tourId)

    // get user info
    this.user = this.userService.getUser();


    // reactive form
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl(),
      birthDate: new FormControl(),
      age: new FormControl(),
      citizenship: new FormControl(),
    })


    // forkJoin([
    //   this.ticketsService.getNearestTours(),
    //   // this.ticketsService.getToursLocation()
    // ])
    //   .subscribe(([nearestTours]) => {
    //     // console.log(nearestTours);
    //     // console.log(toursLocation);
    //     this.nearestTours = nearestTours;
    //     // this.toursLocation = toursLocation;
    //     // this.nearestToursWithLocation = this.transformNearestTours(nearestTours);
    //
    //   });

    this.initSearchTour();
  }

  /**
   * Преобразовать билеты в билеты с локацией
   * @param nearestTours
   * @private
   */
  private transformNearestTours(nearestTours: INearestTour[]): INearestTourWithLocation[] {
    return nearestTours.map((item) => {
      return {
        ...item,
        region: this.toursLocation.find((location) => location.id === item.locationId)
      } as INearestTourWithLocation
    });
  }

  /**
   * Получить билет по id
   * @param id
   */
  public getTicket(id: string) {
    this.ticketsService.getTicketById(id).subscribe(
      (data) => {
        this.ticket = data
      }
    );
  }


  ngAfterViewInit(): void {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');

    this.searchTicketSubscription = fromEventObserver.subscribe(() => {
      this.initSearchTour();
    });
  }

  onSubmit() {
  }

  /**
   * Отправка запроса об оформлении билета
   */
  initTour() {

    const userDate = this.userForm.getRawValue();
    const postData = {
      ...userDate,
      ...this.ticket
    };
    const userId = this.userService.getUser()?.id || null;
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDate,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }
    // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(postData, null, 4));
    this.ticketsService
      .sendTourData(postObj)
      .subscribe({
        next: () => {
          this.router.navigate([`tickets/orders`]);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка создания заказа',
            detail: err.error?.errorText || 'Неизвестная ошибка'
          });
        }
      });
  }

  selectDate(event: Event) {
    console.log(event);
  }

  /**
   * Поиск билетов
   * @private
   */
  private initSearchTour(): void {
    if (this.ticketRestSubscription && !this.searchTicketSubscription.closed) {
      this.ticketRestSubscription.unsubscribe();
    }

    this.ticketRestSubscription = this.ticketsService
      .searchTicketsByName(this.ticketSearchValue.trim())
      .subscribe(
        (data) => {
          this.nearestToursWithLocation = data;
        }
      )
  }

  ngOnDestroy() {
    this.searchTicketSubscription.unsubscribe();
  }
}
