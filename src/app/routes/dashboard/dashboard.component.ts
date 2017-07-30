import { Component, OnInit } from '@angular/core';

import { DataService } from 'app/shared/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formDisabled: boolean = false;
  submitted: boolean = false;
  linkTitle: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  addRedirect(title, url) {
    
    if(!title) title = this.uniqueId;

    if(title && url) {
      this.formDisabled = true;

      this.dataService.post('/redirects', { title: title, url: url })
        .subscribe(res => {
          console.log(res);
          this.submitted = true;
          this.linkTitle = res.title;
        });
    }

  }

  get uniqueId() {
    return Math.random().toString(36).substr(2, 16);
  }

}
