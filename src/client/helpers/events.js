import { SessionTypes, Tracks } from './constants';

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

export const getSessionSymbol = (sessionType) => {
    switch (sessionType) {
        case SessionTypes.FP:
            return 'FP';
        case SessionTypes.Q:
            return 'Q';
        case SessionTypes.R:
            return 'R';
    }
};

export const getSessionColor = (sessionType) => {
    switch (sessionType) {
        case SessionTypes.FP:
            return 'session-fp';
        case SessionTypes.Q:
            return 'session-q';
        case SessionTypes.R:
            return 'session-r';
        default:
            return 'session-none';
    }
};

export const msToTime = (seconds, forceHours = false) => {
    const isNegative = seconds < 0;
    const time = isNegative ? Math.abs(seconds) : seconds;

    const roundSeconds = Math.trunc(time);
    const hours = Math.floor(roundSeconds / 3600);
    const minutes = Math.floor((roundSeconds - (hours * 3600)) / 60);
    const secs = Math.floor((roundSeconds - (hours * 3600) - (minutes * 60)));
    const secsMicro = seconds - roundSeconds + secs;

    const secsFormatted = secsMicro.toFixed(4).padStart(7, '0');
    const minsFormatted = minutes.toFixed(0).padStart(2, '0');

    let format = `${minsFormatted}:${secsFormatted}`;

    if (hours || forceHours) {
        const hoursFormatted = hours.toFixed(0).padStart(2, '0');
        format = `${hoursFormatted}:${format}`;
    }

    if (isNegative) {
        format = `-${format}`;
    }

    return format;
};


export const getTrackFlag = (trackName) => {
    let iconName = '';

    switch (trackName) {
        case Tracks.misano:
        case Tracks.misano_2019:
        case Tracks.misano_2020:
        case Tracks.imola_2020:
        case Tracks.monza:
        case Tracks.monza_2019:
        case Tracks.monza_2020: {
            iconName = 'Italy.svg';
            break;
        }
        
        case Tracks.spa:
        case Tracks.spa_2019:
        case Tracks.spa_2020:
        case Tracks.zolder:
        case Tracks.zolder_2019:
        case Tracks.zolder_2020: {
            iconName = 'Belgium.svg';
            break;
        }

        case Tracks.oulton_park_2019:
        case Tracks.oulton_park_2020:
        case Tracks.donington_2019:
        case Tracks.donington_2020:
        case Tracks.silverstone:
        case Tracks.silverstone_2019:
        case Tracks.silverstone_2020:
        case Tracks.brands_hatch:
        case Tracks.brands_hatch_2019:
        case Tracks.brands_hatch_2020: {
            iconName = 'GreatBritain.svg';
            break;
        }

        case Tracks.paul_ricard:
        case Tracks.paul_ricard_2019:
        case Tracks.paul_ricard_2020: {
            iconName = 'France.svg';
            break;
        }

        case Tracks.nurburgring:
        case Tracks.nurburgring_2019:
        case Tracks.nurburgring_2020: {
            iconName = 'Germany.svg';
            break;
        }

        case Tracks.barcelona:
        case Tracks.barcelona_2019:
        case Tracks.barcelona_2020: {
            iconName = 'Spain.svg';
            break;
        }

        case Tracks.hungaroring:
        case Tracks.hungaroring_2019:
        case Tracks.hungaroring_2020: {
            iconName = 'Hungary.svg';
            break;
        }

        case Tracks.zandvoort:
        case Tracks.zandvoort_2019:
        case Tracks.zandvoort_2020: {
            iconName = 'Netherlands.svg';
            break;
        }

        case Tracks.mount_panorama_2019:
        case Tracks.mount_panorama_2020: {
            iconName = 'Australia.svg';
            break;
        }

        case Tracks.kyalami_2019:
        case Tracks.kyalami_2020: {
            iconName = 'SouthAfrica.svg';
            break;
        }

        case Tracks.suzuka_2019:
        case Tracks.suzuka_2020: {
            iconName = 'Japan.svg';
            break;
        }

        case Tracks.laguna_seca_2019:
        case Tracks.laguna_seca_2020: {
            iconName = 'USA.svg';
            break;
        }
    }

    return require(`../images/flags/${iconName}`);
};

export const getTrackFriendlyName = (trackName) => {
    return trackName.toUpperCase();
};
