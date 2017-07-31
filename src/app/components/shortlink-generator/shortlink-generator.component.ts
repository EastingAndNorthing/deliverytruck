import { Component, OnInit } from '@angular/core';

import { DataService } from 'app/shared/services/data.service';
import { Redirect } from 'app/shared/models';

@Component({
  selector: 'app-shortlink-generator',
  templateUrl: './shortlink-generator.component.html',
  styleUrls: ['./shortlink-generator.component.scss']
})
export class ShortlinkGeneratorComponent implements OnInit {
  
  baseUrl: string = window.location.origin;
  linkTitle: string;
  generatedLink: string;
  submitted: boolean = false;
  redirectModel: Redirect = new Redirect('', '');

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmit(title, url) {

    this.submitted = true;
    
    if(!title) title = this.uniqueId;

    if(title && url) {
      // this.formDisabled = true;

      this.dataService.post('/redirects', { title: title, url: url })
        .subscribe(res => {
          console.log(res);
          this.submitted = true;
          this.linkTitle = res.title;
          this.generatedLink = `${this.baseUrl}/go/${this.linkTitle}`
        });
    }

  }

  get uniqueId() {
    return Math.random().toString(36).substr(2, 16);
  }

}
