import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsersService, UserImageService, FavoritesService, User } from '@angular-task/shared/services';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PrimengImportsModule } from '../primeng-imports/primeng-imports.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UsersComponent', () => {

    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let usersService: jasmine.SpyObj<UsersService>;
    let userImageService: jasmine.SpyObj<UserImageService>;
    let favoritesService: jasmine.SpyObj<FavoritesService>;

    const mockUsers: User[] = [
        {
            id: 1,
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phone: '123-456-7890',
            website: 'john.com',
            company: { name: 'Company A', catchPhrase: 'Catch Phrase A', bs: 'BS A' },
            address: { street: 'Street A', city: 'City A', suite: 'Suite A', zipcode: 'Zip A',
                geo: { lat: 'Lat A', lng: 'Lng A' } },
        },
        { id: 2,
            name: 'Jane Smith',
            username: 'janesmith',
            email: 'jane@example.com',
            phone: '098-765-4321',
            website: 'jane.com',
            company: { name: 'Company B', catchPhrase: 'Catch Phrase B', bs: 'BS B' },
            address: { street: 'Street B', city: 'City B', suite: 'Suite B', zipcode: 'Zip B',
                geo: { lat: 'Lat B', lng: 'Lng B' }
            }
        },
    ];

    beforeEach(async () => {

        // Create Jasmine spies for the services
        const usersSpy = jasmine.createSpyObj('UsersService', ['getUsers']);
        const userImageSpy = jasmine.createSpyObj('UserImageService', ['getAvatarForUser']);
        const favoritesSpy = jasmine.createSpyObj('FavoritesService', ['toggleFavorite', 'isFavorite']);

        await TestBed.configureTestingModule({
            declarations: [UsersComponent], // Declare component to be tested
            imports: [
                RouterModule.forRoot([]), // Import routing for testing navigation
                HttpClientTestingModule,  // Mock HTTP requests for services
                FormsModule,              // Forms for template-driven or reactive forms
                PrimengImportsModule      // PrimeNG components for testing
            ],
            providers: [
                { provide: UsersService, useValue: usersSpy },       // Provide mocked UsersService
                { provide: UserImageService, useValue: userImageSpy }, // Provide mocked UserImageService
                { provide: FavoritesService, useValue: favoritesSpy }, // Provide mocked FavoritesService
                {
                    provide: ActivatedRoute,  // Provide ActivatedRoute with mock params
                    useValue: {
                        snapshot: { params: { id: '123' } },  // Mocked params for route
                        paramMap: of({ get: () => '123' }) // Return mock param value
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignore unknown elements, e.g., PrimeNG
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent); // Create the component
        component = fixture.componentInstance; // Get the instance of the component

        // Inject the services to use in tests
        usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
        userImageService = TestBed.inject(UserImageService) as jasmine.SpyObj<UserImageService>;
        favoritesService = TestBed.inject(FavoritesService) as jasmine.SpyObj<FavoritesService>;

        // Mock the service methods
        usersService.getUsers.and.returnValue(of(mockUsers));
        userImageService.getAvatarForUser.and.returnValue('mock-avatar-url');
        favoritesService.isFavorite.and.returnValue(false);

        fixture.detectChanges(); // Trigger initial data binding

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

    // Add more tests as needed

});
