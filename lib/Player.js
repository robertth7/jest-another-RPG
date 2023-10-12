const Potion = require('../lib/Potion');

// Write a Player Constructor to Pass the Test
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    this.inventory = [new Potion('health'), new Potion()];
}

// returns an object with varous player properties 
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength, 
        agility: this.agility
    };
};

// returns the inventory array or false if empty
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};

Player.prototype.getHealth = function() {
    return `${this.name}'s health  is now ${this.health}!`;
};

Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};
// Remember, truthy values are values that will be coerced to true in Boolean contexts, such as inside 'if' statements
// here, we're updating the value of our 'Player' health halfway through the test so that we can check for both conditions: 'true' & 'false'


// reduceHealth() method
Player.prototype.reduceHealth = function(health) {
    this.health -= health;

    if(this.health < 0) {
        this.health = 0;
    }
    // remember to include the conditional to ensure the health never goes negative
};

// getAttackValue() method
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};
// we've created variables for 'min' and 'max' to make this function a little easier to maintain. 
// what if you decide to increase the range of attacks later on?
// this code will be easier to understand upon revisit than if we wrote all of the expressions in one single 'return' statement

Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
};

Player.prototype.usePotion = function(index) {
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    }
};
// the .splice() method removes items from an array and returns the removed item(s) as a new array. 
// this, two things are happening here: the original 'inventory' array has a single 'Potion' removed at the specified 'index' value and put into a new "removed items" array, 
// then the Potion at index [0] of this "removed items" array is saved in a potion variable.

// both .push() and .splice() are methods on the Array prototype. meaning that even built-in JavaScript data types are constructors themselves. 

module.exports = Player;