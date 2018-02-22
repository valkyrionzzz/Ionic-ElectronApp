import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthenticationProvider {
  public user: Observable <any>;

   constructor(public http: HttpClient, private angularfireauth: AngularFireAuth ) {
      this.user= this.angularfireauth.authState;
   }
   loginWithEmailAndPassword( email: string, password: string) : Promise <any> {
      return new Promise( (resolve, reject) => {
         this.angularfireauth.auth.signInWithEmailAndPassword(email, password)
         .then((val : any) => {
            resolve();
         })
         .catch((err : any) => {
            reject(err);
         });
      });
   }

   // signUpWithEmailAndPassword( email: string, password: string) : Promise <FirebaseAuthState>{
   //   return new Promise( (resolve, reject) => {
   //     this.angularfireauth.auth.createUser({
   //       email: user.email,
   //       password: user.password
   //     })
   //     .then( (authState: FirebaseAuthState) => {
   //       resolve();
   //     })
   //     .catch( (error: any ) => {
   //       reject( error );
   //     });
   //   });
   // }

   logOut() : Promise <any> {
      return new Promise((resolve, reject) => {
         this.angularfireauth.auth.signOut()
         .then((data : any) => {
            resolve(data);
         })
         .catch((error : any) => {
            reject(error);
         });
      });
   }
}
