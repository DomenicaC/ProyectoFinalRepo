import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {
  mapRef = null;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  myLatLng;
  destination; // = { lat: -2.865295534816754, lng: -78.96992861287067 };

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.destination =
          this.router.getCurrentNavigation().extras.queryParams.posicion;
      }
    });
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const rta = await this.geolocation.getCurrentPosition();
    this.myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude,
    };

    console.log(this.myLatLng);

    const mapEl: HTMLElement = document.getElementById('map');

    this.mapRef = new google.maps.Map(mapEl, {
      center: this.myLatLng,
      zoom: 12,
    });

    this.directionsDisplay.setMap(this.mapRef);
    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      //comienza a hacer todo el calculo
      //this.addMarker(this.myLatLng.lat, this.myLatLng.lng);
      this.calcularRutaOptima();
    });
  }

  private calcularRutaOptima() {
    this.directionsService.route(
      {
        origin: this.myLatLng,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else {
          alert('hay problemas con: ' + status);
        }
      }
    );
  }

  private addMarker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
      zoom: 8,
      map: this.mapRef,
      title: 'hello word',
    });
  }
}
