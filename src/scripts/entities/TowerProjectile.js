import { Projectile } from "./Projectile.js";


class TowerProjectile extends Projectile {
    constructor(x, y, targetX, targetY) {
        super(x, y, targetX, targetY);
    }

    update() {
        super.update();
    }

    render(app) {
        super.render(app);
    }
}


export { TowerProjectile };