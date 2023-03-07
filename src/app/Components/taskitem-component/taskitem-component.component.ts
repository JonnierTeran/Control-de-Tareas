//Componente
import { Component, EventEmitter, Input, Output } from '@angular/core';
//Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Modelo de datos
import { TareaModels } from 'src/app/Models/tareas.models';
//Servicio
import { TaskService } from 'src/app/Services/TaskService.service';
//Libreria de alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taskitem-component',
  templateUrl: './taskitem-component.component.html',
  styleUrls: ['./taskitem-component.component.css']
})
export class TaskitemComponentComponent  {
  ACTUALIZACION:FormGroup;                       //Definicion del Formulario Reactivo
  @Input('indice')indice!:number                //Deifinicion de la propiedad Opcional que sera obtenida por url
  @Output()TaskItemBool = new EventEmitter();   //Propiedad que sera enviada al App component para reAparecer la vista principal

//Inicializacion de atributos y Inyeccion de servicios
constructor(private _FormBuilder:FormBuilder, private _TaskService:TaskService){ 

  this.ACTUALIZACION = this._FormBuilder.group({     //Inicializacion del formulario Reacito
    //Inputs
      name: ['', [Validators.required, Validators.minLength(5)]],  //Inidcamos que el campo del nombre es requerido y ademas que debe tener por lo menos una longitud de 5 caracteres
      description: ['', Validators.required], //Campo requerido
      estado: ['' , Validators.required]      //Campo requerido
    })
    

    setTimeout(() => {
      //Damos Formato al formulario de actualizacion
  this.ACTUALIZACION.controls['name'].setValue(this._TaskService.getTarea(this.indice!).name!);
  this.ACTUALIZACION.controls['description'].setValue(this._TaskService.getTarea(this.indice!).description);
  this.ACTUALIZACION.controls['estado'].setValue(this._TaskService.getTarea(this.indice!).estado);
    }, 80);
  }


//Metodo para actualizar una tarea
public UpdateTarea(){
  Swal.fire({
    title: 'Desea Actualizar esta Tarea?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar',
    cancelButtonText:'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {        //Valida confirmacion del usuario
      let Obj:TareaModels = this.ACTUALIZACION.value;
      if(this.indice !== null && this.ACTUALIZACION.valid){    //valida que el indice no sea null y el form sea valido
        this._TaskService.UpdateTarea(this.indice!, Obj);     //Se elimina un registro por medio del servicio taskService
        this.TaskItemBool.emit(true);                        //Enviamos un True al appComponent
        this.ACTUALIZACION.reset();                         //Reset del form
        Swal.fire(
          'Actualizandoo . . . ',
          'Tarea Actualizada con exito',
          'success'
        )
      }
     
    }
  })

}

//Metodo para Eliminar una tarea registrada
public DeleteTarea():void{
  Swal.fire({   //Se consulta al usuario por alertas
    title: 'Desea Eliminar esta Tarea?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar',
    cancelButtonText:'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {          //Validacion de confirmacion por el usuario
      if(this.indice !== null){        //valida que el indice  no sea null
        this._TaskService.DeleteTarea(this.indice!);   // Se elimina un registro por medio del servicio TaskService
        this.TaskItemBool.emit(true);                 //Envia un True al appComponent
        this.ACTUALIZACION.reset();                  //Reset del form
        Swal.fire(
          'Deleted!',
          'Tarea eliminada con exito',
          'success'
        )
      }
     
    }
  })
}




//Cancelar Operaciones
public Cancelar():void{
Swal.fire({
  title: 'Desea Cancelar esta operacion?',
  text: "",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Continuar',
  cancelButtonText:'Cancelar'
}).then((result) => {
  if (result.isConfirmed) {       //Validacion de confirmacion del usuario
    this.TaskItemBool.emit(true); // Envia un True al appComponent
    Swal.fire(
      '',
      '',
      'success'
    )
   
  }
})

}

}
