import * as i0 from "@angular/core";
/**
 * Comunication with the localStorage
 */
export declare class LocalStorageService {
    set(key: string, value: string): void;
    get(key: string): any;
    remove(key: string): void;
    setAsJson(localStorageKey: string, state: any, replacer?: (number | string)[]): void;
    getAsJson(localStorageKey: string): any;
    exists(localStorageKey: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageService>;
}
