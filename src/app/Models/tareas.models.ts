export class TareaModels {
    //Atributos del modelo
    name: string;
    description: string;
    estado:string;
  
    //Inicializacion de atributos
    constructor(name:string, description:string, estado:string) {
      this.name = name;
      this.description = description;
      this.estado = estado;
    }

  }
  