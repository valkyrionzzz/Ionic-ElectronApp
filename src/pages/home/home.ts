import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataserviceProvider } from '../../providers/dataservice/dataservice';

import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
public messages : Array<any> = [];
public usersArr : Array<any> = [];
public messageRef: firebase.database.Reference //= firebase.database().ref('/'+);
public trustRef: firebase.database.Reference //= firebase.database().ref('/'+);
public viewname : string;
public email : string;
public userid : string;
public url : string;
public sendid : string;

  constructor(){}
  
  sendMsg(userText : String) : void{
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    this.viewname = user.displayName;
    this.email = user.email;
    this.userid = user.uid;
    
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
                       
       // user.updateProfile({displayName: "anon"});
    }
    // var user = firebase.auth().currentUser;
    
    //     var name = user.userProfile;
    //     var email = user.email;
    //     var id = user.id;
        if(this.sendid == null){
          this.sendid == user.uid;
        }
    
    this.trustRef = firebase.database().ref(`/`+this.sendid+`/Trusted`);
    this.trustRef.on('value', messageSnapshot => {
      this.usersArr = [];
      messageSnapshot.forEach( messageSnap =>{
        
        this.usersArr.push(messageSnap.val().email);
        
        return false;
      });
    });
        
        for (var i = 0; i < 2; i++) {
        
          if(this.email==this.usersArr[i]){
            const personRef: firebase.database.Reference = firebase.database().ref(`/`+this.sendid+`/Messages`);
            personRef.push({
              userText,
              name : this.viewname,
              email : this.email
            })
          }
        }
  }
  
  updateName(nickname : string) : void{
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    this.url = user.photoURL;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
                       
       // user.updateProfile({displayName: "anon"});
    }
    
    this.viewname = nickname;
    this.email = email;
    this.userid = user.uid;
    const nameRef: firebase.database.Reference = firebase.database().ref(`/userProfile/`+user.uid);
      nameRef.set({
        nickname : this.viewname,
        email : this.email,
        userID : this.userid
      })
    
    this.url = user.photoURL;
    user.updateProfile({displayName: this.viewname, photoURL: this.url});
    
    const trustyRef: firebase.database.Reference = firebase.database().ref(`/`+user.uid+`/Trusted`);
    trustyRef.child("Owner").set({
      email : this.email
    })
    
  }
  
  changeChannel(channelName : string) : void{
    var user = firebase.auth().currentUser;
    
    this.trustRef = firebase.database().ref(`/userProfile`);
    this.trustRef.on('value', messageSnapshot => {
      this.usersArr = [];
      messageSnapshot.forEach( messageSnap =>{
        
        if (messageSnap.val().email == channelName){
          this.usersArr.push(messageSnap.val().userID);
        }
        return false;
      });
    });
    this.sendid = channelName;//this.usersArr[0];
    this.messageRef = firebase.database().ref('/'+this.sendid+`/Messages`);
    this.messageRef.limitToLast(50).on('value', messageSnapshot => {
      this.messages = [];
      messageSnapshot.forEach( messageSnap =>{
        //this.messages.push(messageSnap.val().userText);
        
            this.messages.push(messageSnap.val().name + " ("+messageSnap.val().email+") :"+messageSnap.val().userText);

        //this.messages.push(messageSnap.val().userText);
        return false;
      });
    });
  }
  
  addUserToChannel(username : string) : void{
    var user = firebase.auth().currentUser;
    const trustRef: firebase.database.Reference = firebase.database().ref(`/`+user.uid+`/Trusted`);
    trustRef.push({
      email : username
    })
  }
  
  ionViewDidLoad(){
    var user = firebase.auth().currentUser;
    
    this.sendid = user.uid;
    
    document.getElementById("shareID").innerHTML = this.sendid;
    
    this.trustRef = firebase.database().ref(`/`+this.sendid+`/Trusted`);
    this.trustRef.on('value', messageSnapshot => {
      this.usersArr = [];
      messageSnapshot.forEach( messageSnap =>{
        
        this.usersArr.push(messageSnap.val().email);
        
        return false;
      });
    });
    
    this.messageRef = firebase.database().ref('/'+this.sendid+`/Messages`);
    this.messageRef.limitToLast(50).on('value', messageSnapshot => {
      
      this.messages = [];
      messageSnapshot.forEach( messageSnap =>{
        //this.messages.push(messageSnap.val().userText);
        console.log(messageSnap);
        for (var i = 0; i < 15; i++) {
        if(i % 2 == 0 || i ==0)
        {
          if(messageSnap.val().email==this.usersArr[i]){
            this.messages.push(messageSnap.val().name + " ("+messageSnap.val().email+") :"+messageSnap.val().userText);
          }
          
          }
        }
        
        //this.messages.push(messageSnap.val().userText);
        return false;
      });
    });
    
    
    
  }

}
