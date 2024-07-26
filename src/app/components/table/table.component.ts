import {
  Component,
  Input,
  ViewChild,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { AppMaterialModule } from '../../app_material/app-material';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditTeamsComponent } from '../edit-teams/edit-teams.component';
import Swal from 'sweetalert2';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AppMaterialModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  constructor(private dialog: MatDialog,  private services:ServicesService,) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() tittle: string = '';

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();

       
  editarTabla = ''
  ngOnInit(): void {
    //console.log('data para tabla', this.data);
    this.displayedColumns = [...this.columns, 'actions'];
    this.dataSource.data = this.data;
   
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Ultima página';
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Página anterior'
  }

  edit(row: any): void {
    this.openDialog(row);
    //console.log('Edit', row);
  }

  delete(row: any): void {
   
      Swal.fire({
        icon: 'warning',
        title: '¿Está seguro de eliminar este registro?',
        // text: 'Deseas eliminar este registro',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Sí'
      }).then((res) => {
        //console.log(res)
        if(res.isConfirmed){
          //console.log('borrandooooo')
         if(this.tittle == 'Equipos'){
          let teams:any = JSON.parse(sessionStorage.getItem('Equipos')!)
          const newItems = teams.filter((item:any) => item.id !== row.id);
          this.data =  this.dataSource.data.filter((item:any) => item.id !== row.id);
          this.dataSource = new MatTableDataSource( this.data)
          this.dataSource.paginator = this.paginator
          sessionStorage.removeItem('Equipos')
          sessionStorage.setItem('Equipos' , JSON.stringify(newItems))
         }else{
          let teams:any = JSON.parse(sessionStorage.getItem('Torneos')!)
          const newItems = teams.filter((item:any) => item.id !== row.id);
          this.data =  this.dataSource.data.filter((item:any) => item.id !== row.id);
          this.dataSource = new MatTableDataSource( this.data)
          this.dataSource.paginator = this.paginator
          sessionStorage.removeItem('Torneos')
          sessionStorage.setItem('Torneos' , JSON.stringify(newItems))
         }
        
        }
       
      })
      
    //console.log('Delete', row);
  }

  openDialog(row: any): void {
    const dialogRef = this.dialog.open(EditTeamsComponent, {
      width: 'auto',
      data: { title: this.tittle, content: JSON.stringify(row) },
    });

    dialogRef.afterClosed().subscribe((info) => {
      //console.log('cerrar dialog', info);
      if(info != undefined &&  info != ''){
        let result = info.form

        if(info.action == 'edit'){
          if(info.title == 'Equipos'){
            for(let i of this.data){
              if(i.id == result.id){
                //console.log('lo encontre',i)
                i.pais = result.country
                i.nombre = result.name
                i.abreviatura = result.shortname
              }
            }
           let teams:any = JSON.parse(sessionStorage.getItem('Equipos')!)
      
           for(let o of teams){
              if(o.id == result.id){
                o.country.name = result.country
                o.name = result.name
                o.shortName = result.shortname
              }
           }
           sessionStorage.setItem('Equipos' , JSON.stringify(teams))
          }else{
            for(let i of this.data){
              if(i.id == result.id){
                //console.log('lo encontre',i)
                i.pais = result.country
                i.nombre = result.name
                i.abreviatura = result.shortname
                i.participantes = result.participant
              }
            }
           let tournaments:any = JSON.parse(sessionStorage.getItem('Torneos')!)
      
           for(let o of tournaments){
              if(o.id == result.id){
                o.country.name = result.country
                o.name = result.name
                o.shortName = result.shortname
                o.participantType.name = result.participant
              }
           }
           sessionStorage.setItem('Torneos' , JSON.stringify(tournaments))
          }
        }else{
          console.log('guardar esta info', info)

          if(info.title == 'Equipos'){
            let teams:any = JSON.parse(sessionStorage.getItem('Equipos')!)
            teams.push(
              {
                id:this.generateRandomNumber(1, 100),
              country:{
                name:result.country
              },
              name:result.name,
              shortName:result.shortname
              }
            )
            this.data.push(
              {
              id:this.generateRandomNumber(1, 100),
              pais:result.country,
              nombre:result.name,
              abreviatura:result.shortname
              }
            )

            this.dataSource = new MatTableDataSource( this.data)
            this.dataSource.paginator = this.paginator
            sessionStorage.setItem('Equipos' , JSON.stringify(teams))
          }
          else if(info.title == 'Torneos'){
            let teams:any = JSON.parse(sessionStorage.getItem('Torneos')!)
            teams.push(
              {
                id:this.generateRandomNumber(1, 100),
              country:{
                name:result.country
              },
              name:result.name,
              shortName:result.shortname,
              participantType:{
                name:result.participant
              }
              }
            )
            this.data.push(
              {
              id:this.generateRandomNumber(1, 100),
              pais:result.country,
              nombre:result.name,
              abreviatura:result.shortname,
              participantes : result.participant
              }
            )

            this.dataSource = new MatTableDataSource( this.data)
            this.dataSource.paginator = this.paginator
            sessionStorage.setItem('Torneos' , JSON.stringify(teams))
          }


        }
       
      }
      
    
      
 
    });
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
