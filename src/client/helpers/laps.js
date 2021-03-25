import { reduce, some, sortBy, take, union } from 'underscore';
import { findCarById } from './session';

export const getDriverName = (session, carId, driverIndex) => {
    const car = findCarById(session, carId);
    const driver = car.drivers[driverIndex];
    return `${driver.firstName} ${driver.lastName[0]}`;
};

const isBestLapByDriver = (session, carId, driverIndex, laptime) => {
    const validLaps = session.laps.filter(l => l.isValidForBest && l.carId === carId && l.driverIndex === driverIndex);
    return !some(validLaps, l => l.laptime < laptime);
};

const isBestLapOverall = (session, laptime) => {
    const validLaps = session.laps.filter(l => l.isValidForBest);
    return !some(validLaps, l => l.laptime < laptime);
};

const isBestSectorByDriver = (session, carId, driverIndex, split, splitIndex) => {
    const validLaps = session.laps.filter(l => l.isValidForBest && l.carId === carId && l.driverIndex === driverIndex);
    return !some(validLaps, l => l.splits[splitIndex] < split);
};

const isBestSectorOverall = (session, split, splitIndex) => {
    const validLaps = session.laps.filter(l => l.isValidForBest);
    return !some(validLaps, l => l.splits[splitIndex] < split);
};

const getAllCars = (session) => {
    const entrants = session.sessionResult.leaderBoardLines || [];
    return entrants.map(e => e.car.carId);
};

const getAllDrivers = (session) => {
    const entrants = session.sessionResult.leaderBoardLines || [];
    return union(
        ...entrants.map(e => 
            e.car.drivers.map(d => 
                `${d.firstName} ${d.lastName[0]}`
            )
        )
    );
};

export const getAllLapsByDriver = (session) => {
    const cars = reduce(getAllCars(session), (agg, car) => ({ ...agg, [car]: 0 }), {});
    const allLaps = session.laps.map((lap) => {
        const lapData = {
            no: null,
            driver: getDriverName(session, lap.carId, lap.driverIndex),
            car: findCarById(session, lap.carId).carModel,
            time: lap.laptime,
            isValid: lap.isValidForBest,
            isPersonalBest: lap.isValidForBest && isBestLapByDriver(session, lap.carId, lap.driverIndex, lap.laptime),
            isOverallBest: lap.isValidForBest && isBestLapOverall(session, lap.laptime),
            sectors: lap.splits.map((split, index) => ({
                time: split,
                isPersonalBest: isBestSectorByDriver(session, lap.carId, lap.driverIndex, split, index),
                isOverallBest: isBestSectorOverall(session, split, index),
            })),
        };

        cars[lap.carId] += 1;
        lapData.no = cars[lap.carId];

        return lapData;
    });

    if (!allLaps.length) {
        return {};
    }

    return reduce(
        getAllDrivers(session),
        (agg, driver) => {

            const laps = allLaps.filter(l => l.driver === driver);
            const validLaps = allLaps.filter(l => l.driver === driver && l.isValid && l.no > 1);

            const bestPossibleSectors = validLaps.length && [1,2,3].map((s, i) =>
                validLaps.find(l => l.sectors[i].isPersonalBest).sectors[i].time
            );
            const averageSectors = validLaps.length && [1,2,3].map((s, i) =>
                validLaps.reduce((sAgg, l) => sAgg + l.sectors[i].time, 0) / validLaps.length
            );
            
            const bestPossibleLap = (validLaps.length && bestPossibleSectors.reduce((sAgg, s) => sAgg + s, 0)) || null;
            const averageLap = (validLaps.length && averageSectors.reduce((sAgg, s) => sAgg + s, 0)) || null;

            return {
                ...agg,
                [driver]: {
                    name: driver,
                    laps,
                    bestPossibleSectors,
                    averageSectors,
                    bestPossibleLap,
                    averageLap,
                },
            };
        },
        {},
    );
};

export const getBestLapByDrivers = (session) => {
    const allLaps = sortBy(session.laps, 'laptime').filter(l => l.isValidForBest);
    return allLaps.reduce(
        (agg, lap) => {
            if (agg.find(l => l.carId === lap.carId && l.driverIndex === lap.driverIndex)) {
                return agg;
            }

            return [
                ...agg,
                {
                    driver: getDriverName(session, lap.carId, lap.driverIndex),
                    car: findCarById(session, lap.carId).carModel,
                    time: lap.laptime,
                    gap: (agg.length > 0 && lap.laptime - agg[agg.length - 1].time) || null,
                    carId: lap.carId,
                    driverIndex: lap.driverIndex,
                },
            ];
        },  
        [],
    );
};

export const getTop20Laps = (session) => {
    const allLaps = sortBy(session.laps, 'laptime').filter(l => l.isValidForBest);
    return take(allLaps, 20).reduce(
        (agg, lap) => [
            ...agg,
            {
                driver: getDriverName(session, lap.carId, lap.driverIndex),
                car: findCarById(session, lap.carId).carModel,
                time: lap.laptime,
                gap: (agg.length > 0 && lap.laptime - agg[agg.length - 1].time) || null,
            },
        ],
        [],
    );
};