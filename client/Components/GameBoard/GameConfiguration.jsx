import React from 'react';
import Panel from '../Site/Panel';
import { Col, Form, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useDispatch, useSelector } from 'react-redux';
import { changeViewSetting } from '../../redux/actions';
import CardSizeSelector from '../Profile/CardSizeSelector';

const GameConfiguration = ({ optionSettings, onOptionSettingToggle }) => {
    const dispatch = useDispatch();

    // USE ACCOUNT for temporary / in game changes, use AUTH.USER for saved / profile changes
    const compactLayout = useSelector(
        (state) => state.account.user.settings.optionSettings?.compactLayout
    );
    const leftMode = useSelector((state) => state.account.user.settings.optionSettings?.leftMode);
    const selectedCardSize = useSelector((state) => state.account.user.settings.cardSize);

    return (
        <div>
            <Form>
                <Panel title='Game Settings'>
                    <div className='advice'>
                        Note: Changes made here will only affect the current game.
                    </div>
                    <Form.Check
                        id='orderForcedAbilities'
                        name='optionSettings.orderForcedAbilities'
                        label='Prompt to order simultaneous abilities'
                        type='switch'
                        checked={optionSettings.orderForcedAbilities}
                        onChange={(event) =>
                            onOptionSettingToggle('orderForcedAbilities', event.target.checked)
                        }
                    />
                    <Form.Check
                        id='alwaysGroupTactics'
                        name='gameOptions.alwaysGroupTactics'
                        label='Always trigger Group Tactics without asking'
                        type='switch'
                        checked={optionSettings.alwaysGroupTactics}
                        onChange={(event) =>
                            onOptionSettingToggle('alwaysGroupTactics', event.target.checked)
                        }
                    />
                    <Form.Check
                        id='dontIceTrapOwnUnits'
                        name='gameOptions.dontIceTrapOwnUnits'
                        label="Don't prompt to ice trap my own units"
                        type='switch'
                        checked={optionSettings.dontIceTrapOwnUnits}
                        onChange={(event) =>
                            onOptionSettingToggle('dontIceTrapOwnUnits', event.target.checked)
                        }
                    />
                    <Form.Check
                        id='noAttackAlerts'
                        name='gameOptions.noAttackAlerts'
                        label="Don't alert on attacks (useful for blitz games)"
                        type='switch'
                        checked={optionSettings.noAttackAlerts}
                        onChange={(event) =>
                            onOptionSettingToggle('noAttackAlerts', event.target.checked)
                        }
                    />
                    <Form.Check
                        id='leftMode'
                        name='gameOptions.leftMode'
                        label='Show the prompt area on left'
                        type='switch'
                        checked={leftMode}
                        onChange={(event) => {
                            dispatch(changeViewSetting('leftMode', event.target.checked));
                        }}
                    />
                    <Form.Check
                        id='compactLayout'
                        name='gameOptions.compactLayout'
                        label='Use compact layout'
                        type='switch'
                        checked={compactLayout}
                        onChange={(event) => {
                            dispatch(changeViewSetting('compactLayout', event.target.checked));
                        }}
                    />
                    <div className='bluffTimer'>
                        Bluff Timer (seconds):
                        <RangeSlider
                            name='gameOptions.bluffTimer'
                            label='Bluff Timer'
                            min='0'
                            max='10'
                            tooltip='on'
                            value={optionSettings.bluffTimer}
                            onChange={(event) =>
                                onOptionSettingToggle('bluffTimer', event.target.value)
                            }
                        />
                    </div>
                    <br />
                    <div className='alertTimer'>
                        Alert Timer (seconds):
                        <RangeSlider
                            name='gameOptions.alertTimer'
                            label='Alert Timer'
                            min='0'
                            max='10'
                            tooltip='on'
                            value={optionSettings.alertTimer}
                            onChange={(event) =>
                                onOptionSettingToggle('alertTimer', event.target.value)
                            }
                        />
                    </div>
                    <br />
                    <Form.Row>
                        Card Size:
                        <Row>
                            <Col xs='12'>
                                <CardSizeSelector
                                    onCardSizeSelected={(name) => {
                                        dispatch(changeViewSetting('cardSize', name));
                                    }}
                                    selectedCardSize={selectedCardSize}
                                />
                            </Col>
                        </Row>
                    </Form.Row>
                </Panel>
            </Form>
        </div>
    );
};

GameConfiguration.displayName = 'GameConfiguration';

export default GameConfiguration;
