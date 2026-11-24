import Phaser from "phaser";

export default class BasePlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, hitbox = true) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.initPlatform(hitbox);
    }

    initPlatform(hitbox) {
        this.setOrigin(0.5, 0.5);
        this.body.updateFromGameObject();

        if (!hitbox) {
            this.disableBody(true, false);
        }
    }
}