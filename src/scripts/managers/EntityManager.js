import { Enemy } from '../entities/Enemy.js';
import { Tower } from '../entities/Tower.js';
import { TowerBase } from '../entities/TowerBase.js';
import { TowerWeapon } from '../entities/TowerWeapon.js';
import { TowerUpgradeUI } from '../ui/TowerUpgradeUI.js';
import { Projectile } from '../entities/Projectile.js';
import { spriteLoader } from '../core/SpriteLoader.js';
import { TowerAssets } from '../assetsConfig/towers/config.js';
import { eventEmitter } from "../core/EventEmitter";
import { GameConfig } from '../core/GameConfig.js'
import { calculateDistance, isWithinRadius } from '../utils/helpers.js';
import mapLayout from '../../assets/sprites/map/GameMapLayout.json';
import { sounds } from '../assetsConfig/tracks/config.js';

class EntityManager {
    constructor() {
        this.enemies = [];
        this.towers = [];
        this.projectiles = [];
        this.impactEffects = [];

        // maps enemy path names to their path
        this.enemyPaths = {
            'enemyPathA': mapLayout.enemyPathA,
            'enemyPathB': mapLayout.enemyPathB,
            'enemyPathC': mapLayout.enemyPathC,
        };

        // property for the active TowerUpgradeUI
        this.activeTowerUpgradeUI = null;
    }

    updateEntities() {
        // Place your existing update logic here
        this.updateEnemies();
        this.updateTowers();
        this.updateProjectiles();
        this.updateImpactEffects();
    }

    renderEntities(stage) {
        // Place your existing render logic here
        this.renderEnemies(stage);
        this.renderTowers(stage);
        this.renderProjectiles(stage);
        this.renderImpactEffects(stage);

        if (this.activeTowerUpgradeUI) {
            this.activeTowerUpgradeUI.render(stage);
        }
    }


    addTower(mousePosition, stage) {
        const newTower = this.createTower('stone', 1, 'catapult', 1);
        newTower.setPosition(mousePosition.x, mousePosition.y);
        
        sounds.towerSpawnSFX.play();
        // Make the sprite interactive
        newTower.base.sprite.eventMode = 'static';
        
        newTower.base.sprite.on('pointerdown', () => {
            if (this.activeTowerUpgradeUI) {
                // Remove existing upgrade UI if it matches the clicked tower
                if (this.activeTowerUpgradeUI.tower === newTower) {
                    stage.removeChild(this.activeTowerUpgradeUI.container);
                    this.activeTowerUpgradeUI = null;
                    return;
                }
                // Remove existing upgrade UI if it is different from the clicked tower
                stage.removeChild(this.activeTowerUpgradeUI.container);
            }


            // Create and show new upgrade UI
            this.activeTowerUpgradeUI = new TowerUpgradeUI(newTower);
        });
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    renderEnemies(stage) {
        this.enemies.forEach(enemy => enemy.render(stage));
    }

    renderTowers(stage) {
        this.towers.forEach(tower => tower.render(stage));
    }

    renderProjectiles(stage) {
        this.projectiles.forEach(projectile => projectile.render(stage));
    }


    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];
            enemy.update();

            if (enemy.health <= 0) {
                // remove this enemy from the array
                this.enemies.splice(i, 1);
                i--;
                eventEmitter.emit('goldGained', 5);
                eventEmitter.emit('enemyKilled');
                
            }

            if (this.enemyReachedEnd(enemy)) {
                this.enemies.splice(i, 1);
                i--;
                eventEmitter.emit('enemyReachedEnd');
            }
        }

    }

    /**
     * @desc updates the rendering of the towers
     */
    updateTowers() {    
        for (const tower of this.towers) {
            // Initialize variables to keep track of the closest enemy
            let closestEnemy = null;
            let closestDistance = Infinity;
            
            // Loop through all enemies to find the closest one
            for (const enemy of this.enemies) {
                if (isWithinRadius(tower.x, tower.y, enemy.x, enemy.y, tower.weapon.radius)) {
                    
                    const distance = calculateDistance(tower.x, tower.y, enemy.x, enemy.y);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestEnemy = enemy;
                    }
                }
            }

            // If a closest enemy is found and the tower is not reloading, shoot at it
            if (closestEnemy && !tower.weapon.isReloading) {
                console.log('SHOOTING');
                // Create and add a projectile here
                console.log(tower.weapon.type);
                const projectile = new Projectile(tower, closestEnemy, tower.weapon.type, tower.weapon.level);
                this.addProjectile(projectile);
                tower.weapon.playShootAnimation();
                sounds.boltShotSFX.play();
                tower.weapon.setCooldown(1000);  // Set to 1 second 
            }
        }
    }

    updateProjectiles() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update();
      
            // Logic to remove projectile if projectile reached target
            if (this.isProjectileReachedTarget(projectile)) {
                // play impact effect
                this.playImpactEffect(projectile.x, projectile.y);
                sounds.enemyHitSFX.play();
                this.projectiles.splice(i, 1);
                
                
            }
        }
    }


    spawnEnemies(round=1) {
        // compute the number of enemies to spawn.
        const numberEnemies = Math.floor(Math.random() * (round * 2));
        for (let i = 0; i < numberEnemies; i++) {
            const xOffset = i * 100 * Math.random();
            const path = this.getRandomPath();
            const newEnemy = new Enemy(path[0].x + xOffset, path[0].y, 1, path);
            newEnemy.health += round * 5;
            this.enemies.push(newEnemy);
        }
    }
    
    // ENEMIES //
    /**
     * @desc get a random path for an enemy to follow
     * @returns 
     */
    getRandomPath() {
        // get all available paths
        const paths = Object.keys(this.enemyPaths);
        // randomly pick a path
        const randomKey = paths[Math.floor(Math.random() * paths.length)];
        // return the selected path
        return this.enemyPaths[randomKey];
    }

    /**
     * @desc Check if an enemy has reached the end of the path
     * @param {Object} enemy - Enemy entity object to be checked
     * @returns {boolean} returns whether the enemy has reached end or not
     */
    enemyReachedEnd(enemy) {
        // boundaries for the end zone.
        const xMin = 50;
        const xMax = 110;
        const yMin = 540;
        const yMax = 580;

        // check if the enemy has reached the end
        if (enemy.x >= xMin && enemy.x <= xMax && enemy.y >= yMin && enemy.y <= yMax) {
            return true;
        }

        return false;
    }

    // END OF ENEMIES 

    // TOWERS ///////////////////////////////////

    /**
     * @desc creates a Tower object and adds it to the towers array.
     * @param {string} baseType - the type of the base of the tower.
     * @param {integer} baseLevel - the level of the base of the tower.
     * @param {string} weaponType - the weapon type of the tower.
     * @param {integer} weaponLevel - the level of the weapon of the tower.
     * @returns {Tower} - Tower object
     */
    createTower(baseType, baseLevel, weaponType, weaponLevel) {
        // if (!this.isValidBaseType(baseType) || !this.isValidWeaponType(weaponType))
        // create new tower base and tower weapon object
        const base = new TowerBase(baseType, baseLevel);
        const weapon = new TowerWeapon(weaponType, weaponLevel);
        // create new tower object with the newly created base and weapon
        const tower = new Tower(base, weapon);
        // add the newly created tower to the towers array
        this.towers.push(tower);

        return tower;
    }


    // IMPACT EFFECT // 
    playImpactEffect(x, y) {
        const impactSprite = spriteLoader.loadAnimatedSprite(
            TowerAssets.impacts.bolt.data,
            TowerAssets.impacts.bolt.texture
        );
    
        impactSprite.x = x;
        impactSprite.y = y;
        impactSprite.animationSpeed = 0.1; // You can adjust this value
        impactSprite.loop = false;
        impactSprite.anchor.set(0.5);

        // Add the sprite to a list of impact effects to be rendered
        this.impactEffects.push(impactSprite);

    }


    updateImpactEffects() {
        for (const effect of this.impactEffects) {
            if (!effect.added) {
                // custom flag to prevent re-adding
                effect.added = true; 
                effect.play();
            }
    
            if (effect.completed) {
                this.app.stage.removeChild(effect);
            }
        }
        
        
        // Filter out completed impact effects
        this.impactEffects = this.impactEffects.filter(effect => !effect.completed);

        
    }

    renderImpactEffects(stage) {
        for (const effect of this.impactEffects) {
            if (!effect.parent) {
                stage.addChild(effect);
            }
        }
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    updateProjectiles() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update();
      
            // Logic to remove projectile if projectile reached target
            if (this.isProjectileReachedTarget(projectile)) {
                // play impact effect
                this.playImpactEffect(projectile.x, projectile.y);
                sounds.enemyHitSFX.play();
                this.projectiles.splice(i, 1);
                
                
            }
        }
    }

    renderProjectiles(app) {
        this.projectiles.forEach(projectile => projectile.render(app));
    }


    isProjectileReachedTarget(projectile) {
        const target = projectile.target; // Assuming each projectile keeps track of its target
        
        // If the target is null or undefined, remove the projectile
        if (!target) {
          return true;
        }
      
        if (isWithinRadius(projectile.x, projectile.y, target.x, target.y, projectile.radius)) {
          // decrease damage
          target.decreaseHealth(20);
          // remove projectile
          return true; 
        }
        
        // keep projectile
        return false; 
    }
}


export { EntityManager };