import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OptionModel} from "../models/options.model";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private http: HttpClient) {
  }

  get(optionId: string): Observable<OptionModel> {
    return this.http.get<OptionModel>('/options/' + optionId.toUpperCase().trim());
  }
}
