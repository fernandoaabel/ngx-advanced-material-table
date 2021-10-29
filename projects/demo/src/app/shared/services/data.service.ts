import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Person {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthday: '2017-10-08';
    gender: string;
    address: {
        street: string;
        streetName: string;
        buildingNumber: string;
        city: string;
        zipcode: string;
        country: string;
        county_code: string;
        latitude: 25.443113;
        longitude: -157.105534;
    };
    website: string;
    image: string;
}

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private http: HttpClient) {}

    getAll(quantity: number = 1000): Observable<Person[]> {
        // https://fakerapi.it/en
        const url = `https://fakerapi.it/api/v1/persons?_locale=en_US&_quantity=${quantity}`;

        return this.http.get<Person[]>(url).pipe(map((res: any) => res.data));
    }
}
