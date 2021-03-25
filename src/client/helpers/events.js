import { last } from 'underscore';
import { SessionTypes } from './constants';

export const getSessionName = (sessionType) => {
    switch (sessionType) {
        case SessionTypes.FP:
            return 'Free Practice';
        case SessionTypes.Q:
            return 'Qualifying';
        case SessionTypes.R:
            return 'Race';
    }
};

export const getSessionColor = (sessionType) => {
    switch (sessionType) {
        case SessionTypes.FP:
            return 'neutral-4';
        case SessionTypes.Q:
            return 'neutral-3';
        case SessionTypes.R:
            return 'neutral-1';
        default:
            return 'status-disabled';
    }
};

export const getTrackName = (sessions) => {
    return last(sessions).session.trackName;
};

export const getStartTime = (sessions) => {
    return last(sessions).startTime;
};

export const getSessionTypes = (sessions) => {
    return sessions.map(s => s.sessionType);
};

export const getLapCount = (sessions) => {
    const results = { max: 0 };
    const everyLap = last(sessions).session.laps;

    if (!everyLap || !everyLap.length === 0) {
        return 0;
    }

    everyLap.forEach(lap => {

        results[lap.carId] = (results[lap.carId] && results[lap.carId] + 1) || 1;
        results.max = results[lap.carId] > results.max ? results[lap.carId] : results.max;

    });

    return results.max;
};

export const getEntrantsCount = (sessions) => {
    const results = { count: 0 };
    const everyLap = last(sessions).session.laps;

    if (!everyLap || !everyLap.length === 0) {
        return 0;
    }

    everyLap.forEach(lap => {

        results.count = results[lap.carId] ? results.count : results.count + 1;
        results[lap.carId] = true;
        
    });

    return results.count;
};

export const getEventKey = (sessions) => {
    const startTime = getStartTime(sessions);

    // https://stackoverflow.com/a/7616484
    let hash = 0;
    let i; 
    let chr;

    for (i = 0; i < startTime.length; i++) {
        chr = startTime.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    
    return hash;
};


