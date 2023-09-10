import { Projectile } from "../entities/Projectile.js";
import { eventEmitter } from "../core/EventEmitter.js";

class ProjectileManager {
    constructor() {
        this.projectiles = [];


        eventEmitter.on('projectileCreated', (projectile) => {
            console.log('projectiles created listened')
            this.addProjectile(projectile);
        });
    }

    createProjectile(x1, y1, x2, y2, v) {
        return new Projectile(x1, y1, x2, y2, v);
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    updateProjectiles() {
        this.projectiles.forEach(projectile => projectile.update());
    }

    renderProjectiles(app) {
        this.projectiles.forEach(projectile => projectile.render(app));
    }
}


export { ProjectileManager };