//Modelo de datos para generar objetos 
import { TareaModels } from "../Models/tareas.models";

//Clase del servicio
export class TaskService{
    //Definimos un arreglo de tareasModels (Modelo de datos creado)
    Tareas:TareaModels[];

    constructor(){
        //Inicializamos el arreglo de tareas con 2 registros por default
        this.Tareas = [new TareaModels('Levantamiento de requerimientos', 'El levantamiento de requerimientos es el proceso de identificar y documentar las necesidades y expectativas del cliente para un proyecto de software.', 'Completada'),
        new TareaModels('Desarrollo de Requerimientos', 'El Desarrollo de Requerimientos es el proceso de definir y documentar los requisitos del software que se deben cumplir para satisfacer las necesidades del cliente y de los usuarios finales. ', 'Pendiente')];
    }

    //Metodo del servicio para agregar una nueva tarea
    public setAddTareas(Tarea:TareaModels):void{
        this.Tareas.push(Tarea);
    }

    //Metodo del servicio para eliminar una tarea registrada, por medio de su indice en el Arrays
    public DeleteTarea(index:number):void{
        this.Tareas.splice(index,1)
    }

    //Metodo para Obtener un registro por indice
    public getTarea(index:number):TareaModels{
        return this.Tareas[index];
    }

    //Metodo para actualizar una tarea
    public UpdateTarea(index:number , Obj:TareaModels):void{
        this.Tareas[index] = Obj;
    }
}