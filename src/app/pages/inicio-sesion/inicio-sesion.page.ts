import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/dominio/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  nombres: string;
  direccion: string;
  telefono: any;
  correo: any;
  contrasenia: any;
  estado: any;

  usuario: Usuario = new Usuario();
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      //console.log(params);
      //this.nombre = params.nombre;

      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.usuario =
          this.router.getCurrentNavigation().extras.queryParams.usuario;
        console.log(this.usuario);
      }
    });
  }

  login(email, password) {
    try {
      const user = this.authService.login(email.value, password.value);
      if (user) {
        console.log('User ---> ', user);
        // Verificar email
        this.presentConfirm();
      }
    } catch (error) {
      console.log('Error en page login', error);
    }
  }

  async presentConfirm() {
    let alert = this.alertCtrl.create({
      message:
        '¿Quieres que te enviemos notificaciones cada que se agregue un lugar?',
      inputs: [
        {
          name: 'Correo',
          placeholder: 'Correo al que quiere que enviemos la subcripcion',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Subcribirme',
          handler: () => {
            console.log('ir');
          },
        },
      ],
    });
    (await alert).present();
  }

  loginGoogle() {
    try {
      const user = this.authService.loginGoogle();
      if (user) {
        console.log('User ---> ', user);
        // Verificar email
        //this.redirigir();
      }
    } catch (error) {
      console.log('Error en page login google', error);
    }
  }
}
