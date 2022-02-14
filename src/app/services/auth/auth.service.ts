import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/user.interface';
import { switchMap } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;
  constructor(
    public authFire: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user$ = authFire.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.authFire.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error Logout -> ', error);
    }
  }

  // Sign in with Gmail
  loginGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider) {
    return this.authFire
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.redirigir();
          //this.router.navigate(['principal']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      estado: user.estado || 'n',
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  /*
  async loginGoogle() {
    const credential = await this.authFire.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    console.log(credential.user);

    let user = JSON.parse[JSON.stringify(credential.user)];
    console.log(user);
  }*/

  register(email, password) {
    return this.authFire.createUserWithEmailAndPassword(email, password);
  }

  async sendVerificationEmail() {
    return (await this.authFire.currentUser)
      .sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  /*async login(email: string, password: string): Promise<User> {
    try {
      const  user  = await this.authFire.signInWithEmailAndPassword(
        email,
        password
      );
      this.SetUserData(user);
      return user;
    } catch (error) {
      console.log('Error Login -> ', error);
    }
  }*/

  login(email: string, password: string) {
    return this.authFire
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // if (this.isEmailVerified) {
        this.ngZone.run(() => {
          this.redirigir();
          //this.router.navigate(['principal']);
        });
        this.SetUserData(result.user);
        /*   } else {
          window.alert(
            'Su Email no ha sido verificado, por favor verifique su correo electronico'
          );
          return false;
        }*/

        //return result.user;
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async logout(): Promise<void> {
    try {
      await this.authFire.signOut();
      this.router.navigate(['inicio-sesion']);
    } catch (error) {
      console.log('Error Logout -> ', error);
    }
  }

  redirigir() {
    let params: NavigationExtras = {
      queryParams: {
        user: this.user$,
      },
    };
    // llamar a la otra pagina
    this.router.navigate(['principal'], params);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }

  /*private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      estado: user.estado,
    };
    return userRef.set(data, { merge: true });
  }*/
}
