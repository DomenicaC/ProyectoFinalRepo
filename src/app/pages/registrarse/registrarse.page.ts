import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/dominio/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
  nombres: string;
  direccion: string;
  telefono: any;
  correo: any;
  contrasenia: any;
  estado: 'free';

  usuario: Usuario = new Usuario();

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

  onRegister(email, password) {
    this.authService
      .register(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.sendVerificationEmail();
        this.router.navigate(['verify-email']);
        this.presentConfirm();
      })
      .catch((error) => {
        window.alert(error.message);
      });
    /* console.log('Email ', email);
    console.log('password ', password);*/
  }

  async presentConfirm() {
    let alert = this.alertCtrl.create({
      //title: 'Confirm purchase',
      message: '¿Quieres que tus caldos sean mejores?, Utiliza cubitos maggie',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ir a la pagina',
          handler: () => {
            console.log('ir');
          }
        }
      ]
    });
    (await alert).present();
  }
}
