import { Component, OnInit } from '@angular/core';

import { DataService } from 'app/shared/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  login(username, password) {
    // this.dataService.login(username, password);
  }

}
