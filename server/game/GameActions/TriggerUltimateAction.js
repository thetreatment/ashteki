const { CardType } = require('../../constants');
const CardGameAction = require('./CardGameAction');

class TriggerUltimateAction extends CardGameAction {
    setDefaultProperties() {

    }

    setup() {
        this.targetType = [CardType.Chimera];
    }

    canAffect(card, context) {
        return card.location === 'play area' && super.canAffect(card, context);
    }

    getEvent(card, context) {
        const params = {
            card: card,
            context: context
        };
        return super.createEvent('onUltimate', params, (event) => {
            context.game.queueUserAlert(context, {
                style: 'danger',
                promptTitle: 'Chimera Ultimate',
                menuTitle: "Chimera uses it's Ultimate ability"
            });
            event.card.tokens.redRains = 0;
            const alienUnits = context.player.unitsInPlay.filter(c => c.owner !== c.controller);
            if (alienUnits.length) {
                context.game.actions.discard().resolve(alienUnits, context);
            }
            // do ability

            // next phase
            context.player.advanceChimeraPhase();
        });
    }
}

module.exports = TriggerUltimateAction;
