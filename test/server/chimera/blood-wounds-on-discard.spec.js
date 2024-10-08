describe('Blood wounds', function () {
    describe('discard causes damage', function () {
        beforeEach(function () {
            this.setupTest({
                mode: 'solo',
                player1: {
                    phoenixborn: 'coal-roarkwin',
                    inPlay: ['anchornaut', 'flute-mage', 'hammer-knight'],
                    spellboard: [],
                    dicepool: ['natural', 'natural', 'charm', 'charm', 'sympathy', 'sympathy'],
                    hand: ['fear', 'summon-iron-rhino']
                },
                player2: {
                    dummy: true,
                    phoenixborn: 'viros-s1',
                    behaviour: 'viros-behaviour',
                    ultimates: ['viros-ultimate-1', 'viros-ultimate-2', 'viros-ultimate-3'],
                    inPlay: ['rampage'],
                    spellboard: [],
                    threatZone: ['hunting-instincts'],
                    dicepool: ['rage', 'rage', 'rage', 'rage', 'rage']
                }
            });
        });

        it('attacker takes damage and aspect is not exhausted', function () {
            this.player1.play(this.fear);
            this.player1.clickDie(0);
            this.player1.clickCard(this.anchornaut);
            this.player1.clickCard(this.rampage);

            expect(this.rampage.location).toBe('discard');
            expect(this.virosS1.damage).toBe(1);
        });
    });
});