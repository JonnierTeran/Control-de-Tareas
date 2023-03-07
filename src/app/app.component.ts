//Componente
import { Component } from '@angular/core';
//Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Libreria de alertas
import Swal from 'sweetalert2';
//Modelo de datos
import { TareaModels } from './Models/tareas.models';
//Servicio para proveer funcionalidades
import { TaskService } from './Services/TaskService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   //Atributos del componente
   Tareas:TareaModels[];     //Atributo para Obtener la lista de tareas al inicializarse
   Registro:FormGroup;       //Definicion del Formulario Reactivo
   TaskItemBool:Boolean;     //Variable booleana para controlar la vista
   Index!:number;            //Index para enviar al componente hijo TaskItemComponent  por input
   Search:string;            //propiedad para filtrar busquedas
   List:Boolean;              //propiedad para estructurar Ver todo y acciones (Modo busqueda)
 
   
   //Inicializacion de atributos e inyeccion de servicios al componente
   constructor(private _TaskService:TaskService,
               private _FormBuilder:FormBuilder){
 
       //Se cargan en el componente las tareas registradas en el servicio 
       this.Tareas = this._TaskService.Tareas;    //Llamado al servicio para TaskService para obtener la lista de tareas al inicializarse
 
       //Inicializacion del formulario Reacito
       this.Registro = this._FormBuilder.group({
         //Inputs
           name: ['', [Validators.required, Validators.minLength(5)]],   //Inidcamos que el campo del nombre es requerido y ademas que debe tener por lo menos una longitud de 5 caracteres
           description: ['', Validators.required], //Campo requerido
           estado:['', Validators.required]
         })
 
       this.TaskItemBool= true;    //Inicializamos en true la variable de control para la vista
       this.List = false;         //inicializa propiedades de filtros
       this.Search ='';           //Inicializa con cadena vacia la propiedad para el buscador
       
   }
 
   //Metodo para validar si el formulario es valido y registrar
   public RegistrarTarea():void{
     let Form:TareaModels;
     Form = this.Registro.value;
     //window.console.log(Form)
     if(this.Registro.valid){                //Validamos que el formulario sea valido
       this._TaskService.setAddTareas(Form); //Registro de una tarea por medio del servicio
       this.Registro.reset();                //Reset al formulario
       Swal.fire({                          //Alerta de confirmacion
         position: 'center',
         icon: 'success',
         title: 'Tarea Registrada exitosamente!',
         showConfirmButton: false,
         timer: 1500
       })
     }
   }
 
   //Metodo para redireccionar al componente TaskItemComponent y enviar un indice
   public Editar(index:number):void{
     Swal.fire({
       title: 'Desea Editar esta Tarea?',
       text: "",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Continuar',
       cancelButtonText:'Cancelar'
     }).then((result) => {
       if (result.isConfirmed) {        //Validando la confirmacion del usuario
         this.TaskItemBool=false;       //Ocultamos la vista principal
         this.Index=index;
         console.log(this.Index);
         
       }
     })
 
   }
 
   //Evento Recibido por el componente TaskItemComponent por Output
   public manejarEvento($event:any){
     this.TaskItemBool = $event;
   }
 
   //Metodo para filtrar tareas
   public buscarTareas():void {
     if(this.Search != ''){       //Validacion que el campo de busqueda no este null
       this.Search = this.Search.toLowerCase();
       this.Tareas = this.Tareas.filter(tarea => tarea.name.toLowerCase().includes(this.Search));   // Filtrar tareas según el término de búsqueda
       this.List = true;           //Activa el modo busqueda
     }
   }
 
   //Metodo para ver todos los registros luego de filtrar
   VerTodos():void{
     this.Tareas = this._TaskService.Tareas;      //Regeneracion del arreglo   
     this.Search = '';                            //Limpia el campo de busqueda
     this.List = false;                          //Desactiva el modo busqueda
   }
}
