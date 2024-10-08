const { CardType, Level, PhoenixbornTypes } = require('../../../constants.js');
const Card = require('../../Card.js');

class ChannelMagic extends Card {
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.draw(),
            then: {
                alwaysTriggers: true,
                target: {
                    cardType: PhoenixbornTypes,
                    gameAction: ability.actions.removeDamage({ amount: 1, showMessage: true })
                },
                then: {
                    alwaysTriggers: true,
                    target: {
                        toSelect: 'die',
                        mode: 'upTo',
                        numDice: 3,
                        dieCondition: (die) => !die.exhausted && die.level !== Level.Power,
                        owner: 'self',
                        activePromptTitle: 'Choose up to 3 dice to raise one level',
                        gameAction: ability.actions.raiseDie({ showMessage: true })
                    }
                }
            }
        });
    }
}

ChannelMagic.id = 'channel-magic';

module.exports = ChannelMagic;
