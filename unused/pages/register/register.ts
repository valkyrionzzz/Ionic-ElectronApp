import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';


import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { TcmodalPage } from '../tcmodal/tcmodal';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private email: string;
  private password: string;
  private tnc_accept: boolean;
  private validation = {email: boolean,password: boolean,tnc: boolean};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private firebaseprovider: FirebaseProvider)
  {
    //initialise stuff here
  }

  goLogin(){
    //go to login page
    this.navCtrl.setRoot( LoginPage );
  }
  showTC(){
    //show TcmodalPage as a modal
    let md = this.modalCtrl.create( TcmodalPage );
    md.present();
  }
  registerUser(){
    //do some validation
    if(!this.email ){
      this.validation.email = {status: false, msg: 'email cannot be empty'}
    }
    else{
      this.validation.email = {status: true, msg: ''};
    }

    if(!this.password || this.password.length < 6){
      this.validation.password = {status: false, msg: 'password minimum 6 characters'};
    }
    else{
      this.validation.password = {status: true, msg: ''};
    }

    if(!this.tnc_accept){
      this.validation.tnc = {status: false, msg: 'you must accept terms and conditions'};
    }
    else{
      this.validation.tnc = {status: true, msg: ''};
    }

    //check validation
    if(this.validation.email.status == false || this.validation.password.status == false || this.validation.tnc.status == false){
      let msg = this.validation.email.msg + ' ' + this.validation.password.msg + ' ' + this.validation.tnc.msg;
      this.showAlert( 'Errors' , msg.trim());
    }
    else{
      this.firebaseprovider.register(this.email,this.password);
    }
  }
  showAlert( alert_title: string, message: string ){
    //create an alert and show it
    let alert = this.alertCtrl.create({
    title: alert_title,
    subTitle: message,
    buttons: ['Dismiss']
    });
    alert.present();
  }
  validateEmail(): boolean{
    return true;
  }
}
