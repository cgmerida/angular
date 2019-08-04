import { Injectable } from '@angular/core';

import { Leader } from "../shared/Leader";
import { LEADERS } from "../shared/Leaders";

import { Observable, of } from 'rxjs';
import { delay, catchError, map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseUrl } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {

  constructor(private http: HttpClient,
    private processHttpMsg: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseUrl + 'leadership/')
    .pipe(catchError(this.processHttpMsg.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseUrl + 'leadership/' + id)
      .pipe(catchError(this.processHttpMsg.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseUrl + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHttpMsg.handleError));
  }
}
