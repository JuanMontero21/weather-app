import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { Weather } from '../models/weather.model';
import { City } from '../models/city.model';


describe('WeatherService', () => {
  let service: WeatherService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [WeatherService, HttpClient]
    });
    service = TestBed.inject(WeatherService);   
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should returns an Observable with weather of cities status from city name using http get response', () => {
    
    const weatherCityFromServe: Weather = {
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
    const cities: City[] = [{ name: 'Cadiz'}, {name: 'Madrid' }];
    httpClientSpy.get.and.returnValue(weatherCityFromServe);
    service.getWeatherByCityName(cities).subscribe(response =>{
          expect(response).toEqual(weatherCityFromServe, 'expected weather')
    })
  });
});
