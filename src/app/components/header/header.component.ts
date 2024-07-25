import { Component, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app_material/app-material';
import { ServicesService } from '../../services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AppMaterialModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  items = [
    {
      'name':'Home',
      'route':'Home',
      'active':false,
    },
    {
      'name':'Equipos',
      'route':'Equipos',
      'active':true,
    },
    {
      'name':'Torneos',
      'route':'Torneos',
      'active':false,
    }
  ]
  imgHeader = 'assets/img/img-header.png'
  constructor(
    private services:ServicesService
  ){

  }
 
  go(selection :string){
    for(let i of this.items){
      if(i.route == selection){
        i.active = true
      }else{
        i.active = false
      }
    }
    this.services.setSelection(selection) 
  }
}
