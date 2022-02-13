import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Lugar } from 'src/app/dominio/lugar';

declare var google;

@Component({
  selector: 'app-mapa-general',
  templateUrl: './mapa-general.page.html',
  styleUrls: ['./mapa-general.page.scss'],
})
export class MapaGeneralPage implements OnInit {

  

  constructor() { }

  ngOnInit() {
  }

}
