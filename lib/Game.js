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
            // console.log(this.currentEnemy, this.player);

            // placeholder for starting new round
            this.startNewBattle();
            // console.log(this.startNewBattle());
        });
};

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    // display Player stats
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    // display Enemy object description
    console.log(this.currentEnemy.getDescription());

    // battle() method will be responsible for each individual turn in the round. 
    this.battle()
};

// progress so far, 'this.initializeGame()' calls 'this.startNewBattle()', which in turn calls 'this.battle()'

Game.prototype.battle = function() {
    if (this.isPlayerTurn) {
        // player prompts will go here
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action', 
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                if (action === 'Use potion') {
                    // follow-up prompt will go here
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        // if the inventory is empty, immediately return to end the Player turn.
                        return;
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        });
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);


        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

module.exports = Game;