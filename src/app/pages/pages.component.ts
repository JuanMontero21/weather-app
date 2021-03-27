import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';

import { City } from '../models/city.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public cities: City[];

  constructor( private citiesService: CitiesService) { }


  ngOnInit(): void {
    this.citiesService.getCities()
      .subscribe( (resp: City[]) => {
        this.cities = resp;
        console.log(this.cities);
      })
  }

}
