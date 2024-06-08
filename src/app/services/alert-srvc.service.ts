import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertSrvcService {

  constructor(private altctrl : ToastController) { }

  async LoginError(){
     const toast = await this.altctrl.create({
      message: 'Email/Password is wrong',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
