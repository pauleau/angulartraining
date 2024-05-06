import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
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
