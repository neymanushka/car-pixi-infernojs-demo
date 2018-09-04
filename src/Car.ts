import { MathHelper } from "./MathHelper";
import { Vector2 } from "./Vector2";

class Car {
    sprite: PIXI.Sprite;
    position: Vector2;
    velocity: Vector2;

    angle: number;
    angularVelocity: number;
    accel: number;
    max_velocity: number;
    steering: number;
    max_steering: number;
    max_accel: number;
    length: number;

    frames: PIXI.Texture[];

    constructor(x, y, tex) {
        this.sprite = new PIXI.Sprite(tex['car_0000.png']);
        this.sprite.x = x;
        this.sprite.y = y;
        this.position = new Vector2(x, y);
        this.accel = 0;
        this.velocity = new Vector2();
        this.angle = 0;
        this.max_velocity = 10;
        this.max_steering = 30;
        this.max_accel = 5;
        this.steering = 0;
        this.length = 5;

        this.frames = [];
        this.frames.push(tex['car_0000.png']);
        for (let i = 31; i >= 0; i--) {
            let str = "" + i;
            this.frames.push(tex['car_' + '0000'.substring(0, 4 - str.length) + str + '.png']);
        }
    }
    update(delta) {
        this.velocity = Vector2.add(this.velocity, new Vector2(this.accel, 0));
        this.accel = 0;
        this.velocity.x = Math.max(-this.max_velocity, Math.min(this.velocity.x, this.max_velocity));

        let angular_velocity = 0;
        if (this.steering) {
            let turning_radius = this.length / Math.tan(MathHelper.toRadians(this.steering));
            angular_velocity = this.velocity.x / turning_radius;
        }

        this.position = Vector2.add(this.position, Vector2.mul(Vector2.rotate(this.velocity, this.angle), delta));
        this.angle += MathHelper.toDegrees(angular_velocity) * delta;

        this.sprite.x = this.position.x - this.position.y;
        this.sprite.y = (this.position.x + this.position.y) / 1.75;

        if (this.angle < 0) this.angle = 6.28 + this.angle;
        if (this.angle > 6.28) this.angle -= 6.28;
        let frame = Math.floor(this.angle / (6.28 / 32));
        this.sprite.texture = this.frames[frame];
    }
};


export { Car };