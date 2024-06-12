export class User {
  email!: string;
  password!: string;
  repassword!: string
}

export class LoginForm {
  email!: string;
  password!: string;
}

export interface Relays{
      R1ManualSw: boolean,
      R1MobileSw:boolean,
      R1CurrentStat:boolean,
      R1StartHour: Number,
      R1StartMin:Number,
      R1EndHour:Number,
      R1EndMin:Number,

      R2ManualSw: boolean,
      R2MobileSw:boolean,
      R2CurrentStat:boolean,
      R2StartHour:Number,
      R2StartMin:Number,
      R2EndHour:Number,
      R2EndMin:Number,

      R3ManualSw: boolean,
      R3MobileSw:boolean,
      R3CurrentStat:boolean,
      R3StartHour:Number,
      R3StartMin:Number,
      R3EndHour:Number,
      R3EndMin:Number,
}


