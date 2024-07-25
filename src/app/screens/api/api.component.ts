import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TableComponent } from '../../components/table/table.component';
import { ServicesService } from '../../services/services.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Alerts } from '../../services/Alerts';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [HeaderComponent,TableComponent,],
  providers:[ServicesService,Alerts],
  templateUrl: './api.component.html',
  styleUrl: './api.component.scss'
})
export class ApiComponent implements OnInit{
  tittleTable = ''
  columns:any = []
  values:any = []
  blob1 = 'assets/img/illustration-soccer.svg'
  blob2 = 'assets/img/blob2.png'
  constructor(
    private alerts:Alerts,
    private services:ServicesService,
    private router: Router
  ){

  }
  ngOnInit(): void {
    sessionStorage.clear()
  this.services.getSelection().subscribe({
    next:(x:any)=>{
      //console.log('seleccion del usuario en el api', x)
      if(x != ''){
     
        this.columns = []
        this.values = []
        this.tittleTable = x
       this.switch(x);
      }
    }
  })
  }

  switch(x:string){
    this.alerts.alertWait('Consultando ...')
    switch(x){
      case 'Home':
        this.router.navigateByUrl('home');
        Swal.close(); 
        break;
      case 'Equipos':
        this.findTeams();
        break;
      case 'Torneos':
        this.findTournaments();
        break;
    }
  }
  switch1(x:string){
    this.alerts.alertWait('Consultando ...')
    //console.log('eliminando del session', x)
    sessionStorage.removeItem(x)
    switch(x){
      case 'Home':
        this.router.navigateByUrl('home');
        Swal.close(); 
        break;
      case 'Equipos':
        this.findTeams();
        break;
      case 'Torneos':
        this.findTournaments();
        break;
    }
  }


  findTeams(){
    this.values = []
    this.columns = []
    //console.log('session',sessionStorage.getItem('Equipos'))
    if(sessionStorage.getItem('Equipos') == null){
    this.services.findTeams().subscribe({
      next:(x:any)=>{
        sessionStorage.setItem('Equipos',JSON.stringify(x))
        this.columns = ['ciudad','nombre','abreviatura']
        for(let i of x){
          let team = {
            'id':i.id,
            'ciudad':i.country.name,
            'nombre': i.name,
            'abreviatura':i.shortName
          }
          this.values.push(team)
        }
      
        //console.log('respesta equipos',x)
        Swal.close()
      },
      error:(err:any)=>{
        this.alerts.alertCustomError('Error al consultar equipos')
      }
    })
  }else{
   
    //console.log('entre a la base ')
    let x:any  = sessionStorage.getItem('Equipos')
    x = JSON.parse(x)
    //console.log('base', x)
    this.columns = ['ciudad','nombre','abreviatura']
    setTimeout(() => {
      for(let i of x){
     
        let team = {
          'id':i.id,
          'ciudad':i.country.name,
          'nombre': i.name,
          'abreviatura':i.shortName
        }
        this.values.push(team)
      }

    }, 100);
     Swal.close()
  }
  }

  findTournaments(){
    this.values = []
    this.columns = []
    //console.log('session',sessionStorage.getItem('Torneos'))
    if(sessionStorage.getItem('Torneos') == null){
      //console.log('entre al servicio ')
      this.services.findTournaments().subscribe({
        next:(x:any)=>{
          sessionStorage.setItem('Torneos',JSON.stringify(x))
          this.columns = ['ciudad','nombre','participantes','abreviatura']
         
          for(let i of x){
       
            let team = {
              'id':i.id,
              'ciudad':i.country.name,
              'nombre': i.name,
              'participantes':i.participantType.name,
              'abreviatura':i.shortName
            }
            this.values.push(team)
          }
        
          //console.log('respesta torneos',x)
             Swal.close()
        },
        error:(err:any)=>{
          this.alerts.alertCustomError('Error al consultar torneos')
        }
        
      })
    }else{
      this.values = []
      this.columns = []
      //console.log('entre a la base ')
      let x:any  = sessionStorage.getItem('Torneos')
      x = JSON.parse(x)
      //console.log('base', x)
      this.columns = ['ciudad','nombre','participantes','abreviatura']
      setTimeout(() => {
        for(let i of x){
          let team = {
            'id':i.id,
            'ciudad':i.country.name,
            'nombre': i.name,
            'abreviatura':i.shortName,
            'participantes':i.participantType.name
          }
          this.values.push(team)
        //   //console.log('entre a la base ', team)
        }

      }, 100);
       Swal.close()
   
  }
  }



}
