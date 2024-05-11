import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthServiceService } from './services/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private db: AngularFireDatabase, private auth: AuthServiceService) {
    console.log('Started');
    this.auth.isAuth.subscribe(re =>{
      console.log(re);

    })

    if(localStorage.getItem('email') !== null){
      this.auth.isAuth.next(true);
    }

    console.log(this.auth.isAuth.value);




    this.db.object('users/0').set({id:1, name: 'Afrid', address: 'Kalmunai'})
  }

  ionicViewDidLoad() {

  }
}
