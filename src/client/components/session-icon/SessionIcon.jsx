import React from 'react';
import { Text, Tip } from 'grommet';
import { getSessionName, getSessionColor } from '../../helpers/events';

const JustTheTip = ({ children, sessionType }) => {
    if (!sessionType) {
        return children;
    }

    return (
        <Tip 
            content={(
                <Text size={'small'}>
                    {getSessionName(sessionType)}
                </Text>
            )}
        >
            {children}
        </Tip>
    );
};

const SessionIcon = ({ sessionType }) => {

    return (
        <JustTheTip sessionType={sessionType}>
            <Text
                weight={'bold'}
                textAlign={'end'}
                color={getSessionColor(sessionType)}
            >
                {sessionType || 'X'}
            </Text>
        </JustTheTip>
    );
};

export default SessionIcon;