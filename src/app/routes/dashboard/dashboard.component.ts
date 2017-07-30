import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.dataService.getFiles()
    //   .subscribe(
    //     data => this.files = data
    //   );
  }

}
