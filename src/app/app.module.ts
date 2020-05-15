import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieGridComponent } from './movie-grid/movie-grid.component';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { SecondviewComponent } from './SecondView/secondview/secondview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieGridComponent,
    MovieHomeComponent,
    LoginComponent,
    RegisterComponent,
    SecondviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
