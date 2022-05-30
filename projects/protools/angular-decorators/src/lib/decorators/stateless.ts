import { Logger } from "../core/logger";
import { StatelessComponentOptions, TExtender } from "../core/types";
import { addPrototypeWatcher, addPropertyDesc, toInternalOptions } from "../core/utils";

/**
 * Makes an Angular component stateless.
 */
export function StatelessComponent(options?: StatelessComponentOptions) {
    const opts = toInternalOptions(options);
    const logger = new Logger(opts.debug);
    return function Def<Target extends TExtender>(target: Target) {

        if (!(target as any).ɵcmp) {
            logger.error(`${target.name} is not an Angular component. Add @Component decorator to the ${target.name}`);
            return;
        }

        let inputs = (target as any).ɵcmp.inputs;

        return class Extender extends target {
            constructor(...args: any[]) {
                super(...args);
                let self = this;
                addPrototypeWatcher(target, self, opts);
                addPropertyDesc(inputs, self, target, opts, logger);
            };
        }

    }
}