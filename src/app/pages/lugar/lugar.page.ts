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
  selector: 'app-lugar',
  templateUrl: './lugar.page.html',
  styleUrls: ['./lugar.page.scss'],
})
export class LugarPage implements OnInit {
  titulo: string;
  desCorta: string;
  desLarga: string;
  dueno: string;
  ubicacion: null;
  imgUrl: string;
  lugares: any;

  lugar: Lugar = new Lugar();

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
    private lugarService: LugarService,
    private mapaService: MapaService
  ) {
    /*route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.lugar = this.router.getCurrentNavigation().extras.queryParams.lugar;
      }
    });

    route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.mapa = this.router.getCurrentNavigation().extras.queryParams.mapa;
        console.log(this.mapa);
      }
    });*/
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      //console.log(params);
      //this.nombre = params.nombre;

      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.lugar =
          this.router.getCurrentNavigation().extras.queryParams.lugar;
        console.log(this.lugar);
      }
    });

    /*this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.mapa = this.router.getCurrentNavigation().extras.queryParams.mapa;
        console.log(this.mapa);
      }
    });*/
    this.posicion = this.lugar.ubicacion;

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
    this.addMarker(posicion);
    this.infowindow = new google.maps.InfoWindow();
    // this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
  }

  setInfoWindow(marker: any, lat: number, lng: number) {
    const contentString =
      '<div id="contentInsideMap" >' +
      '<div>' +
      '</div>' +
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

  addMarker(posicion: any): void {
    let latLng = new google.maps.LatLng(posicion.lat, posicion.lng);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: false,
    });
    this.infowindow = new google.maps.InfoWindow();

    this.setInfoWindow(this.marker, posicion.lat, posicion.lng);
    this.marker.setPosition(latLng);
    this.map.panTo(posicion);
    this.positionSet = posicion;
    console.log('posicion ', this.positionSet);
  }

  trazarRuta() {
    console.log('llego para trazar la ruta');
  }
}
