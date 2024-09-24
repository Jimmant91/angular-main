import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { UsersService, UserImageService, FavoritesService, User } from '@angular-task/shared/services';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserProfileComponent', () => {

    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;
    let usersServiceMock: jest.Mocked<UsersService>;
    let userImageServiceMock: jest.Mocked<UserImageService>;
    let favoritesServiceMock: jest.Mocked<FavoritesService>;
    let activatedRouteMock: Partial<ActivatedRoute>;

    const mockUser: User = {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@example.com',
        phone: '1234567890',
        website: 'https://example.com',
        company: {
            name: 'Test Company',
            catchPhrase: 'Test Catch Phrase',
            bs: 'Test BS'
        },
        address: {
            street: 'Test Street',
            suite: 'Test Suite',
            city: 'Test City',
            zipcode: '12345',
            geo: {
                lat: '0',
                lng: '0'
            }
        }
    };

    beforeEach(async () => {

        usersServiceMock = {
            getUserById: jest.fn().mockReturnValue(of(mockUser))
        } as unknown as jest.Mocked<UsersService>;

        userImageServiceMock = {
            getAvatarForUser: jest.fn().mockReturnValue('avatar-url')
        } as unknown as jest.Mocked<UserImageService>;

        favoritesServiceMock = {
            toggleFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false)
        } as unknown as jest.Mocked<FavoritesService>;

        const mockActivatedRouteSnapshot: Partial<ActivatedRouteSnapshot> = {
            paramMap: convertToParamMap({ id: '1' }),
            queryParamMap: convertToParamMap({}),
            params: { id: '1' },
            queryParams: {},
            url: [],
            fragment: null,
            data: {},
            outlet: 'primary',
            component: null,
            routeConfig: null,
            root: {} as ActivatedRouteSnapshot,
            parent: null,
            firstChild: null,
            children: [],
            pathFromRoot: []
        };

        activatedRouteMock = {
            snapshot: mockActivatedRouteSnapshot as ActivatedRouteSnapshot
        };

        await TestBed.configureTestingModule({
            imports: [
                UserProfileComponent,
                NoopAnimationsModule  // Add this line
            ],
            providers: [
                { provide: UsersService, useValue: usersServiceMock },
                { provide: UserImageService, useValue: userImageServiceMock },
                { provide: FavoritesService, useValue: favoritesServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    it('should get avatar for user', () => {

        const avatar = component.getAvatarForUser('Test User');
        expect(userImageServiceMock.getAvatarForUser).toHaveBeenCalledWith('Test User');
        expect(avatar).toBe('avatar-url');

    });

    it('should toggle favorite', () => {

        component.toggleFavorite(1);
        expect(favoritesServiceMock.toggleFavorite).toHaveBeenCalledWith(1);

    });

    it('should check if user is favorite', () => {

        const isFavorite = component.isFavorite(1);
        expect(favoritesServiceMock.isFavorite).toHaveBeenCalledWith(1);
        expect(isFavorite).toBe(false);

    });

    it('should fetch user data on initialization', () => {

        fixture.detectChanges(); // This triggers the component's initialization logic
        expect(usersServiceMock.getUserById).toHaveBeenCalledWith(1);
        expect(component.user).toEqual(mockUser);

    });

});
