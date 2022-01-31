import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ElementRef,
  ViewChild,
  Inject,
} from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
import { MapaService } from 'src/app/services/maps/mapa.service';
const { Geolocation } = Plugins;

declare var google: any;

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss'],
})
export class GooglemapsComponent implements OnInit {
  
  // Coordenadas principales
  @Input() posicion = {
    lat: -2.891918747370772,
    lng: -78.9670348606935,
  };

  label = {
    titulo: 'Ubicación',
    subtitulo: 'Mi ubicación actual',
  };

  map: any;
  marker: any;
  infowindow: any;
  positionSet: any;

  @ViewChild('map') divMap: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private googlemapsService: MapaService,
    public modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.init();
    console.log('position ->', this.posicion);
  }

  async init() {
    this.googlemapsService
      .init(this.renderer, this.document)
      .then(() => {
        this.initMap();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initMap() {
    const posicion = this.posicion;

    let latLng = new google.maps.LatLng(posicion.lat, posicion.lng);

    let mapOpciones = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: false,
      clickableIcons: true,
    };

    this.map = new google.maps.Map(this.divMap.nativeElement, mapOpciones);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false,
    });
    this.clickHandleEvent();
    this.infowindow = new google.maps.InfoWindow();
    //if (this.label.titulo.length) {
    this.addMarker(posicion);
    /*let content = this.label.titulo;
    console.log(content);*/
    this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
    // }
  }

  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const posicion = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.addMarker(posicion);
    });
  }

  addMarker(posicion: any): void {
    let latLng = new google.maps.LatLng(posicion.lat, posicion.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(posicion);
    this.positionSet = posicion;
  }

  /*setInfoWindow(marker: any, content: string) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    infoWindow.open(this.map, marker, content);
  }*/

  setInfoWindow(marker: any, titulo: string, subtitulo: string) {

    const contentString  =  '<div id="contentInsideMap">' +
                            '<div>' +
                            '</div>' +
                            '<p style="font-weight: bold; margin-bottom: 5px; color : black">' + titulo + '</p>' +
                            '<div id="bodyContent">' +
                            '<p class"normal m-0 style="color : black">'
                            + subtitulo + '</p>' +
                            '</div>' +
                            '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);

}

  async mylocation() {
    console.log('mylocation() click');

    Geolocation.getCurrentPosition().then((res) => {
      console.log('mylocation() -> get ', res);

      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      };
      this.addMarker(position);
    });
  }

  aceptar() {
    console.log('click aceptar -> ', this.positionSet);
    this.modalController.dismiss({ pos: this.positionSet });
  }
}
