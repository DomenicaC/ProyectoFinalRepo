import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lugar } from 'src/app/dominio/lugar';
import { LugarService } from 'src/app/services/lugar/lugar.service';
import { MapaService } from 'src/app/services/maps/mapa.service';

declare var google;

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.page.html',
  styleUrls: ['./lugar.page.scss'],
})
export class LugarPage implements OnInit {
  datos: any;
  map: any;

  marker: any;
  infowindow: any;
  positionSet: any;
  markers: [];

  mapa: Lugar;

  @Input() posicion = {
    lat: -2.891918747370772,
    lng: -78.9670348606935,
  };

  label = {
    titulo: 'Ubicacion',
    subtitulo: 'Mi ubicacion actual',
  };

  @ViewChild('map') divMap: ElementRef;

  dato: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private lugarService: LugarService,
    private mapaService: MapaService
  ) {
    route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.dato = this.router.getCurrentNavigation().extras.queryParams.dato;
      }
    });

    route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.mapa = this.router.getCurrentNavigation().extras.queryParams.mapa;
        console.log(this.mapa);
      }
    });
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.mapaService
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

    this.cargarMarcador();
    this.infowindow = new google.maps.InfoWindow();
    // this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
  }

  setInfoWindow(marker: any, referencia: string, lat: number, lng: number) {
    const contentString =
      '<div id="contentInsideMap" >' +
      '<div>' +
      '</div>' +
      '<p style="font-weight: bold; margin-bottom: 5px; color:black" >  Referencia: ' +
      referencia +
      '</p>' +
      '<div id="bodyContent" >' +
      '<p class"normal m-0" style="color : black"> Latitud: ' +
      lat +
      '</p>' +
      '</div>' +
      '</div>' +
      '<p class"normal m-0" style="color : black"> Longitud: ' +
      lng +
      '</p>' +
      '</div>' +
      '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  }

  cargarMarcador() {
    this.datos.forEach((marker1: any) => {
      for (let i = 0; i < marker1.length; i++) {
        const posicion = {
          referencia: marker1[i].referencia,
          lat: marker1[i].ubicacion.lat,
          lng: marker1[i].ubicacion.lng,
        };
        this.addMarker(posicion);
        console.log(posicion);
      }
    });
  }

  addMarker(posicion: any): void {
    let latLng = new google.maps.LatLng(posicion.lat, posicion.lng);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    this.infowindow = new google.maps.InfoWindow();

    this.setInfoWindow(
      this.marker,
      posicion.referencia,
      posicion.lat,
      posicion.lng
    );
    this.marker.setPosition(latLng);
    this.map.panTo(posicion);
    this.positionSet = posicion;
    //console.log('posicion ', this.positionSet);
  }

  trazarRuta() {
    console.log('llego para trazar la ruta');
  }
}
