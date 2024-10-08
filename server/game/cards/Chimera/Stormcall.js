const AspectCard = require("../../solo/AspectCard");

class Stormcall extends AspectCard {
    setupCardAbilities(ability) {
        super.setupCardAbilities(ability);

        this.forcedReaction({
            inexhaustible: true,
            when: {
                // it's my turn
                onBeginTurn: (event, context) => event.player === context.player
            },
            location: 'play area',
            cost: [ability.costs.loseStatus(1)],
            target: {
                autoTarget: (context) => context.player.opponent.phoenixborn,
                gameAction: ability.actions.dealDamage({ showMessage: true })
            },
            then: {
                condition: (context) => context.source.status === 0,
                gameAction: ability.actions.addRedRainsToken((context) => ({
                    showMessage: true, shortMessage: true, warnMessage: true,
                    target: context.player.phoenixborn
                }))
            }
        });
    }

    get statusCount() {
        return 2;
    }
}

Stormcall.id = 'stormcall';

module.exports = Stormcall