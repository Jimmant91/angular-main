import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat',
    standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

    transform (phoneNumber: string | undefined): string {

        if (!phoneNumber) {

            return '';

        }

        // Remove all non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, '');

        // Check if the number is valid (assuming US format)
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

        if (match) {

            return '(' + match[1] + ') ' + match[2] + '-' + match[3];

        }

        return phoneNumber;

    }

}
