const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// Game() properties
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

// Game() methods
Game.prototype.initializeGame = function() {

    // populate the enemies array
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseballbat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // keeping track of which Enemy object is currently fighting Player. this would be the first object in the array.
    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name', 
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        .then(({name}) => {
            this.player = new Player(name);

            // test the object creation
            console.log(this.currentEnemy, this.player);
        });
}

module.exports = Game;