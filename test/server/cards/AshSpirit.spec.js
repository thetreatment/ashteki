describe('AshSpirit', function () {
    describe('to ash', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['seaside-raven', 'hammer-knight', 'iron-rhino'],
                    dicepool: ['natural']
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    hand: ['redirect'],
                    inPlay: ['ash-spirit', 'living-doll'],
                    dicepool: ['charm']
                }
            });
        });

        it('does not trigger after destroying outside of attacks', function () {
            this.player1.clickCard(this.aradelSummergaard);
            this.player1.clickPrompt('Water Blast');
            this.player1.clickCard(this.ashSpirit);

            expect(this.player1).toHaveDefaultPrompt();

            expect(this.ashSpirit.location).toBe('archives');
        });

        it('does not trigger when exhausted', function () {
            this.ashSpirit.tokens.exhaustion = 1;

            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.ashSpirit);
            this.player1.clickCard(this.hammerKnight);

            this.player2.clickPrompt('Done'); // no blocker

            expect(this.player1).toHavePrompt('Aftershock 1');
            this.player1.clickCard(this.livingDoll);

            expect(this.ashSpirit.location).toBe('archives');
            expect(this.hammerKnight.location).toBe('play area');
        });

        it('triggers when destroyed in attack. Destroy attacker but still trigger after-destroy effects of attacker', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.ashSpirit);
            this.player1.clickCard(this.hammerKnight);

            this.player2.clickPrompt('Done'); // no blocker
            this.player2.clickPrompt('No'); // no counter

            expect(this.player1).toHavePrompt('Aftershock 1');
            this.player1.clickCard(this.livingDoll);

            expect(this.hammerKnight.location).toBe('discard');
            expect(this.ashSpirit.location).toBe('archives');
            expect(this.livingDoll.damage).toBe(1);
        });

        it('triggers when destroyed in attack. Destroy attacker but still trigger overkill effects of attacker', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.ashSpirit);
            this.player1.clickCard(this.ironRhino);

            this.player2.clickPrompt('Done'); // no blocker
            this.player2.clickPrompt('No'); // no counter

            this.player2.clickPrompt('Pass'); // no redirect from overkill damage

            expect(this.ironRhino.location).toBe('archives');
            expect(this.ashSpirit.location).toBe('archives');
            expect(this.maeoniViper.damage).toBe(2); // overkill 2 damage from iron rhino
        });

        it('triggers when redirect to ash spirit', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.livingDoll);
            this.player1.clickCard(this.hammerKnight);

            this.player2.clickCard(this.maeoniViper); // guard

            this.player2.clickCard(this.redirect); // click redirect to play as reaction
            this.player2.clickCard(this.ashSpirit); // redirect damage to ash spirit

            expect(this.player1).toHavePrompt('Aftershock 1');
            this.player1.clickCard(this.livingDoll);

            expect(this.hammerKnight.location).toBe('discard');
            expect(this.ashSpirit.location).toBe('archives');
            expect(this.livingDoll.damage).toBe(1);
        });

        it('does not trigger when a different unit is killed', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.livingDoll);
            this.player1.clickCard(this.hammerKnight);

            this.player2.clickPrompt('Done'); // no blocker
            this.player2.clickPrompt('No'); // no counter

            expect(this.player1).toHavePrompt('Aftershock 1');
            this.player1.clickCard(this.ashSpirit);

            expect(this.ashSpirit.location).toBe('play area');
            expect(this.ashSpirit.damage).toBe(1);
            expect(this.hammerKnight.location).toBe('play area');
        });
    });

    describe('to ash cerasaurus mount bug report', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    inPlay: ['seaside-raven', 'hammer-knight', 'cerasaurus-mount'],
                    dicepool: ['natural']
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    inPlay: ['ash-spirit', 'living-doll'],
                    dicepool: ['charm']
                }
            });
        });

        it('triggers when destroyed in attack. Destroy attacker but still trigger overkill effects of attacker', function () {
            this.player1.clickPrompt('Attack');
            this.player1.clickCard(this.ashSpirit);
            this.player1.clickCard(this.cerasaurusMount);

            this.player2.clickPrompt('Done'); // no blocker
            this.player2.clickPrompt('No'); // no counter

            expect(this.cerasaurusMount.location).toBe('archives');
            expect(this.ashSpirit.location).toBe('archives');
            expect(this.maeoniViper.damage).toBe(1); // overkill 2 damage from iron rhino
        });
    });

    describe('smolder', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    deck: ['kneel', 'anchornaut'],
                    hand: ['massive-growth', 'massive-growth', 'massive-growth', 'kneel', 'kneel']
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    deck: ['kneel', 'anchornaut'],
                    spellboard: ['summon-ash-spirit'],
                    archives: ['ash-spirit'],
                    hand: ['massive-growth', 'massive-growth', 'massive-growth', 'kneel', 'kneel'],
                    inPlay: ['ash-spirit'],
                    dicepool: ['time']
                }
            });
        });

        it('does nothing if no deck is empty', function () {
            this.player1.endTurn();
            this.player2.endTurn();

            this.player2.clickPrompt('Done');
            this.player2.clickPrompt('No');
            this.player1.clickPrompt('No');

            expect(this.player2).toHaveDefaultPrompt();
            expect(this.aradelSummergaard.damage).toBe(0);
        });

        it('lets you choose a phoenixborn if both decks are empty', function () {
            this.player1.player.deck = [];
            this.player2.player.deck = [];

            this.player1.endTurn();
            this.player2.endTurn();

            this.player2.clickPrompt('Done');

            expect(this.player2).toHavePrompt('Ash Spirit');
            this.player2.clickCard(this.aradelSummergaard);
            expect(this.aradelSummergaard.damage).toBe(1);
        });

        it('makes you choose your phoenixborn if the other player has cards in their deck', function () {
            this.player2.player.deck = [];

            this.player1.endTurn();
            this.player2.endTurn();

            this.player2.clickPrompt('Done');

            expect(this.player2).toHavePrompt('Ash Spirit');
            expect(this.player2).not.toBeAbleToSelect(this.aradelSummergaard);
            this.player2.clickCard(this.maeoniViper);
            expect(this.maeoniViper.damage).toBe(1);
            expect(this.aradelSummergaard.damage).toBe(0);
        });

        it('stacks multiple ash spirits', function () {
            this.player1.player.deck = [];
            this.player2.player.deck = [];

            this.player1.endTurn();

            this.player2.clickCard(this.summonAshSpirit);
            this.player2.clickPrompt('Summon Ash Spirit');

            this.player2.endTurn();
            this.player1.endTurn();
            this.player2.endTurn();

            expect(this.player2).toHavePrompt('Ash Spirit');
            this.player2.clickCard(this.aradelSummergaard);
            expect(this.player2).toHavePrompt('Ash Spirit');
            this.player2.clickCard(this.aradelSummergaard);
            expect(this.aradelSummergaard.damage).toBe(2);

            expect(this.player2).not.toHavePrompt('Ash Spirit');
        });
    });

    describe('BUG: ash spirit smolder vs law of grace as FIRST PLAYER', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'maeoni-viper',
                    deck: [],
                    spellboard: ['summon-ash-spirit'],
                    archives: ['ash-spirit'],
                    hand: [
                        // 6 cards to prevent fatigue damage
                        'blood-transfer',
                        'massive-growth',
                        'massive-growth',
                        'massive-growth',
                        'kneel',
                        'kneel'
                    ],
                    inPlay: ['ash-spirit'],
                    dicepool: ['time']
                },
                player2: {
                    phoenixborn: 'aradel-summergaard',
                    deck: [],
                    spellboard: ['law-of-grace'],
                    hand: ['massive-growth', 'massive-growth', 'kneel', 'kneel', 'kneel']
                }
            });
        });

        it('as ACTIVE player, no damage', function () {
            expect(this.aradelSummergaard.damage).toBe(0);
            expect(this.game.roundFirstPlayer.name).toBe(this.player1.name);
            this.player1.endTurn();
            this.player2.endTurn();

            // the round ends with player 2 as the ACTIVE player, but FIRST PLAYER matters for end of Round
            this.player1.clickPrompt('Done'); // recovery phase -  pin dice
            expect(this.game.activePlayer.name).toBe(this.player2.name);
            // end of round
            expect(this.lawOfGrace.location).toBe('spellboard');
            this.player1.clickCard(this.maeoniViper); // smolder prompt - choose aradel

            // prepare phase discard cards prompt
            this.player1.clickPrompt('No');
            this.player2.clickPrompt('No');

            expect(this.player2).toHaveDefaultPrompt();
            expect(this.aradelSummergaard.damage).toBe(0);
        });

        it('as NOT ACTIVE player no damage', function () {
            expect(this.aradelSummergaard.damage).toBe(0);
            this.player1.play(this.bloodTransfer);
            this.player1.endTurn();
            this.player2.endTurn();
            this.player1.endTurn();

            // the round ends with player 1 as the ACTIVE player
            this.player1.clickPrompt('Done'); // recovery phase -  pin dice
            expect(this.game.activePlayer.name).toBe(this.player1.name);
            // end of round
            expect(this.lawOfGrace.location).toBe('spellboard');
            this.player1.clickCard(this.maeoniViper); // smolder prompt - choose aradel

            // prepare phase discard cards prompt
            this.player1.clickPrompt('No');
            this.player2.clickPrompt('No');

            expect(this.player2).toHaveDefaultPrompt();
            expect(this.aradelSummergaard.damage).toBe(0);
        });
    });

    describe('BUG: ash spirit smolder vs law of grace NOT FIRST PLAYER', function () {
        beforeEach(function () {
            this.setupTest({
                player1: {
                    phoenixborn: 'aradel-summergaard',
                    deck: [],
                    spellboard: ['law-of-grace'],
                    hand: [ // 6 cards to prevent fatigue damage
                        'blood-transfer',
                        'massive-growth',
                        'massive-growth',
                        'kneel',
                        'kneel',
                        'kneel'
                    ]
                },
                player2: {
                    phoenixborn: 'maeoni-viper',
                    deck: [],
                    spellboard: ['summon-ash-spirit'],
                    archives: ['ash-spirit'],
                    hand: ['massive-growth', 'massive-growth', 'massive-growth', 'kneel', 'kneel'],
                    inPlay: ['ash-spirit'],
                    dicepool: ['time']
                }
            });
        });

        it('as ACTIVE player', function () {
            expect(this.aradelSummergaard.damage).toBe(0);
            expect(this.game.roundFirstPlayer.name).toBe(this.player1.name);
            this.player1.endTurn();
            this.player2.endTurn();

            // the round ends with player 2 as the ACTIVE player, but FIRST PLAYER matters for end of Round
            this.player2.clickPrompt('Done'); // recovery phase -  pin dice
            expect(this.game.activePlayer.name).toBe(this.player2.name);
            // end of round
            expect(this.lawOfGrace.location).toBe('discard');
            this.player2.clickCard(this.aradelSummergaard); // smolder prompt - choose aradel

            // prepare phase discard cards prompt
            this.player2.clickPrompt('No');
            this.player1.clickPrompt('No');

            expect(this.player2).toHaveDefaultPrompt(); // because they're first player now
            expect(this.aradelSummergaard.damage).toBe(1);
        });

        it('as NOT ACTIVE player', function () {
            expect(this.aradelSummergaard.damage).toBe(0);
            this.player1.play(this.bloodTransfer);
            this.player1.endTurn();
            this.player2.endTurn();
            this.player1.endTurn();

            // the round ends with player 1 as the ACTIVE player
            this.player2.clickPrompt('Done'); // recovery phase -  pin dice
            expect(this.game.activePlayer.name).toBe(this.player1.name);
            // end of round
            expect(this.lawOfGrace.location).toBe('discard');
            this.player2.clickCard(this.aradelSummergaard); // smolder prompt - choose aradel

            // prepare phase discard cards prompt
            this.player2.clickPrompt('No');
            this.player1.clickPrompt('No');

            expect(this.player2).toHaveDefaultPrompt();
            expect(this.aradelSummergaard.damage).toBe(1);
        });
    });
});
