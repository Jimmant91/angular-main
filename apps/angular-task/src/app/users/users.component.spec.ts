import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersService } from '@angular-task/shared/services';
import { of } from 'rxjs';

describe('UsersComponent', () => {

    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let usersService: jasmine.SpyObj<UsersService>;

    beforeEach(async () => {

        const spy = jasmine.createSpyObj('UsersService', ['getUsers']);

        await TestBed.configureTestingModule({
            imports: [UsersComponent, RouterModule.forRoot([]), HttpClientTestingModule],
            providers: [{ provide: UsersService, useValue: spy }]
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
        usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
        usersService.getUsers.and.returnValue(of([]));
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should render title', () => {

        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Users');

    });

    it('should call getUsers on init', () => {

        expect(usersService.getUsers).toHaveBeenCalled();

    });

    // Add more tests as needed for your component's functionality

});
