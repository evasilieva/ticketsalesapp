import {Component, OnInit} from '@angular/core';
import {IOrder} from "@models/order";
import {TicketsService} from "@service/tickets/tickets.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  cols = [
    {field: 'tourId', header: 'Tour ID'},
    {field: 'age', header: 'Age'},
    {field: 'cardNumber', header: 'cardNumber'},
    {field: 'birthDay', header: 'birthDay'},
  ];

  orders: IOrder[];
  private orderUnsubscriber: Subscription;

  constructor(
    private ticketsService: TicketsService,
  ) {
  }

  ngOnInit(): void {
    console.log('init');
    this.orderUnsubscriber = this.ticketsService.orderUpdateSubject$.subscribe((data) => {
      this.setOrders(data);
    });

    this.ticketsService.getUserOrders().subscribe((data: IOrder[]) => {
      this.ticketsService.updateUserOrders(data)
    })
  }

  private setOrders(tickets: IOrder[]) {
    this.orders = tickets;
  }
}
