const Potion = require('./Potion');
const Character = require('./Character');

// enemy object properties
// function Enemy(name, weapon) {
//     this.name = name;
//     this.weapon = weapon;
//     this.potion = new Potion();

//     this.health = Math.floor(Math.random() * 10 + 85);
//     this.strength = Math.floor(Math.random() * 5 + 5);
//     this.agility = Math.floor(Math.random() * 5 + 5);
// }

// convert constructor to ES6
class Enemy extends Character {
    constructor(name, weapon) {
        // call parent constructor here:
        super(name);
        
        this.weapon = weapon;
        this.potion = new Potion();


    }

    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }
}

// inherit prototype methods from Character here:
// Enemy.prototype = Object.create(Character.prototype);

// enemy object methods
// Enemy.prototype.getHealth = function() {
//     return `The ${this.name}'s health is now ${this.health}!`;
// };

// Enemy.prototype.isAlive = function() {
//     if (this.health === 0) {
//         return false;
//     }
//     return true;
// };

// Enemy.prototype.getAttackValue = function() {
//     const min = this.strength - 5;
//     const max = this.strength + 5;

//     return Math.floor(Math.random() * (max - min) + min);
// };

// Enemy.prototype.reduceHealth = function(health) {
//     this.health -= health;

//     if(this.health < 0) {
//         this.health = 0;
//         // remember, the above is a conditional to ensure that the health never goes negative
//     }
// };

// Enemy.prototype.getDescription = function() {
//     return `A ${this.name} holding a ${this.weapon} has appeared!`;
// };

module.exports = Enemy;