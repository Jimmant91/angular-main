import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

const PRIMENG_MODULES = [
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextModule,
];

@NgModule({
    imports: PRIMENG_MODULES,
    exports: PRIMENG_MODULES
})
export class PrimengImportsModule { }
