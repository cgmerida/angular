import { Injectable } from '@angular/core';

import { Dish } from "../shared/dish";

import { Observable, of } from 'rxjs';
import { delay, map } from "rxjs/operators";

import { HttpClient } from '@angular/common/http';
import { baseUrl } from "../shared/baseurl";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseUrl + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseUrl + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseUrl + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}
