import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AppMaterialModule } from '../../app_material/app-material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-edit-teams',
  standalone: true,
  imports: [CommonModule, AppMaterialModule,ReactiveFormsModule,FormsModule],
  providers:[ServicesService],
  templateUrl: './edit-teams.component.html',
  styleUrl: './edit-teams.component.scss'
})
export class EditTeamsComponent implements OnInit {
  form!: FormGroup;
  formT!: FormGroup;
  save = false
  dataAutocompletar:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<EditTeamsComponent>,

) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['',],
      country: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      shortname: ['', [Validators.required, Validators.maxLength(3)]]
    });
    this.formT = this.fb.group({
      id: ['',],
      country: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      shortname: ['', [Validators.required, Validators.maxLength(3)]],
      participant: ['', Validators.required],
    });
 
    this.dataAutocompletar = JSON.parse(this.data.content)
    console.log('data recibida para editar',this.dataAutocompletar)
    if(Object.keys(this.dataAutocompletar).length == 0 ){
      this.save = true;

    }
    if(this.data.title == 'Equipos'){
      this.form.controls['country'].setValue(this.dataAutocompletar.ciudad)
      this.form.controls['name'].setValue(this.dataAutocompletar.nombre)
      this.form.controls['shortname'].setValue(this.dataAutocompletar.abreviatura)
      this.form.controls['id'].setValue(this.dataAutocompletar.id)
    }else{
      this.formT.controls['country'].setValue(this.dataAutocompletar.ciudad)
      this.formT.controls['name'].setValue(this.dataAutocompletar.nombre)
      this.formT.controls['shortname'].setValue(this.dataAutocompletar.abreviatura)
      this.formT.controls['id'].setValue(this.dataAutocompletar.id)
      this.formT.controls['participant'].setValue(this.dataAutocompletar.participantes)
    }
   

  
   
  }

  editFunction(): void {

    if(this.data.title == 'Equipos'){
    if (this.form.valid) {
      //console.log('Form Data:', this.form.value);
      
      this.closeDialog( this.form.value,'edit')
    } else {
      //console.log('Form is invalid');
    }
  }else{
    if (this.formT.valid) {
      //console.log('Form Data:', this.formT.value);

      this.closeDialog( this.formT.value ,'edit')
    } else {
      //console.log('Form is invalid');
    }
  }
  }

  saveFunction(){
    if(this.data.title == 'Equipos'){
      if (this.form.valid) {
        //console.log('Form Data:', this.form.value);
        
        this.closeDialog( this.form.value,'save')
      } else {
        //console.log('Form is invalid');
      }
    }else{
      if (this.formT.valid) {
        //console.log('Form Data:', this.formT.value);
  
        this.closeDialog( this.formT.value ,'save')
      } else {
        //console.log('Form is invalid');
      }
    }
   
  }
  

  closeDialog(form:any,action:string): void {
    let data  = {
      'action':action,
      'form': form,
      'title':this.data.title
    }
    this.dialogRef.close( data );
  }

  getErrorMessage(fieldFormGroup: { errors: any }) {

    const ERROR = fieldFormGroup.errors;
    // console.log(ERROR)
    let message = '';
    if (ERROR['required']) {
      message = 'Debe ingresar este campo';
    } else if (ERROR['email']) {
      message = 'Debe ingresar una dirección de email válida';

    }else if ( ERROR['pattern']) {
      message = 'Valor inválido';
    }else if(ERROR['minlength']){
      message = `mínimo de caracteres ${ERROR.minlength.requiredLength}`;
    }
    else if(ERROR['maxlength'] ){
      message = 'máximo de caracteres invalido';
    }
    return message;
  }

}
