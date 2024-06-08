import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { User, LoginForm } from '../Classes/class';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public isAuth = new BehaviorSubject<boolean>(false);


  constructor(private auth: AngularFireAuth) { }

  async SignUp(user: User){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  async Login(user: LoginForm){
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async updateCurrentUser(user: any){
    this.auth.updateCurrentUser(user);
  }

  async currentUser(){
    return this.auth.currentUser;
  }
}
