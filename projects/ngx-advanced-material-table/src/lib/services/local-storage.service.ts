import { Injectable } from '@angular/core';

/**
 * Comunication with the localStorage
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    constructor() {}

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    get(key: string): any {
        return localStorage.getItem(key);
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    setAsJson(localStorageKey: string, state: any, replacer?: (number | string)[]): void {
        localStorage.setItem(localStorageKey, JSON.stringify(state, replacer));
    }

    getAsJson(localStorageKey: string): any {
        let storedValue = localStorage.getItem(localStorageKey);
        return storedValue ? JSON.parse(storedValue) : null;
    }

    exists(localStorageKey: string): boolean {
        if (localStorage.getItem(localStorageKey)) {
            return true;
        } else {
            return false;
        }
    }
}
