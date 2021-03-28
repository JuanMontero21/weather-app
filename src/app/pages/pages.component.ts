import { Component, OnChanges, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { WeatherService } from '../services/weather.service';

// Models
import { City } from '../models/city.model';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, OnChanges {

  public cities: City[];
  public cityWeather: Weather;

  constructor( private citiesService: CitiesService,
              private weatherService: WeatherService 
              ) { }

  // TODO: Posiblemente este no sea el hook a utilizas ngOnChange ??
  ngOnInit(): void {
    // const cityResponse = this.citiesService.getCities()
    //   .subscribe( (resp: City[]) => {
    //     this.cities = resp;
    //     console.log(this.cities);
    //   });

    // const weatherResponse = this.weatherService.getWeatherByCityName(this.cities[0].name)
    // .subscribe (resp => {
    //   console.log(resp);
    // })

    this.citiesService.getCities()
      .subscribe( (resp: City[]) => {
        this.cities = resp;
        console.log(this.cities);
        // TODO: Llamar al servicio weather cada 15 segundos con una ciudad aleatoria diferente cada vez
        this.weatherService.getWeatherByCityName(this.cities)
        .subscribe ((resp: Weather) => {
          this.cityWeather = resp;
          console.log(this.cityWeather);
          // TODO: logica para sacar el alert con el aviso del criterio
        })
      });
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.cities);
  }

}
