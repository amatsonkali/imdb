import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieGridComponent } from './movie/movie-grid/movie-grid.component';
import { MovieHomeComponent } from './movie/movie-home/movie-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieCreateComponent } from './movie/movie-create/movie-create.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { MovieAddPersonaComponent } from './movie/movie-add-persona/movie-add-persona.component';
import { MovieCalifComponent } from './movie/movie-calif/movie-calif.component';
import { PersonaListComponent } from './persona/persona-list/persona-list.component';
import { PersonaDetailsComponent } from './persona/persona-details/persona-details.component';
import { PersonaBrowserComponent } from './persona/persona-browser/persona-browser.component';
import { MovieCreatePersonaComponent } from './movie/movie-create-persona/movie-create-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieGridComponent,
    MovieHomeComponent,
    LoginComponent,
    RegisterComponent,
    MovieDetailsComponent,
    MovieCreateComponent,
    MovieAddPersonaComponent,
    MovieCalifComponent,
    PersonaListComponent,
    PersonaDetailsComponent,
    PersonaBrowserComponent,
    MovieCreatePersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AlifeFileToBase64Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
