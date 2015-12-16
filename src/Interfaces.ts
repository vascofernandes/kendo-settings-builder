
export interface Action<T> {
	(x: T): void;
}

export interface Func<Tin, Tout> {
	(x: Tin): Tout;
}

export interface ITyped {
    Types: {};
}
