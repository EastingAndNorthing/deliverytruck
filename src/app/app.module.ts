import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';

// Services
import { JwtService } from './shared/services/jwt.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { DataService } from './shared/services/data.service';

// Routes
import { routing, routedComponents } from './routes/routes';
import { HomeComponent } from './routes/home/home.component';
import { RedirectComponent } from './routes/redirect/redirect.component';
import { LogoComponent } from './components/logo/logo.component';

// Pipes
import { CapitalizePipe } from './shared/pipes/capitalize.pipe';
import { ShortlinkGeneratorComponent } from './components/shortlink-generator/shortlink-generator.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    routedComponents,
    AppComponent,
    HomeComponent,
    RedirectComponent,
    LogoComponent,
    CapitalizePipe,
    ShortlinkGeneratorComponent,
    SidebarComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    JwtService,
    AuthService,
    AuthGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
