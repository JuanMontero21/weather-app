import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CitiesService } from './cities.service';
import { City } from '../models/city.model';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [CitiesService, HttpClient]
    });   
    service = TestBed.inject(CitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should returns header from get headers function', () => {
    const header = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    expect(service.headers).toEqual(header);
  });

  it('should returns an Observable with cities service using http post response', () => {
    const expectedCities: City[] =
    [{ name: 'Cadiz'}, {name: 'Madrid' }];
    httpClientSpy.get.and.returnValue(expectedCities);
    service.getCities().subscribe(
      cities => expect(cities).toEqual(expectedCities, 'expected cities'),
      fail
    );
  });
});
