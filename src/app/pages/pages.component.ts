import { Component, OnInit } from '@angular/core';
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
export class PagesComponent implements OnInit {

  public cities: City[];
  public cityWeather: Weather;
  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public today = {name: '', dayNumber: ''};
  public icon = '';

  constructor( private citiesService: CitiesService,
              private weatherService: WeatherService 
              ) { 
                let day = new Date();
                this.today.name = this.days[day.getDay()];
                console.log(day.getMonth);
                this.today.dayNumber = `${day.getDate()} ${this.months[day.getMonth()]}`
              }

  ngOnInit(): void {

    this.citiesService.getCities()
      .subscribe( (resp: City[]) => {
        this.cities = resp;
        console.log(this.cities);
        this.callWeatherService(this.cities);
      });
  }

  callWeatherService(cities: City[]){
    this.weatherService.getWeatherByCityName(this.cities)
    .subscribe ((resp: Weather) => {
      this.cityWeather = resp;
      console.log(this.cityWeather);
      this.icon = `http://openweathermap.org/img/wn/${this.cityWeather.weather[0].icon}@2x.png`
      if((this.cityWeather.main.temp > 8 && this.cityWeather.main.temp < 28) && 
          this.cityWeather.main.humidity > 70) {
        // window.alert(`Alert in ${this.cityWeather.name} city`);
        console.log(`Alert in ${this.cityWeather.name} city`);
      }
      this.recursive(cities);
    })
  }

  recursive(cities: City[]){
    setTimeout(()=>{
      this.callWeatherService(cities);
    }, 15000);
  };

  // TODO: onDestroy

}
