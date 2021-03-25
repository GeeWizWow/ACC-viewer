import { sortBy } from 'underscore';
import { getDriverName } from './laps';
import { findCarById } from './session';

const getBestSplitTimes = (session, splitIndex) => {
    const validSectors = session.laps.filter(l => l.isValidForBest).map(l => ({
        carId: l.carId,
        driverIndex: l.driverIndex,
        time: l.splits[splitIndex],
    }));

    return sortBy(validSectors, 'time').reduce(
        (agg, lap) => {
            if (agg.find(l => l.carId === lap.carId && l.driverIndex === lap.driverIndex)) {
                return agg;
            }

            return [
                ...agg,
                {
                    driver: getDriverName(session, lap.carId, lap.driverIndex),
                    car: findCarById(session, lap.carId).carModel,
                    time: lap.time,
                    gap: (agg.length > 0 && lap.time - agg[agg.length - 1].time) || null,
                    carId: lap.carId,
                    driverIndex: lap.driverIndex,
                },
            ];
        },  
        [],
    );
}

export const getBestSectors = (session) => {
    return [
        getBestSplitTimes(session, 0),
        getBestSplitTimes(session, 1),
        getBestSplitTimes(session, 2),
    ];
};