import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-shared-services',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shared-services.component.html',
    styleUrl: './shared-services.component.css',
})
export class SharedServicesComponent {}
