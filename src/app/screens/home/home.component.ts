import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app_material/app-material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blob1 = 'assets/img/blob1.png'
  blob2 = 'assets/img/blob2.png'
constructor( private router:Router){

}
  goApi(){
    this.router.navigateByUrl('api')
  }
}
