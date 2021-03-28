import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Weather } from '../models/weather.model';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

const base_url = environment.base_url_api;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor( private http: HttpClient ) { }

  getWeatherByCityName(cities: City[]): Observable<Weather> {
    const _CITIES = cities;
    const _APPID = 'aae97860de78632108ecc73036d6d17c';
    let city: string;
    for (let item = 0; item < _CITIES.length; item++) {
      city = _CITIES[Math.floor(Math.random() * _CITIES.length)].name;
    }
    console.log(city);
    const _URL = `${ base_url }?q=${city}&appid=${_APPID}&units=metric`;
    return this.http.get( _URL)
              .pipe(
                map( (resp: Weather) => resp )
              );
  }
}
