import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public horarioInicio: Date;
  public horarioTermino: Date;
  years: number[];
  constructor(private localNotifications: LocalNotifications) { }

  ngOnInit() {
    this.horarioInicio = new Date();
    this.horarioTermino = new Date(this.horarioInicio.getTime() + 60000);
    for(let i = 0 ; i <= 3; i++){
      this.years.push(this.horarioInicio.getFullYear() + i);
    }
  }

  setDate($event: CustomEvent, index: number){
    if(index == 1){
      this.horarioInicio = new Date($event.detail.value);
    } else{
      this.horarioTermino = new Date($event.detail.value);
    }
    console.log('teste', $event.detail.value);
    const obj = {
      text: 'Timestamp teste',
      // trigger: {at: this.data},
      trigger: { every: { hour: this.horarioTermino.getHours() + 3,
        minute: this.horarioTermino.getMinutes() } },
      led: 'FF0000',
      vibrate: true,
      sound: null,
      foreground: true
    };
    console.log('localObj', obj);
    this.localNotifications.schedule(obj);
  }
}
