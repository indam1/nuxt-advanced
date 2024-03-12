export function getValues<T extends Record<string, any>>(obj: T) {
    return Object.values(obj) as [(typeof obj)[keyof T]];
}

export function getKeys<T extends Record<string, any>>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}

export function hasErrorMessage(error: any) {
    return typeof error === 'object' && error && 'message' in error && typeof error.message === 'string';
}
