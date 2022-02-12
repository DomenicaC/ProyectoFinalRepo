import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/shared/user.interface';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;
  constructor(
    public authFire: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
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

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.authFire.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error login with Google -> ', error);
    }
  }

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

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.authFire.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error Login -> ', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authFire.signOut();
    } catch (error) {
      console.log('Error Logout -> ', error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };
    return userRef.set(data, { merge: true });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }
}
