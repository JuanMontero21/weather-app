import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CitiesService } from '../services/cities.service';

import { PagesComponent } from './pages.component';
import { WeatherService } from '../services/weather.service';
import { City } from '../models/city.model';
import { Weather } from '../models/weather.model';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let citiesService = new CitiesService(null);
  let weatherService = new WeatherService(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesComponent ],
      providers: [CitiesService, WeatherService, HttpClient, HttpHandler]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    citiesService = TestBed.inject(CitiesService);
    weatherService = TestBed.inject(WeatherService);
  });

  afterEach(() => {
    citiesService = null;
    weatherService = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Init: Should call to cities service and then call to weather service', async () => {

    const response: City[] = [{name: 'Cadiz'}, {name: 'Madrid'}];

    spyOn(citiesService, 'getCities').and.returnValue(of(response))
  
    component.getCities();
  
    fixture.detectChanges();
  
    expect(component.cities).toEqual(response);
  })

  it('Should call to weather service and call recursive', async () => {

    const cities: City[] = [{name: 'Cadiz'}, {name: 'Madrid'}];

    const response: Weather = {
      coord: {
        lon: -78.5249,
        lat: -0.2299
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04n'
        }
      ],
      base: 'stations',
      main: {
        temp: 14,
        feels_like: 13.91,
        temp_min: 14,
        temp_max: 14,
        pressure: 1023,
        humidity: 94
      },
      visibility: 10000,
      wind: {
        speed: 0.51,
        deg: 10
      },
      clouds: {
        all: 90
      },
      dt: 1617355949,
      sys: {
        type: 1,
        id: 8555,
        country: 'EC',
        sunrise: 1617362049,
        sunset: 1617405639
      },
      timezone: -18000,
      id: 3652462,
      name: 'Quito',
      cod: 200
    };

    spyOn(weatherService, 'getWeatherByCityName').and.returnValue(of(response))
  
    component.callWeatherService(cities);
  
    fixture.detectChanges();
  
    expect(component.cityWeather).toEqual(response);
  })

});
