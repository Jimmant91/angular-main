import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User, UserImageService, FavoritesService } from '@angular-task/shared/services';
import { PrimengImportsModule } from '../primeng-imports/primeng-imports.module';
import { CommonModule } from '@angular/common';
import { PhoneFormatPipe } from '../pipes/phone-format.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'crx-user-profile',
    standalone: true,
    imports: [CommonModule, PrimengImportsModule, PhoneFormatPipe, FormsModule, RouterModule],
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

    user: User | null = null;

    constructor (
        private route: ActivatedRoute,
        private usersService: UsersService,
        private userImageService: UserImageService,
        private favoritesService: FavoritesService
    ) {

        const userId = this.route.snapshot.paramMap.get('id');
        if (userId) {

            this.usersService.getUserById(+userId).subscribe({
                next: (user) => {

                    this.user = user;

                },
                error: (error) => {

                    console.error('Error fetching user:', error);

                }
            });

        }

    }

    getAvatarForUser (name: string): string {

        return this.userImageService.getAvatarForUser(name);

    }

    toggleFavorite (userId: number): void {

        this.favoritesService.toggleFavorite(userId);

    }

    isFavorite (userId: number): boolean {

        return this.favoritesService.isFavorite(userId);

    }

}
