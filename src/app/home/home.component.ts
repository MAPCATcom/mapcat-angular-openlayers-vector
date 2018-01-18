import { Component, OnInit} from '@angular/core';
import * as olms from 'ol-mapbox-style';

global.Buffer = global.Buffer || require('buffer').Buffer;

const mapview = require ('../../../node_modules/@mapcat/mapview-init/src/mapcat-mapview-init.js');


@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  config: any;
  isTileUrlLoaded: boolean = false;

  private getViewUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      mapview.initVectorView((error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }, 'jM9oGlsfWxOOYYF0kvuq2UbYl3XrVuUzJmwfnB6M', null, {styleSheet: "openlayers"});
    });
  };
  
  public ngOnInit(): any {
    this.getViewUrl().then( style => {
        let olmap =  olms.apply('map', style);
    }).catch( error => {
      console.log('error');
      if (error.message) {
        alert (error.message);
      } else {
        alert (error);
      }
    });
  };
}
