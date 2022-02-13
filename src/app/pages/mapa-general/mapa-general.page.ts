import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lugar } from 'src/app/dominio/lugar';
import { LugarService } from 'src/app/services/lugar/lugar.service';
import { MapaService } from 'src/app/services/maps/mapa.service';

declare var google;

@Component({
  selector: 'app-mapa-general',
  templateUrl: './mapa-general.page.html',
  styleUrls: ['./mapa-general.page.scss'],
})
export class MapaGeneralPage implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private googlemapsService: MapaService,
    private mapaServices: LugarService
  ) {
    route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.mapa = this.router.getCurrentNavigation().extras.queryParams.mapa;
        console.log(this.mapa);
      }
    });
  }

  ngOnInit() {
    this.datos = this.mapaServices.getMapas();
    console.log('Datos ', this.datos);

    this.init();
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

    this.cargarMarcador();
    this.infowindow = new google.maps.InfoWindow();
    // this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
  }

  setInfoWindow(marker: any, titulo: string, lat: number, lng: number) {
    const contentString =
      '<div id="contentInsideMap" >' +
      '<div>' +
      '</div>' +
      '<p style="font-weight: bold; margin-bottom: 5px; color:black" >  Lugar: ' +
      titulo +
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
          titulo: marker1[i].titulo,
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
      draggable: false,
    });
    this.infowindow = new google.maps.InfoWindow();

    this.setInfoWindow(
      this.marker,
      posicion.titulo,
      posicion.lat,
      posicion.lng
    );
    this.marker.setPosition(latLng);
    this.map.panTo(posicion);
    this.positionSet = posicion;
    //console.log('posicion ', this.positionSet);
  }
}
