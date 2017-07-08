import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class CustomStorage implements Storage {
    constructor( @Inject(PLATFORM_ID) private platformId: Object) { }

    [index: number]: string;
    [key: string]: any;
    length: number;

    clear(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
        else {
            for (var variableKey in this) {
                if (this.hasOwnProperty(variableKey)) {
                    delete this[variableKey];
                }
            }
        }
    }

    getItem(key: string): string {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key);
        }
        else {
            return this[key];
        }
    }

    key(index: number): string {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.key(index);
        }
        else {
            return this[index];
        }
    }

    removeItem(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(key);
        }
        else {
            delete this[key];
        }
    }

    setItem(key: string, data: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, data);
        }
        else {
            this[key] = data;
        }
    }
}