import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class MapaService {
  apiKey = 'AIzaSyC20FcmsNJsDTkv_Nla590WrqXCq1RfcSc';
  mapsLoaded = false;

  constructor() {}

  init(renderer: any, document: any): Promise<any> {
    return new Promise((resolve) => {
      if (this.mapsLoaded) {
        console.log('El mapa a sido cargado previamente');
        resolve(true);
        return;
      }

      const script = renderer.createElement('script');
      script.id = 'googlemaps';

      window['mapInit'] = () => {
        this.mapsLoaded = true;
        if (google) {
          console.log('Google a sido cargado');
        } else {
          console.log('Google no a sido cargado');
        }
        resolve(true);
        return;
      };

      if (this.apiKey) {
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=' +
          this.apiKey +
          '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      renderer.appendChild(document.body, script);
    });
  }
}
