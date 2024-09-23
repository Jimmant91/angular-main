import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(HttpClientModule),
        provideRouter(appRoutes, withComponentInputBinding()),
        provideAnimations()
    ]
}).catch((err) => console.error(err));
