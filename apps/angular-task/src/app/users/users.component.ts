import { Component, OnInit } from '@angular/core';
import { UsersService, User, UserImageService, FavoritesService } from '@angular-task/shared/services';
import { PrimengImportsModule } from '../primeng-imports/primeng-imports.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhoneFormatPipe } from '../pipes/phone-format.pipe';

@Component({
    selector: 'crx-users',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PhoneFormatPipe,
        PrimengImportsModule
    ],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    users: User[] = [];
    filteredUsers: User[] = [];
    sortOptions: { label: string; value: string }[] = [
        { label: 'Name A-Z', value: 'nameAsc' },
        { label: 'Name Z-A', value: 'nameDesc' },
        { label: 'Email A-Z', value: 'emailAsc' },
        { label: 'Email Z-A', value: 'emailDesc' }
    ];
    companyOptions: { label: string; value: string }[] = [];
    sortKey = '';
    selectedCompany = '';
    searchTerm = '';

    constructor (
        private usersService: UsersService,
        private userImageService: UserImageService,
        private favoritesService: FavoritesService,
    ) {}

    ngOnInit () {

        this.usersService.getUsers().subscribe({
            next: (users) => {

                this.users = users;
                this.filteredUsers = [...this.users];
                this.companyOptions = this.getUniqueCompanies();

            },
            error: (error) => {

                console.error('Error fetching users:', error);

            },
        });

    }

    getAvatarForUser (name: string): string {

        return this.userImageService.getAvatarForUser(name);

    }

    filterUsers (event: Event) {

        const target = event.target as HTMLInputElement;
        this.searchTerm = target.value.toLowerCase();
        this.applyFilters();

    }

    sortUsers () {

        this.applyFilters();

    }

    filterByCompany () {

        this.applyFilters();

    }

    private applyFilters () {

        this.filteredUsers = this.users.filter((user) =>
            (user.name.toLowerCase().includes(this.searchTerm)
             || user.email.toLowerCase().includes(this.searchTerm))
            && (this.selectedCompany ? user.company.name === this.selectedCompany : true));

        if (this.sortKey) {

            this.filteredUsers.sort((a, b) => {

                switch(this.sortKey) {

                    case 'nameAsc':
                        return a.name.localeCompare(b.name);
                    case 'nameDesc':
                        return b.name.localeCompare(a.name);
                    case 'emailAsc':
                        return a.email.localeCompare(b.email);
                    case 'emailDesc':
                        return b.email.localeCompare(a.email);
                    default:
                        return 0;

                }

            });

        }

    }

    private getUniqueCompanies (): { label: string; value: string }[] {

        const uniqueCompanies = [...new Set(this.users.map((user) => user.company.name))];
        return uniqueCompanies.map((company) => ({ label: company, value: company }));

    }

    toggleFavorite (userId: number): void {

        this.favoritesService.toggleFavorite(userId);

    }

    isFavorite (userId: number): boolean {

        return this.favoritesService.isFavorite(userId);

    }

}
