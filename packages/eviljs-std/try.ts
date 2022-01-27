import {isNil} from './type.js'

export function tryCatch<R>(fn: TryOrFn<R>, onError?: undefined, onEnd?: undefined | (() => void)): undefined | R
export function tryCatch<R, F>(fn: TryOrFn<R>, onError: TryOnError<F>, onEnd?: undefined | (() => void)): R | F
export function tryCatch<R, F>(fn: TryOrFn<R>, onError?: undefined | TryOnError<F>, onEnd?: undefined | (() => void)): undefined | R | F
export function tryCatch<R, F>(
    fn: TryOrFn<R>,
    onError?: undefined | TryOnError<F>,
    onEnd?: undefined | (() => void),
): undefined | R | F {
    try {
        return fn()
    }
    catch (error: unknown) {
        return onError?.(error)
    }
    finally {
        onEnd?.()
    }
}

export function tryOrValue<R, F>(
    fn: TryOrFn<R>,
    fallback: F,
    onError?: undefined | TryOnError<void>,
): R | F {
    return tryCatch(fn, (error) => {
        onError?.(error)
        return fallback
    })
}

export function tryOrNull<R>(
    fn: TryOrFn<R>,
    onError?: undefined | TryOnError<void>,
): R | null {
    return tryOrValue(fn, null, onError)
}

export function tryMap<I, R>(
    items: TryMapArgItems<I>,
    fn: TryMapArgFn<I, R>,
    onError?: undefined | TryOnError<void>,
): Array<R> {
    if (! items) {
        return []
    }

    const itemsWithNulls = items.map((it, idx) =>
        tryOrNull(() => fn(it, idx), onError)
    )
    const itemsWithoutNulls = itemsWithNulls.filter(it => ! isNil(it)) as Array<R>

    return itemsWithoutNulls
}

// Types ///////////////////////////////////////////////////////////////////////

export type TryOnError<R = void> = (error: unknown) => R
export type TryOrFn<R> = () => R
export type TryMapArgItems<I> = undefined | null | Array<I>
export type TryMapArgFn<I, R> = (it: I, idx: number) => undefined | null | R
