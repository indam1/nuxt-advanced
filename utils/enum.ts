export function getValues<T extends Record<string, any>>(obj: T) {
    return Object.values(obj) as [(typeof obj)[keyof T]];
}

export function getKeys<T extends Record<string, any>>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}

export function hasErrorMessage(e: unknown): e is { message: string } {
    return typeof e === 'object' && !!e && 'message' in e && typeof e.message === 'string';
}
