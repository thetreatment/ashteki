import React from 'react';
import { Trans } from 'react-i18next';

const DeckNotes = ({ notes }) => {
    return (
        <div className='manual-commands'>
            <h3 id='commands'>
                <Trans>Deck Notes</Trans>
            </h3>
            <p style={{ 'white-space': 'pre-line' }}>{notes}</p>
        </div>
    );
};

DeckNotes.displayName = 'ManualCommands';

export default DeckNotes;
