import * as PIXI from "pixi.js";
import { Component } from 'inferno';
import { Car } from './Car';
import { Speedometer } from './Speedometer';
import { Transmission } from './Transsmission';
import { Panel } from './Panel';

class PIXIComponent extends Component {
    app: any;
    pixi: any;
    car: Car;
    land: PIXI.Sprite;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;

    public state = {
        speed: 1,
        direction: 'S'
    };

    constructor(props) {
        super(props);
        this.pixi = null;
        this.app = new PIXI.Application(window.innerWidth, window.innerHeight,
            {
                backgroundColor: 0x4EC0CA
            }
        );
        this.up = false;
    }
    updatePIXI = (element) => {
        this.pixi = element;
        if (this.pixi && this.pixi.children.length <= 0) {
            this.pixi.appendChild(this.app.view);
            this.setup();
        }
    }
    setup = () => {
        PIXI.loader
            .add("land", "sprites/land.png")
            .add("car", "sprites/car.json")
            .load(this.initialize);
    };
    initialize = () => {
        this.car = new Car(800, 0, PIXI.loader.resources["car"].textures);
        this.land = new PIXI.Sprite(PIXI.loader.resources["land"].texture);
        this.app.stage.addChild(this.land);
        this.app.stage.addChild(this.car.sprite);
        this.app.ticker.add(this.gameLoop, this);

        window.addEventListener("keydown", (event) => { this.onButtonDownHandler(event); });
        window.addEventListener("keyup", (event) => { this.onButtonUpHandler(event); });
    };

    onButtonUpHandler = ( event ) => {
        if (event.keyCode == 38) this.up = false;
        if (event.keyCode == 40) this.down = false;
        if (event.keyCode == 37) this.left = false;
        if (event.keyCode == 39) this.right = false;
    };

    onButtonDownHandler = ( event ) =>{
        this.state.direction = '';
        if (event.keyCode == 38 && !this.up) {
            this.up = true;
            this.car.accel = 1;
            this.state.direction += 'F';
        }
        if (event.keyCode == 40) {
            this.down = true;
            this.car.accel = -1;
            this.state.direction += 'B';
        }
        if (event.keyCode == 37) {
            this.left = true;
            this.car.steering -= 0.3;
            this.state.direction += 'L';
        }
        if (event.keyCode == 39) {
            this.right = true;
            this.car.steering += 0.3;
            this.state.direction = 'R';
        }
    };

    gameLoop = (delta) => {

        let direction = '';
        this.setState({ speed: Math.round(this.car.velocity.x) });
        if (this.state.speed == 0) direction = 'S';
        else {
            if (this.state.speed > 0) direction = 'F';
            else direction = 'B';
        }
        if (!this.left && !this.right) this.car.steering = 0;
        else {
            if (this.car.steering > 0) direction += 'R'
            else direction += 'L'
        }
        this.setState({ direction: direction });

        this.car.update(delta);
    };

    leftButtonHandler = () => {
        console.log("pressed");
    };

    render() {
        return (
            <div>
                <div ref={this.updatePIXI} />
                <Speedometer speed={this.state.speed} />
                <Transmission value={this.state.direction} />
                <Panel c={this} />
            </div>
        );
    }
}

export { PIXIComponent };