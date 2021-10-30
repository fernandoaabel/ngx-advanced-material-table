import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Comunication with the localStorage
 */
export class LocalStorageService {
    set(key, value) {
        localStorage.setItem(key, value);
    }
    get(key) {
        return localStorage.getItem(key);
    }
    remove(key) {
        localStorage.removeItem(key);
    }
    setAsJson(localStorageKey, state, replacer) {
        localStorage.setItem(localStorageKey, JSON.stringify(state, replacer));
    }
    getAsJson(localStorageKey) {
        let storedValue = localStorage.getItem(localStorageKey);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    exists(localStorageKey) {
        if (localStorage.getItem(localStorageKey)) {
            return true;
        }
        else {
            return false;
        }
    }
}
LocalStorageService.ɵfac = function LocalStorageService_Factory(t) { return new (t || LocalStorageService)(); };
LocalStorageService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LocalStorageService, factory: LocalStorageService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LocalStorageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFkdmFuY2VkLW1hdGVyaWFsLXRhYmxlL3NyYy9saWIvc2VydmljZXMvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDOztHQUVHO0FBRUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM1QixHQUFHLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDMUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ1gsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVztRQUNkLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFNBQVMsQ0FBQyxlQUF1QixFQUFFLEtBQVUsRUFBRSxRQUE4QjtRQUN6RSxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxTQUFTLENBQUMsZUFBdUI7UUFDN0IsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3hELENBQUM7SUFFRCxNQUFNLENBQUMsZUFBdUI7UUFDMUIsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7c0ZBNUJRLG1CQUFtQjt5RUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQixtQkFETixNQUFNO3VGQUNuQixtQkFBbUI7Y0FEL0IsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb211bmljYXRpb24gd2l0aCB0aGUgbG9jYWxTdG9yYWdlXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2VydmljZSB7XG4gICAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldChrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH1cblxuICAgIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIHNldEFzSnNvbihsb2NhbFN0b3JhZ2VLZXk6IHN0cmluZywgc3RhdGU6IGFueSwgcmVwbGFjZXI/OiAobnVtYmVyIHwgc3RyaW5nKVtdKTogdm9pZCB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsU3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkoc3RhdGUsIHJlcGxhY2VyKSk7XG4gICAgfVxuXG4gICAgZ2V0QXNKc29uKGxvY2FsU3RvcmFnZUtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgbGV0IHN0b3JlZFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlS2V5KTtcbiAgICAgICAgcmV0dXJuIHN0b3JlZFZhbHVlID8gSlNPTi5wYXJzZShzdG9yZWRWYWx1ZSkgOiBudWxsO1xuICAgIH1cblxuICAgIGV4aXN0cyhsb2NhbFN0b3JhZ2VLZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxTdG9yYWdlS2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=