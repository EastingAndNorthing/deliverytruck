import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from 'app/shared/services/data.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  timeout: number = 2000;
  linkStatus: number = 0;
  url: string;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params => {
      
      const id = params['id'];
      
      this.dataService.get(`/redirects/${id}`)
        .subscribe(data => {
          if(data !== null) {

            this.linkStatus = 1;
            this.url = data.url;

            setTimeout(() => window.location.href = data.url, this.timeout);

          } else {
            this.linkStatus = -1;
          }
        });
        
    });
  }

}
