import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';


const _BASE_URL = environment.base_url_SandBox;

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor( private http: HttpClient ) { }

  get headers() {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  getCities() {

    const URL = `${ _BASE_URL }/cities`;
    return this.http.get( URL, this.headers )
              .pipe(
                map( (resp: {ok: boolean, cities: City[] }) => resp.cities )
              );
  }
}
