import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private storage: Storage | null = null;

    constructor (
        @Inject(PLATFORM_ID) private platformId: object,
        @Inject(DOCUMENT) private document: Document
    ) {

        if (isPlatformBrowser(this.platformId)) {

            this.storage = this.document.defaultView?.localStorage || null;

        }

    }

    setItem (key: string, value: string): void {

        this.storage?.setItem(key, value);

    }

    getItem (key: string): string | null {

        return this.storage?.getItem(key) ?? null;

    }

    removeItem (key: string): void {

        this.storage?.removeItem(key);

    }

}
