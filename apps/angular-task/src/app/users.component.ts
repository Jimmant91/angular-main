import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UsersService, User } from '@angular-task/shared/services';

@Component({
    selector: 'crx-root',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    title = 'angular-task';
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
