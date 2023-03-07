//Modulos
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//Componentes
import { AppComponent } from './app.component';
import { TaskService } from './Services/TaskService.service';
//Servicios
import { TaskitemComponentComponent } from './Components/taskitem-component/taskitem-component.component';

@NgModule({
  declarations: [    //Componentes
    AppComponent,
    TaskitemComponentComponent
  ],
  imports: [     //Modulos
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [TaskService],  //Servicios
  bootstrap: [AppComponent]   //Componente principal
})
export class AppModule { }
