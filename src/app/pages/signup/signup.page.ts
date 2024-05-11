import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { User } from 'src/app/Classes/class';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage  {
  user = new User();
  passWordCheck:boolean = true;
  emailValid: boolean = true;
  constructor(private authSrvc: AuthServiceService,
              private dbServc: DataServiceService,
              private route: Router
  ) { }

  emailCheck(){
    const reg = new RegExp( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if(reg.test(this.user.email)){
      this.emailValid = false
    }else{
      this.emailValid = true
    }
  }

  check(){

    if(this.user.password === this.user.repassword){
      this.passWordCheck = false;
    }else{
      this.passWordCheck = true;
    }

  }

  onSubmit(){
      this.authSrvc.SignUp(this.user).then(async re=>{
        console.log(re);
        const id = re.user?.uid;
        await this.dbServc.initializeRelay(id);
        this.route.navigate(['/login'])

      }).catch(er =>{
        console.log(er.message);

      })




  }


}


