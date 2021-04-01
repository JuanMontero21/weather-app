import { Component, OnDestroy, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { WeatherService } from '../services/weather.service';

// Models
import { City } from '../models/city.model';
import { Weather } from '../models/weather.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, OnDestroy {

  public cities: City[];
  public cityWeather: Weather;
  public days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public today = {name: '', dayNumber: ''};
  public icon = '';
  private citiesSubscription: Subscription;
  private weatherSubscription: Subscription;

  constructor( private citiesService: CitiesService,
              private weatherService: WeatherService 
              ) { 
                let day = new Date();
                this.today.name = this.days[day.getDay()];
                console.log(day.getMonth);
                this.today.dayNumber = `${day.getDate()} ${this.months[day.getMonth()]}`
              }

  ngOnInit(): void {

    this.citiesSubscription = this.citiesService.getCities()
      .subscribe( (resp: City[]) => {
        this.cities = resp;
        console.log(this.cities);
        this.callWeatherService(this.cities);
      }, error => {
        console.error('Error: ', error);
      });
  }

  callWeatherService(cities: City[]){
    this.weatherSubscription = this.weatherService.getWeatherByCityName(this.cities)
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
    }, error =>{
      console.error('Error :', error)
    });
  }

  recursive(cities: City[]){
    setTimeout(()=>{
      this.callWeatherService(cities);
    }, 15000);
  };

  ngOnDestroy(): void {
    this.citiesSubscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
    
  }

}
