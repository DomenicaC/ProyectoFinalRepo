import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Principal', url: 'principal', icon: 'home' },
    { title: 'Agrega tu lugar', url: 'lugares', icon: 'paper-plane' },
    { title: 'Mapa General', url: 'mapa-general', icon: 'map' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
