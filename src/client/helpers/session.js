import { find, groupBy, min } from 'underscore';
import { SessionTypes } from './constants';

export const msToTime = duration => {
    const milliseconds = parseInt((duration % 1000) / 1).toString().padStart(3, '0');;

    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
  
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    if (minutes === '00') {
        return `${seconds}.${milliseconds}`;
    }

    return `${minutes}:${seconds}.${milliseconds}`;
};

export const getLapCount = (session) => {
    const results = { max: 0 };
    const everyLap = session.laps;

    if (!everyLap || !everyLap.length === 0) {
        return 0;
    }

    everyLap.forEach(lap => {

        results[lap.carId] = (results[lap.carId] && results[lap.carId] + 1) || 1;
        results.max = results[lap.carId] > results.max ? results[lap.carId] : results.max;

    });

    return results.max;
};

export const findCarById = (session, carId) => {
    const entrants = session.sessionResult.leaderBoardLines || [];
    const entrant = find(entrants, e => e.car.carId === carId);
    return entrant && entrant.car; 
};

export const getBestLap = (session) => {
    const validLaps = session.laps.filter(l => l.isValidForBest);

    if (!validLaps.length) {
        return {};
    }

    const bestLap = min(validLaps, 'laptime');
    const bestLapCar = findCarById(session, bestLap.carId);

    return bestLap && {
        time: msToTime(bestLap.laptime),
        driver: `${bestLapCar.drivers[bestLap.driverIndex].firstName} ${bestLapCar.drivers[bestLap.driverIndex].lastName[0]}`,
    };
};

export const getRaceWinner = (session) => {
    if (session.sessionType !== SessionTypes.R) {
        return null;
    }

    return session.sessionResult.leaderBoardLines[0].car.drivers
        .map(d => `${d.firstName} ${d.lastName[0]}`)
        .join(' / ');
};

export const getSessionLeaderboard = (session) => {

    const allValidLaps = session.laps.filter(l => l.isValidForBest);
    const lapsByCar = groupBy(allValidLaps, 'carId');

    let leaderBoard = session.sessionResult.leaderBoardLines
        .reduce(
            (agg, line, index) => {

                const position = index + 1;

                const no = line.car.raceNumber;

                const driver = line.car.drivers.map(d => `${d.firstName} ${d.lastName[0]}`).join(' / ');

                const car = line.car.carModel;

                const laps = (
                    (
                        lapsByCar[line.car.carId] 
                        && lapsByCar[line.car.carId].length
                    ) 
                    || 0
                );

                const bestLap = (
                    (
                        lapsByCar[line.car.carId] 
                        && lapsByCar[line.car.carId].length 
                        && min(lapsByCar[line.car.carId], 'laptime').laptime
                    ) 
                    || null
                );

                const gap = (
                    (
                        bestLap 
                        && session.sessionType !== SessionTypes.R 
                        && agg.length 
                        && bestLap - agg[index - 1].bestLap
                    ) 
                    || null
                );

                const timeFinished = (
                    (
                        session.sessionType === SessionTypes.R 
                        && line.timing.totalTime
                    ) 
                    || null
                );

                const timeFinishedGap = (
                    (
                        session.sessionType === SessionTypes.R 
                        && agg.length 
                        && laps === agg[0].laps 
                        && timeFinished - agg[index - 1].timeFinished
                    ) 
                    || null
                );

                let consistency = null;
                
                if (session.sessionType === SessionTypes.R && laps > 1) {
                    let totalTime = 0;
                    let totalLaps = 0;

                    lapsByCar[line.car.carId].forEach((lap, index) => {

                        if (
                            index === 0
                            || lap.laptime === bestLap
                            || lap.laptime > (bestLap + 21000)
                        ) {
                            return;
                        }

                        totalTime += lap.laptime;
                        totalLaps += 1;
                    });

                    const average = totalTime / totalLaps;
                    consistency = (bestLap * 100 / average).toFixed(2);
                }

                // const led = (session.sessionType === SessionTypes.R) || null;
                const led = null;

                return [
                    ...agg,
                    {
                        no,
                        gap,
                        car,
                        led,
                        laps,
                        driver,
                        bestLap,
                        position,
                        consistency,
                        timeFinished,
                        timeFinishedGap,
                    },
                ];
            }, 
            []
        );

    return leaderBoard;
};
