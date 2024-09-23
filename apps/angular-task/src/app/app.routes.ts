import { Route } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'users/:id', component: UserProfileComponent }
];
