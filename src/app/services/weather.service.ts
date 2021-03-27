import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url_api;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor( private http: HttpClient ) { }

  getWeatherByCityName(name: string) {

    const _CITY = name;
    const _APPID = 'aae97860de78632108ecc73036d6d17c';
    const _URL = `${ base_url }?q=${_CITY}&appid=${_APPID}`;
    return this.http.get( _URL)
              .pipe(
                map( (resp: any) => resp )
              );
  }
}
