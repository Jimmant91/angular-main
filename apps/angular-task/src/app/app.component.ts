import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService, User } from '@angular-task/shared/services';

@Component({
    selector: 'crx-root',
    standalone: true,
    imports: [CommonModule],
    template: `
    <h1>Users</h1>
    <ul>
      <li *ngFor="let user of users">{{ user.name }} ({{ user.email }})</li>
    </ul>
  `,
})
export class AppComponent implements OnInit {

    users: User[] = [];

    constructor (private usersService: UsersService) {}

    ngOnInit () {

        this.usersService.getUsers().subscribe({
            next: (users) => {

                this.users = users;

            },
            error: (error) => {

                console.error('Error fetching users:', error);

            },
        });

    }

}
