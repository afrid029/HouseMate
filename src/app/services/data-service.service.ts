import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private db : AngularFireDatabase) { }

  async initializeRelay(uid: any){
    console.log(uid);
    return this.db.object('data/'+uid).set({
      R1ManualSw: false,
      R1MobileSw:false,
      R1CurrentStat:false,
      R1StartHour:0,
      R1StartMin:0,
      R1EndHour:0,
      R1EndMin:0,
      R1TotalWatts:0,
      R1UsedWatts:0,
      R1PermSwitch: true,

      R2ManualSw: false,
      R2MobileSw:false,
      R2CurrentStat:false,
      R2StartHour:0,
      R2StartMin:0,
      R2EndHour:0,
      R2EndMin:0,
      R2TotalWatts:0,
      R2UsedWatts:0,
      R2PermSwitch: true,

      R3ManualSw: false,
      R3MobileSw:false,
      R3CurrentStat:false,
      R3StartHour:0,
      R3StartMin:0,
      R3EndHour:0,
      R3EndMin:0,
      R3TotalWatts:0,
      R3UsedWatts:0,
      R3PermSwitch: true

    })

  }

  async getAllRelays(uid: any){
    return this.db.object('data/'+uid).valueChanges();
  }

   UpdateTime(uid : any, data : any){
    return this.db.object('data/'+uid).update(data);
  }


}
