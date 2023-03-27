import {Component, OnInit} from '@angular/core';
import {TicketsService} from "@service/tickets/tickets.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;

  constructor(private ticketsService: TicketsService) {
  }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', {validators: Validators.required}),
      tourOperator: new FormControl(''),
      price: new FormControl(''),
      file: new FormControl(''),
    });
  }

  createTour() {
    const tourRawData = this.tourForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourRawData === 'object') {
      for (let prop in tourRawData) {
        formParams.append(prop, tourRawData[prop]);
      }
    }

    this.ticketsService.createTour(formParams).subscribe();
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.tourForm.patchValue({
        file: file
      });
    }
  }
}
