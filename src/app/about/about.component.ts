import { Component, OnInit } from '@angular/core';

import { Leader } from "../shared/Leader";
import { LeadersService } from '../services/leaders.service';
import { flyInOut, expand } from '../animations/app.animation';
import { baseUrl } from '../shared/baseurl';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string;
  BaseUrl = baseUrl;

  constructor(private leaderService: LeadersService) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(
        leader => this.leaders = leader,
        errmess => this.errMess = errmess
        );
  }

}
