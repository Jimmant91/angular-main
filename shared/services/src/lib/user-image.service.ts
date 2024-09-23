import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserImageService {

    private baseUrl = 'https://ui-avatars.com/api/';

    getAvatarForUser (name: string): string {

        // Encode the name to handle special characters
        const encodedName = encodeURIComponent(name);
        return `${this.baseUrl}?name=${encodedName}&background=random&color=fff`;

    }

}
