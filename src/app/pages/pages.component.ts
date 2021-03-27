import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';

import { City } from '../models/city.model';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public cities: City[];

  constructor( private citiesService: CitiesService,
              private weatherService: WeatherService 
              ) { }


  ngOnInit(): void {
    // const cityResponse = this.citiesService.getCities()
    //   .subscribe( (resp: City[]) => {
    //     this.cities = resp;
    //     console.log(this.cities);
    //     // TODO: Mezclar el array de forma aleatoria
    //   });

    // const weatherResponse = this.weatherService.getWeatherByCityName(this.cities[0].name)
    // .subscribe (resp => {
    //   console.log(resp);
    // })

    this.citiesService.getCities()
      .subscribe( (resp: City[]) => {
        this.cities = resp;
        console.log(this.cities);
        // TODO: Mezclar el array de forma aleatoria
        // TODO: Llamar al servicio weather cada 15 segundos con una ciudad aleatoria diferente cada vez
        this.weatherService.getWeatherByCityName(this.cities[0].name)
        .subscribe (resp => {
          console.log(resp);
        })
      });
  }

}
