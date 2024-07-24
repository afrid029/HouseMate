import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AlertController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Relays } from 'src/app/Classes/class';
import { AlertSrvcService } from 'src/app/services/alert-srvc.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage  {

//  relays: Relays | undefined;


relays: any = {
  R1ManualSw: Boolean,
  R1MobileSw: Boolean,
  R1CurrentStat:Boolean,
  R1StartHour: Number,
  R1StartMin:Number,
  R1EndHour:Number,
  R1EndMin:Number,
  R1TotalWatts:Number,
  R1UsedWatts:Number,
  R1PermSwitch: String,


  R2ManualSw: Boolean,
  R2MobileSw:Boolean,
  R2CurrentStat:Boolean,
  R2StartHour:Number,
  R2StartMin:Number,
  R2EndHour:Number,
  R2EndMin:Number,
  R2TotalWatts:Number,
  R2UsedWatts:Number,
  R2PermSwitch: String,


  R3ManualSw: Boolean,
  R3MobileSw:Boolean,
  R3CurrentStat:Boolean,
  R3StartHour:Number,
  R3StartMin:Number,
  R3EndHour:Number,
  R3EndMin:Number,
  R3TotalWatts:Number,
  R3UsedWatts:Number,
  R3PermSwitch: String
}

R1: any = {startSchedule: false, endSchedule: false, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0}
R2: any = {startSchedule: false, endSchedule: false, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0}
R3: any = {startSchedule: false, endSchedule: false, startHour: 0, startMinute: 0, endHour: 0, endMinute: 0}

R1Used: any ;
R1UsedBar: any = 0;
R2Used: any = 0;
R2UsedBar: any = 0;
R3Used: any = 0;
R3UsedBar: any = 0;

R1EH: String = "";
R1EM: String = "";
R2SH: String = "";
R2SM: String = "";
R1SH: String = "";
R2EH: String = "";
R2EM: String = "";

R3SH: String = "";
R3SM: String = "";
R3EH: String = "";
R3EM: String = "";
R1SM: String = "";

subs: Subscription = new Subscription;

  constructor(private data: DataServiceService,
    private alert : AlertSrvcService,
    private auth : AuthServiceService,
    private route: Router,
    private alctrl: AlertController,
    private platform: Platform
  ) { }

  ionViewDidEnter(){
    this.subs = this.platform.backButton.subscribeWithPriority(1,()=>{
      console.log('Dashboard ',this.constructor.name);

        this.toExit();

    })
  }

  ionViewWillLeave(){
    console.log('view leaving');

    this.subs.unsubscribe();
   }

  async toExit(){
    console.log('Can exit noew');
    const alert = await this.alctrl.create({
      header: 'Exit ?',
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            console.log('cancelled');
            }
        },{
          text: 'Exit',
          role: 'confirm',
          handler: () =>{
            App.exitApp();
          }
        }]
    });
    await alert.present();
  }


  async ionViewWillEnter(){
    (await this.data.getAllRelays(localStorage.getItem('uid'))).subscribe((data : any) =>{

      this.relays = data;
      console.log(this.relays);
      this.R1Used = parseFloat((this.relays.R1UsedWatts * 100 / this.relays.R1TotalWatts).toFixed(2));
      this.R1UsedBar = this.R1Used / 100;
      this.R2Used = parseFloat((this.relays.R2UsedWatts * 100 / this.relays.R2TotalWatts).toFixed(2));
      this.R2UsedBar = this.R2Used / 100;
      this.R3Used = parseFloat((this.relays.R3UsedWatts * 100 / this.relays.R3TotalWatts).toFixed(2));
      this.R3UsedBar = this.R3Used / 100;

      console.log((this.relays.R1UsedWatts));
      console.log(this.R1Used);
      console.log(this.R1UsedBar);



      this.R1SH = this.toString(this.relays.R1StartHour)
      this.R1SM = this.toString(this.relays.R1StartMin)
      this.R1EH = this.toString(this.relays.R1EndHour)
      this.R1EM = this.toString(this.relays.R1EndMin)

      this.R2SH = this.toString(this.relays.R2StartHour)
      this.R2SM = this.toString(this.relays.R2StartMin, )
      this.R2EH = this.toString(this.relays.R2EndHour)
      this.R2EM = this.toString(this.relays.R2EndMin)

      this.R3SH = this.toString(this.relays.R3StartHour)
      this.R3SM = this.toString(this.relays.R3StartMin)
      this.R3EH = this.toString(this.relays.R3EndHour)
      this.R3EM = this.toString(this.relays.R3EndMin)

      console.log(typeof(this.R1SH));
      console.log(this.R1SH);



    })
  }

  toString(s :Number ){
    let d = s.toString();
    if(d.length == 1){
      d = '0' + d;
    }

    return d;

    console.log(d);

  }

  StartScheduleEdit(rel: any){
    rel.startSchedule = true;
    if(rel === this.R1){
      rel.startHour = this.relays.R1StartHour;
    rel.startMinute = this.relays.R1StartMin;
    }else if(rel === this.R2){
      rel.startHour = this.relays.R2StartHour;
    rel.startMinute = this.relays.R2StartMin;
    }else if(rel === this.R3){
      rel.startHour = this.relays.R3StartHour;
    rel.startMinute = this.relays.R3StartMin;
    }

  }

  startHourChange(rel: any){

    if(rel.startHour > 23 || rel.startHour < 0 ){
      rel.startHour = 0
    }
  }

  startMinChange(rel: any){

    if(rel.startMinute > 59 || rel.startMinute < 0  ){
      rel.startMinute = 0
    }
  }

  async UpdateStartTime(rel: any){
    let data;
    const uid = localStorage.getItem('uid');
    console.log(uid);

    if(rel === this.R1){
      data = {R1StartHour : rel.startHour, R1StartMin : rel.startMinute}
      console.log(data);
    }else if(rel === this.R2){
      data = {R2StartHour : rel.startHour, R2StartMin : rel.startMinute}
      console.log(data);
    }else if(rel === this.R3){
      data = {R3StartHour : rel.startHour, R3StartMin : rel.startMinute}
      console.log(data);
    }

     this.data.UpdateTime(uid,data).then(() => {
      rel.startSchedule = false;
      this.alert.success();

    }).catch(er =>{
      this.alert.Error();

    })



  }

  CloseStartScheduleEdit(rel: any){
    rel.startSchedule = false
  }

  EndScheduleEdit(rel: any){
    rel.endSchedule = true;
    if(rel === this.R1){
      rel.endHour = this.relays.R1EndHour;
    rel.endMinute = this.relays.R1EndMin;
    }else if(rel === this.R2){
      rel.endHour = this.relays.R2EndHour;
    rel.endMinute = this.relays.R2EndMin;
    }else if(rel === this.R3){
      rel.endHour = this.relays.R3EndHour;
    rel.endMinute = this.relays.R3EndMin;
    }
  }

  endHourChange(rel: any){
    console.log('End Hour... ',rel);

    if(rel.endHour > 23 || rel.endHour < 0){
      rel.endHour = 0
    }
  }

  endMinChange(rel: any){

    if(rel.endMinute > 59 || rel.endMinute < 0  ){
      rel.endMinute = 0
    }
  }

  async UpdateEndTime(rel: any){
    let data;
    const uid = localStorage.getItem('uid');
    console.log(uid);

    if(rel === this.R1){
      data = {R1EndHour : rel.endHour, R1EndMin : rel.endMinute}
      console.log(data);
    }else if(rel === this.R2){
      data = {R2EndHour : rel.endHour, R2EndMin : rel.endMinute}
      console.log(data);
    }else if(rel === this.R3){
      data = {R3EndHour : rel.endHour, R3EndMin : rel.endMinute}
      console.log(data);
    }

     this.data.UpdateTime(uid,data).then(() => {
      rel.endSchedule = false;
      this.alert.success();

    }).catch(er =>{
      this.alert.Error();

    })



  }


  CloseEndScheduleEdit(rel: any){
    rel.endSchedule = false;
  }

  async logout(){
    const alert = await this.alctrl.create({
      header: 'Are you sure',
      subHeader: 'You want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            await this.auth.logout().then(() =>{
              this.auth.isAuth.next(false);
              localStorage.removeItem('uid');
            })

            this.route.navigateByUrl('/login');
          }
        }
      ]

    })

    await alert.present();
  }

  x(sw: any, rel: any){

    console.log(sw.detail.checked);


    if(rel === this.R1){
      this.data.UpdateTime(localStorage.getItem('uid'), {R1PermSwitch : sw.detail.checked == true ? "B" : "A", R1CurrentStat: false, R1MobileSw: false})
    }else if(rel === this.R2){
      this.data.UpdateTime(localStorage.getItem('uid'), {R2PermSwitch : sw.detail.checked == true ? "B" : "A", R2CurrentStat: false, R2MobileSw: false})
    }else if(rel === this.R3){
      this.data.UpdateTime(localStorage.getItem('uid'), {R3PermSwitch : sw.detail.checked == true ? "B" : "A", R3CurrentStat: false, R3MobileSw: false})
    }
  }
  MobileSw(sw: any, rel: any){

    console.log(sw.detail.checked);


    if(rel === this.R1){
      this.data.MobileSwitchUpdate(localStorage.getItem('uid'), { R1CurrentStat: sw.detail.checked, R1MobileSw: sw.detail.checked})
    }else if(rel === this.R2){
      this.data.MobileSwitchUpdate(localStorage.getItem('uid'), { R2CurrentStat: sw.detail.checked, R2MobileSw: sw.detail.checked})
    }else if(rel === this.R3){
      this.data.MobileSwitchUpdate(localStorage.getItem('uid'), { R3CurrentStat: sw.detail.checked, R3MobileSw: sw.detail.checked})
    }
  }

}
