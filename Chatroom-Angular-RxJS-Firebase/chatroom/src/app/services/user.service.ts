import { Router } from "@angular/router";
import {Injectable} from '@angular/core';
import { IUserService } from "./IUserService";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import {Observable, of} from "rxjs";
import {first, switchMap} from "rxjs/operators";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {
  private user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object(`users/${user.displayName}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  get user(): Promise<any> {
    return this.user$.pipe(first()).toPromise();
  }

  get uid(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  get displayName(): string {
    return this.afAuth.auth.currentUser.displayName;
  }

  async logout(): Promise<void> {
    return await this.afAuth.auth.signOut();
  }

  async login(email: string, password: string): Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['chatroom']));
  }

  async register(email: string, password: string, displayName: string): Promise<boolean> {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.auth.currentUser.updateProfile({displayName: displayName});
        this.createUserInDB(displayName, this.afAuth.auth.currentUser.uid);
      })
      .then(() => this.router.navigate(['chatroom']));
  }

  private async createUserInDB(displayName: string, uid: string): Promise<void> {
    return this.db.object(`users/${displayName}`).set({
      uid: uid
    })
  }
}
