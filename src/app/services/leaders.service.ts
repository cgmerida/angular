import { Injectable } from '@angular/core';

import { Leader } from "../shared/Leader";
import { LEADERS } from "../shared/Leaders";

@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  constructor() { }

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string): Leader {
    return LEADERS.filter(leader => leader.id === id)[0];
  }

  getFeaturedLeader(): Leader {
    return LEADERS.filter(leader => leader.featured)[0];
  }
}
