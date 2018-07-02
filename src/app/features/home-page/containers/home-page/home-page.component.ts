import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../shared/services/config/config.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor( private _conf: ConfigService ) { }

  ngOnInit() {
  }

}
