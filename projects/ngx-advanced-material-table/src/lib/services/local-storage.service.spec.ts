import { LocalStorageService } from './local-storage.service';
import { TestBed } from '@angular/core/testing';

describe('local Storage', () => {
    let service: LocalStorageService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalStorageService],
        });

        service = TestBed.get(LocalStorageService);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    describe('set', () => {
        const dummyKey = 'dummy';
        it('should store the token in localStorage', () => {
            service.set(dummyKey, 'sometoken');
            expect(service.get(dummyKey)).toEqual('sometoken');
        });
    });
    describe('get', () => {
        const dummyKey = 'dummy';
        it('should return stored token from localStorage', () => {
            service.set(dummyKey, 'anothertoken');

            expect(service.get(dummyKey)).toEqual('anothertoken');
        });
    });

    describe('setAsJson', () => {
        const dummyKey = 'dummy';
        it('should store the token in localStorage', () => {
            service.setAsJson(dummyKey, { name: 'somename' });
            expect(service.getAsJson(dummyKey)).toEqual({ name: 'somename' });
        });
    });
    describe('getAsJson', () => {
        const dummyKey = 'dummy';
        it('should return stored token from localStorage', () => {
            service.setAsJson(dummyKey, { name: 'anothername' });
            expect(service.getAsJson(dummyKey)).toEqual({ name: 'anothername' });
        });
    });
});
