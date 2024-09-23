import { bootstrapApplication } from '@angular/platform-browser';
import { UsersComponent } from './app/users.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(UsersComponent, {
    providers: [
        importProvidersFrom(HttpClientModule)
    ]
}).catch((err) => console.error(err));
