import { Injectable } from '@angular/core';

import { Leader } from "../shared/Leader";
import { LEADERS } from "../shared/Leaders";

@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter(leader => leader.id === id)[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter(leader => leader.featured)[0]);
  }
}
