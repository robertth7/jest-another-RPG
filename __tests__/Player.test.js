const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion.js');

console.log(new Potion());

test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test("gets player's stats as an object", () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});
// here, we're checking that player.getStats() returns an object with four specific properties. 

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

// on player creation, the inventory should already have something in it, so a call to player.getInventory() should return an array
// there's also the case of an empty inventory needing to return false. you can simulate an empty array yourself by setting player.inventory = [] before the next expect() runs. 

test("gets player's health value", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// test to check 'is alive'
test('checks if player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

// test 'reduceHealth()' method to see if the correct amount of health is being subtracted from the Player health property
test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth -5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

// player's attack value
test("gets player's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});
// as mentioned previously, it is hard to test for randomness within a range. in this case, we don't opt to check for ANY number bc the test will be too general to give specific feedback for a failing test.
// specificity will give the test more value and actionable feedback. 

test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});


// Potions are a little different bc we'll need to handle updating the Player inventory as well as their stats.
// when a Player drinks a Potion, the potion needs to be removed from their inventory and their stats need to be adjusted

// we will need to write test that ensure that usePotion() removes the correct Potion from the Player inventory. 
test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});
// again, we are keeping track of the old inventory length so that we can make sure the length decreases and doesn't go below zero. 
