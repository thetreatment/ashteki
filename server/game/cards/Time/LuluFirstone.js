const { BattlefieldTypes, Level } = require('../../../constants.js');
const Card = require('../../Card.js');
const DiceCount = require('../../DiceCount.js');

class LuluFirststone extends Card {
    setupCardAbilities(ability) {
        this.action({
            title: 'Bolster',
            cost: [
                ability.costs.sideAction(),
                ability.costs.exhaust(),
                ability.costs.dice([new DiceCount(1, Level.Basic)])
            ],
            target: {
                cardType: BattlefieldTypes,
                controller: 'self',
                gameAction: [
                    ability.actions.addStatusToken(),
                    ability.actions.attachConjuredAlteration({
                        conjuredAlteration: 'spark'
                    })
                ]
            }
        });
    }
}

LuluFirststone.id = 'lulu-firststone';

module.exports = LuluFirststone;
