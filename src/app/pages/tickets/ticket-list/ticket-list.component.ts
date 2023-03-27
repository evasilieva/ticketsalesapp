import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {TicketsService} from "@service/tickets/tickets.service";
import {MessageService} from "primeng/api";
import {ITour, ITourTypeSelect} from "@models/tours";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "@app/directive/blocks-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  private searchTicketSub: Subscription;

  constructor(
    private ticketsService: TicketsService,
    private messageService: MessageService,
    private router: Router,
  ) {
  }

  @Input() shouldUpdateTours: number;

  ticketSearchValue: string;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  tickets: ITour[];
  blockLoaded: boolean = false;

  ticketsAll: ITour[];
  tourUnsubscriber: Subscription;

  tourUnsubscriberFullTicketList: Subscription;

  @ViewChild('tourWrap', {read: BlocksStyleDirective})
  blockDirective: BlocksStyleDirective;

  @ViewChild('tourWrap')
  tourWrap: ElementRef;

  ngOnInit(): void {

    this.tourUnsubscriberFullTicketList = this.ticketsService.ticketUpdateSubject$.subscribe((data) => {
      this.setTickets(data);
    });

    this.tourUnsubscriber = this.ticketsService.ticketType$.subscribe((data: ITourTypeSelect) => {
      // let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsAll.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsAll.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsAll];
          break;
      }

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue', dateValue)
        this.tickets = this.ticketsAll.filter((el) => el.date === dateValue);
      }
    });
    this.updateTickets()

    setTimeout(() => {

      this.blockDirective.updateItems();
      setTimeout(() => {
        this.blockDirective.initStyle(1);  // сбрасываем индекс на 0 элемент
      })
    }, 1000);
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(
      this.ticketSearch.nativeElement,
      'keyup',
      {passive: true}
    );

    this.searchTicketSub = fromEventObserver
      .pipe(debounceTime(200))
      .subscribe(() => {
        if (this.ticketSearchValue) {
          this.tickets = this.ticketsAll
            .filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
        } else {
          this.tickets = [...this.ticketsAll];
        }
      });

  }

  public updateTickets() {
    this.ticketsService.getTickets().subscribe(
      (data) => {
        this.setTickets(data)
      }
    )
  }

  private setTickets(tickets: ITour[]) {
    this.tickets = tickets;
    this.ticketsAll = [...this.tickets];
    // this.ticketStorage.setStorage(tickets);
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`tickets/ticket/${item._id}`]);
  }

  directiveRenderComplete() {
    this.blockDirective.initStyle(1);
    setTimeout(() => {
      this.blockLoaded = true;
    });
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
  }

  ngOnChanges(ev: SimpleChanges): void {
    console.log('change')
    this.updateTickets();
  }
}
