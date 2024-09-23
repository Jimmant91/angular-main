import { Component, Input, OnInit } from '@angular/core';
import { UsersService, User } from '@angular-task/shared/services';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'crx-user-profile',
    standalone: true,
    imports: [CommonModule, CardModule],
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    @Input() id = '';
    user: User | null = null;

    constructor (private usersService: UsersService) {}

    ngOnInit () {

        if (this.id) {

            this.usersService.getUserById(+this.id).subscribe({
                next: (user) => {

                    this.user = user;

                },
                error: (error) => {

                    console.error('Error fetching user:', error);

                }
            });

        }

    }

}
