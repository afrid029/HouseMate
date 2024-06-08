import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private data: DataServiceService) { }

  async ngOnInit() {
    (await this.data.getAllRelays(localStorage.getItem('uid'))).subscribe((data : any) =>{

      

    })
  }

}
