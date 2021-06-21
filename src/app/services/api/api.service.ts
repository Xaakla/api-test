import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";
import {UserInterface} from "../../interfaces/user-interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API: string = environment.API;

  constructor(private http: HttpClient) { }

  list(results: number) {
    return this.http.get<UserInterface>(this.API, { params: {page: 1, results, inc: "name, login, picture"} })
      .pipe(take(1));
  }
}
