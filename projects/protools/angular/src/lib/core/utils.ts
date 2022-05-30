import { Logger } from "./logger";
import { InternalOptions } from "./types";

export const FLAG_NAME = 'allow-property-update';
export const VALUE_PREFIX = 'stateless-';

function watcher(fn: any, target: any) {
    return function (...args: any[]) {
        target[FLAG_NAME] = true;
        let result = fn.apply(target, ...args);
        return result;
    }
}

/**
 * Adds watcher to the methods.
 * @param target 
 * @param instance 
 */
export function addPrototypeWatcher(target: any, instance: any, options: InternalOptions) {
    let exclude = [...["constructor", "ngOnInit"], ...options.excludeMethods];
    let props = target.prototype;
    let fns = Object.getOwnPropertyNames(props).filter(x => !exclude.includes(x));
    fns.forEach(fn => {
        let oldFn = target.prototype[fn];
        target.prototype[fn] = watcher(oldFn, instance);
    });
}

/**
 * Adds property descriptor.
 * @param inputs 
 * @param self 
 * @param target 
 */
export function addPropertyDesc(inputs: string[], self: any, target: any, options: InternalOptions, logger: Logger) {
    for (let input in inputs) {
        Object.defineProperty(self, input, {
            get: function () {
                return self[VALUE_PREFIX + input + 'value'];
            },
            set: function (e) {

                if ((self as any)[FLAG_NAME]) {
                    (self as any)[FLAG_NAME] = false;
                    logger.error(`Cannot modify input property ${input} since the class ${target.name} is marked stateless.`);
                    return;
                }

                self[VALUE_PREFIX + input + 'value'] = e;
            }
        });
    }
}

export function toInternalOptions(op: any = {}): InternalOptions {
    const def = { debug: true, excludeMethods: [] }

    for (var prop in def) {
        if (op[prop] !== undefined) {
            (def as any)[prop] = op[prop];
        }
    }

    return def;
}