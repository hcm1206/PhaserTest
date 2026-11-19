import BaseTrap from "./BaseTrap";

export default class DebugTrap extends BaseTrap {
    constructor(scene, x, y) {
        super(scene, x, y, 'debug_trap');
    }
}