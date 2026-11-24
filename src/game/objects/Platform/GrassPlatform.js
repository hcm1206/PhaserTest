import BasePlatform from "./BasePlatform";

export default class GrassPlatform extends BasePlatform {
    constructor(scene, x, y, hitbox) {
        super(scene, x, y, 'grass_platform', hitbox);
    }
}