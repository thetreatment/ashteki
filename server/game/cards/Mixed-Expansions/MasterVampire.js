const Card = require('../../Card.js');

class MasterVampire extends Card {
    setupCardAbilities(ability) {
        this.stalk();

        this.afterDestroysFighting({
            autoResolve: true,
            gameAction: ability.actions.removeDamage((context) => ({
                target: context.player.phoenixborn,
                amount: this.getAbilityNumeric(1)
            }))
        });
    }
}

MasterVampire.id = 'master-vampire';

module.exports = MasterVampire;
