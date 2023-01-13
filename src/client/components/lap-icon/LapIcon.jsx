import React from 'react';
import { Text, Tip } from 'grommet';

const getLapText = (isInvalid, isOverallBest, isPersonalBest) => {
    return isInvalid
        ? 'IN'
        : isOverallBest
            ? 'SB'
            : isPersonalBest
                ? 'PB'
                : null;
};

const getLapDescription = (isInvalid, isOverallBest, isPersonalBest) => {
    return isInvalid
        ? 'Invalid'
        : isOverallBest
            ? 'Session Best'
            : isPersonalBest
                ? 'Personal Best'
                : null;
};

const getLapColor = (isInvalid, isOverallBest, isPersonalBest) => {
    return isInvalid
        ? 'lap-invalid-label'
        : isOverallBest
            ? 'lap-sb-label'
            : isPersonalBest
                ? 'lap-pb-label'
                : null;
};

const JustTheTip = ({ children, description }) => {
    if (!description) {
        return children;
    }

    return (
        <Tip 
            content={(
                <Text size={'small'}>
                    {description}
                </Text>
            )}
        >
            {children}
        </Tip>
    );
};

const LapIcon = ({ isInvalid, isOverallBest, isPersonalBest }) => {

    const text = getLapText(isInvalid, isOverallBest, isPersonalBest);
    const description = getLapDescription(isInvalid, isOverallBest, isPersonalBest);
    const color = getLapColor(isInvalid, isOverallBest, isPersonalBest);

    if (!text) {
        return null;
    }

    return (
        <JustTheTip description={description}>
            <Text 
                weight={'bold'} 
                size={'xsmall'} 
                color={color}
                style={{
                    cursor: description && 'help'
                }}
            >
                {text}
            </Text>
        </JustTheTip>
    );
};

export default LapIcon;