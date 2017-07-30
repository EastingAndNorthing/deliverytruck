import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

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

@NgModule({
  declarations: [
    routedComponents,
    AppComponent,
    HomeComponent,
    RedirectComponent,
    LogoComponent,
    CapitalizePipe
  ],
  imports: [
    HttpModule,
    BrowserModule,
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
