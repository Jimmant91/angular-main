import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';

const PRIMENG_MODULES = [
    CardModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
    MessageModule,
];

@NgModule({
    imports: PRIMENG_MODULES,
    exports: PRIMENG_MODULES
})
export class PrimengImportsModule { }
