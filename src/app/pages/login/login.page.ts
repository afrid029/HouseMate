import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {LoginForm} from './../../Classes/class'
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { AlertSrvcService } from 'src/app/services/alert-srvc.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  //UserDet = {email: '', password: ''};

  UserDet = new LoginForm;
  emailValid: boolean = true;

  relays : Relays | undefined;
  constructor(private auth: AuthServiceService,
              private db: DataServiceService,
              private alert: AlertSrvcService,
              private route: Router
  ) { }

  async onSubmit(){
    console.log(this.UserDet);
    try{
      await this.auth.Login(this.UserDet).then( async re=>{
        console.log(re);
        this.auth.isAuth.next(true);
        this.auth.updateCurrentUser(re.user);
        await this.auth.currentUser().then( async (res) =>{
          console.log('UID ', res?.uid);
          localStorage.setItem('uid', res.uid);

        });





        //localStorage.setItem('email',this.UserDet.email);
        //localStorage.setItem('uid', uid);


        this.route.navigate(['dashboard']);
        // (await this.db.getAllRelays(re.user?.uid)).forEach(res =>{
        //   console.log(res);



        // })


      })
    }catch(error: any) {

      this.alert.LoginError();

    }



  }

  emailCheck(){
    const reg = new RegExp( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if(reg.test(this.UserDet.email)){
      this.emailValid = false
    }else{
      this.emailValid = true
    }
  }
}

interface Relays {
  R1ManualSw: boolean,
      R1MobileSw:boolean,
      R1CurrentStat:boolean,
      R1StartHour:number,
      R1StartMin:number,
      R1EndHour:number,
      R1EndMin:number,

      R2ManualSw: boolean,
      R2MobileSw:boolean,
      R2CurrentStat:boolean,
      R2StartHour:number,
      R2StartMin:number,
      R2EndHour:number,
      R2EndMin:number,

      R3ManualSw: boolean,
      R3MobileSw:boolean,
      R3CurrentStat: boolean
      R3StartHour:number,
      R3StartMin:number,
      R3EndHour:number,
      R3EndMin:number
}
