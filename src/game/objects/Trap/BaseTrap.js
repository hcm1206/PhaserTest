import Phaser from "phaser";

export default class BaseTrap extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.initTrap();
    }

    initTrap() {
        this.setOrigin(0.5, 0.5);
    }
}