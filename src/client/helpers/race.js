import { first, groupBy, last, max, sortBy } from 'underscore';
import { findCarById } from './session';
import { getDriverName } from './laps';
import { SessionTypes, CarNames } from './constants';

export const getPositionsByLap = (session) => {
    if (session.sessionType !== SessionTypes.R) {
        return [];
    }

    const allLaps = session.laps.reduce((agg, lap) => {
        
        const currentGroup = last(agg);
        const useCurrentGroup = (
            currentGroup
            && !currentGroup.find(l =>
                l.carId === lap.carId  
            )
        );

        // let gap = 0;

        // if (useCurrentGroup) {
        //     const leader = first(currentGroup);
        //     gap = lap.laptime - leader.laptime
        // } 

        // totalGapTimes[lap.carId] !== undefined
        //     ? totalGapTimes[lap.carId] += gap
        //     :  totalGapTimes[lap.carId] = gap;

        // console.log(gap, totalGapTimes);

        const result = {
            carId: lap.carId,
            laptime: lap.laptime,
            car: CarNames[findCarById(session, lap.carId).carModel],
            driver: getDriverName(session, lap.carId, lap.driverIndex),
            position: useCurrentGroup ? currentGroup.length + 1 : 1,
            // gap: useCurrentGroup ? 
        };

        if (useCurrentGroup) {
            currentGroup.push(result);
            agg[agg.length - 1] = currentGroup;
        } else {
            agg.push([ result ]);
        }

        return agg;
    }, []);

    const drivers = {};

    allLaps.forEach((l, i) => {
        l.forEach(d => {

            if (!drivers[d.driver]) {
                drivers[d.driver] = {
                    id: `${d.driver} (${d.car})`,
                    data: [],
                };
            }

            drivers[d.driver].data.push({
                x: i + 1,
                y: d.position,
            });
        });
    });

    return Object.values(drivers);
};