import { bootstrapApplication } from '@angular/platform-browser';
import { UsersComponent } from './app/users.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(UsersComponent, config);

export default bootstrap;
