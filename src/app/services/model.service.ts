import { Injectable } from '@angular/core';
import {filter, map, Observable, pipe, tap} from "rxjs";
import {OptionModel} from "../models/options.model";
import {HttpClient} from "@angular/common/http";
import {ModelModel} from "../models/model.model";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) {
  }

  getAllModels(): Observable<ModelModel[]> {
    return this.http.get<ModelModel[]>('/models');
  }
}
