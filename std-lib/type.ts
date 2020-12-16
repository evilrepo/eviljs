import {assertObject} from './assert.js'

export const Tests = {
    array: isArray,
    boolean: isBoolean,
    date: isDate,
    dateIsoUtcString: isDateIsoUtcString,
    dateString: isDateString,
    function: isFunction,
    integer: isInteger,
    nil: isNil,
    null: isNull,
    number: isNumber,
    object: isObject,
    promise: isPromise,
    regexp: isRegExp,
    string: isString,
    undefined: isUndefined,
}

export function bindValue(value: unknown, ctx: any) {
    if (isFunction(value)) {
        return value.bind(ctx, ctx)
    }

    return value
}

export function kindOf<T extends keyof typeof Tests>(value: unknown, ...tests: Array<T>) {
    for (const kind of tests) {
        if (Tests[kind](value)) {
            return kind
        }
    }
    return
}

export function isArray(value: unknown): value is Array<unknown> {
    if (! value || ! Array.isArray(value)) {
        return false
    }
    return true
}

export function isBoolean(value: unknown): value is boolean {
    return value === true || value === false
}

export function isDate(value: unknown): value is Date {
    if (! value || ! (value instanceof Date)) {
        return false
    }
    return true
}

export function isDateString(value: any): value is string {
    if (! value || ! Boolean(Date.parse(value))) {
        return false
    }
    return true
}

export function isDateIsoUtcString(value: unknown): value is string {
    if (! isString(value)) {
        return false
    }

    const isoMarker = 't'
    const utcZone = 'z'
    const valueLowerCase = value.toLowerCase()
    const includesIsoMarker = valueLowerCase.includes(isoMarker)
    const includesUtcZone = includesIsoMarker && valueLowerCase.includes(utcZone)
    const isIsoUtcString = includesUtcZone

    return isIsoUtcString
}

export function isFunction(value: unknown): value is Function {
    if (! value || typeof value !== 'function') {
        return false
    }
    return true
}

export function isInteger(value: unknown): value is number {
    return Number.isInteger(value as any)
    // 0 is a valid number but evaluates to false.
}

export function isNil(value: unknown): value is null | undefined {
    return isUndefined(value) || isNull(value)
}

export function isNull(value: unknown): value is null {
    return value === null
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number'
    // 0 is a valid number but evaluates to false.
}

export function isObject(value: unknown): value is Record<string | number | symbol, unknown> {
    if (! value || Object.getPrototypeOf(value).constructor !== Object) {
        return false
    }
    return true
}

export function isPromise(value: unknown): value is Promise<unknown> {
    if (! value || ! (value instanceof Promise)) {
        return false
    }
    return true
}


export function isRegExp(value: unknown): value is RegExp {
    if (! value || ! (value instanceof RegExp)) {
        return false
    }
    return true
}

export function isString(value: unknown): value is string {
    return typeof value === 'string'
    // '' is a valid string but evaluates to false.
}

export function isUndefined(value: unknown): value is undefined {
    return value === void undefined
}

export function objectWithout<O, P extends keyof O>(object: O, ...props: Array<P>) {
    assertObject(object, 'object')

    const obj = {...object}

    for (const prop of props) {
        delete obj[prop]
    }

    return obj as Omit<O, P>
}

export function objectWithoutUndefined<O>(object: O) {
    assertObject(object, 'object')

    const obj = {...object}

    for (const prop in obj) {
        if (isUndefined(obj[prop])) {
            delete obj[prop]
        }
    }

    return obj
}

export function asArray<T>(item: T | Array<T> | [T] | readonly [T]) {
    return isArray(item)
        ? item as Array<T>
        : [item] as Array<T>
}

// Types ///////////////////////////////////////////////////////////////////////

export type ValueOf<T> = T[keyof T]

export type ElementOf<A extends Array<unknown>> =
    A extends Array<infer T>
        ? T
        : never

export type PromiseOf<T extends Promise<unknown>> =
    T extends Promise<infer R>
        ? R
        : never

export type UnionFrom<T extends Array<unknown>> = T[number]
