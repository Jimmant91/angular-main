import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

const PRIMENG_MODULES = [
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
];

@NgModule({
    imports: PRIMENG_MODULES,
    exports: PRIMENG_MODULES
})
export class PrimengImportsModule { }
