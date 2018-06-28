'use strict';

import Pair from './Pair';

export interface IDictionary {
    push(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    get(key: string): any;
    indexOfKey(key: string, fromIndex?: number): number;
    indexOfValue(value: any, fromIndex?: number): number;
    keys(): string[];
    forEach(callbackfn: (value: Pair, index: number, array: Pair[]) => void, thisArg?: any): void;
    count(): number;
    clear(): void;
    isEmpty(): boolean;
}

export default class Dictionary implements IDictionary {
    private _keys: string[] = [];
    private _values: any[] = [];
    private _pairs: Pair[] = [];

    [index: string]: any;

    constructor(dico?: Pair[]) {
        if (dico !== undefined && dico.length > 0) {
            dico.forEach(entry => {
                this.push(entry.key, entry.value);
            })
        }
    }

    push(key: string, value: any): void {
        this[key] = value;
        this._pairs.push(new Pair(key, value));

        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string): void {
        var index = this._keys.indexOf(key, 0);

        this._pairs.splice(index, 1);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    indexOfKey(key: string, fromIndex?: number): number {
        return this._keys.indexOf(key, fromIndex);
    }

    indexOfValue(value: any, fromIndex?: number): number {
        return this._values.indexOf(value, fromIndex);
    }

    keys(): string[] {
        return this._keys;
    }

    get(key: string): any {
        return this.containsKey(key) ? this._values[this._keys.indexOf(key)] : undefined;
    }

    containsKey(key: string): boolean {
        return !(typeof this[key] === "undefined");
    }

    forEach(callbackfn: (value: Pair, index: number, array: Pair[]) => void, thisArg?: any): void {
        this._pairs.forEach(callbackfn, thisArg);
    }

    count(): number {
        return this._pairs.length;
    }

    clear(): void {
        this._keys.splice(0, this._keys.length);
        this._values.splice(0, this._values.length);
        this._pairs.splice(0, this._pairs.length);
    }

    isEmpty(): boolean {
        return this._keys.length === 0;
    }

    toLookup(): IDictionary {
        return this;
    }
}