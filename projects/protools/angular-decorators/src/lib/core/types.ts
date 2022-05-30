export interface StatelessComponentOptions {
    excludeMethods?: string[];
    debug?: boolean; 
}

export interface InternalOptions {
    excludeMethods: string[];
    debug: boolean; 
}

export type TExtender = new (...args: any[]) => {};