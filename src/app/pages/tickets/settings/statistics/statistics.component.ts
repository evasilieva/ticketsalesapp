import {Component, OnInit} from '@angular/core';
import {ICustomStatisticUser} from "@models/statistic";
import {StatisticService} from "@service/statistic/statistic.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  cols = [
    // { field: 'id', header: 'ID' },
    {field: 'name', header: 'Name'},
    {field: 'company', header: 'Company'},
    {field: 'phone', header: 'Phone'},
    {field: 'city', header: 'City'},
    {field: 'street', header: 'Street'},
  ];

  users: ICustomStatisticUser[];

  constructor(
    private statisticService: StatisticService,
  ) {

  }

  ngOnInit(): void {
    this.statisticService.getStatistic().subscribe((data: ICustomStatisticUser[]) => {
      this.users = data;
    });
  }

}
