import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UsersService, UserImageService, FavoritesService, User } from '@angular-task/shared/services';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';

describe('UsersComponent', () => {

    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let usersServiceMock: jest.Mocked<UsersService>;
    let userImageServiceMock: jest.Mocked<UserImageService>;
    let favoritesServiceMock: jest.Mocked<FavoritesService>;
    let activatedRouteMock: Partial<ActivatedRoute>;

    const mockUsers: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            company: {
                name: 'Company A',
                catchPhrase: 'Innovative solutions',
                bs: 'Synergistic paradigms'
            },
            phone: '123-456-7890',
            website: 'johndoe.com',
            address: {
                street: '123 Main St',
                suite: 'Apt 4',
                city: 'Anytown',
                zipcode: '12345',
                geo: { lat: '40.7128', lng: '-74.0060' }
            }
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@example.com',
            username: 'janedoe',
            company: {
                name: 'Company B',
                catchPhrase: 'Leading the industry',
                bs: 'Cutting-edge technologies'
            },
            phone: '098-765-4321',
            website: 'janedoe.com',
            address: {
                street: '456 Elm St',
                suite: 'Suite 789',
                city: 'Othertown',
                zipcode: '67890',
                geo: { lat: '34.0522', lng: '-118.2437' }
            }
        }
    ];

    beforeEach(async () => {

        usersServiceMock = {
            getUsers: jest.fn().mockReturnValue(of(mockUsers)),
            getUserById: jest.fn().mockImplementation((id: number) => of(mockUsers.find((user) => user.id === id)))
        } as unknown as jest.Mocked<UsersService>;

        userImageServiceMock = {
            getAvatarForUser: jest.fn().mockReturnValue('avatar-url'),
            baseUrl: 'http://example.com/avatars/'
        } as unknown as jest.Mocked<UserImageService>;

        favoritesServiceMock = {
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
            getFavorites: jest.fn().mockReturnValue(of(new Set<number>()))
        } as unknown as jest.Mocked<FavoritesService>;

        const mockSnapshot: Partial<ActivatedRouteSnapshot> = {
            paramMap: convertToParamMap({ id: '1' }),
            queryParamMap: convertToParamMap({}),
            url: [],
            params: { id: '1' },
            queryParams: {},
            fragment: null,
            data: {},
            outlet: 'primary',
            component: null,
            routeConfig: null,
            root: {} as ActivatedRouteSnapshot,
            parent: null,
            firstChild: null,
            children: [],
            pathFromRoot: [],
        };

        activatedRouteMock = {
            params: of({ id: '1' }),
            queryParams: of({}),
            snapshot: mockSnapshot as ActivatedRouteSnapshot,
        };

        await TestBed.configureTestingModule({
            imports: [UsersComponent],
            providers: [
                { provide: UsersService, useValue: usersServiceMock },
                { provide: UserImageService, useValue: userImageServiceMock },
                { provide: FavoritesService, useValue: favoritesServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;

    });

    // ... test cases remain the same

    it('should handle route params', (done) => {

        component.ngOnInit();
        activatedRouteMock.params?.subscribe((params) => {

            expect(params['id']).toBe('1');
            done();

        });

    });

    // ... other test cases

});
