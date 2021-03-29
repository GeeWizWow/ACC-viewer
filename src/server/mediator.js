import { SessionType } from 'simresults';
import { map, indexBy, range, rest, first, reduce } from 'underscore';

export default class SimresultsMediator {

    resultsParser;

    constructor (resultsParser) {
        this.resultsParser = resultsParser;
    }

    getEventsData () {
        const events = map(this.resultsParser.getAllResults(), event => {

            const session = first(event);

            return {
                id: this._getEventId(event),
                track: session.getTrack().getVenue(),
                time: session.getDate(),
                sessions: event.map(s => s.getType()),
            };
        });

        return events.reverse();
    };

    getResultsData () {
        const events = map(this.resultsParser.getAllResults(), event => {
            const sessions = map(event, session => {

                const sessionType = session.getType();
                const isRace = sessionType === SessionType.Race;
                const sessionBestLap = session.getBestLap();

                const leaderboard = reduce(
                    session.getParticipants(), 
                    (agg, part, index) => {

                        const bestLap = part.getBestLap();
                        const previous = index > 0 && agg[agg.length - 1];
                        const previousBestLap = previous && previous.bestlap;
                        const previousTime = previous && previous.time;

                        const line = {
                            position: part.getPosition(),
                            no: part.getVehicle().getNumber(),
                            driver: part.getDriver().getName(),
                            car: part.getVehicle().getName(),
                            laps: part.getNumberOfLaps(),
                            bestlap: bestLap && bestLap.getTime(),
                            consistencyPc: isRace && part.getConsistencyPercentage(),
                            time: isRace && part.getTotalTime(),
                            timeGap: isRace && previousTime && part.getTotalTime() - previousTime,
                            led: isRace && part.getNumberOfLapsLed(),
                            gain: isRace && part.getPositionDifference(),
                            gap: previousBestLap && bestLap && bestLap.getTime() - previousBestLap,
                        };

                        return [ ...agg, line ];
                    },
                    [],
                );

                return {
                    type: session.getType(),
                    track: session.getTrack().getVenue(),
                    lastedLaps: session.getLastedLaps(),
                    bestlap: sessionBestLap && sessionBestLap.getTime(),
                    bestlapDriver: sessionBestLap && sessionBestLap.getParticipant().getDriver().getName(),
                    winner: isRace && session.getWinningParticipant().getDriver().getName(),
                    ledMost: isRace && session.getLedMostParticipant().getDriver().getName(),
                    leaderboard: leaderboard,
                };
            });

            return {
                id: this._getEventId(event),
                data: indexBy(sessions, 'type'),
            };
        });

        return indexBy(events, 'id');
    }

    getAllLapsData () {
        const events = map(this.resultsParser.getAllResults(), event => {
            const sessions = map(event, session => {

                const sessionBest = session.getBestLap();
                const sectorOneBest = session.getBestLapBySector(1);
                const sectorTwoBest = session.getBestLapBySector(2);
                const sectorThreeBest = session.getBestLapBySector(3);

                const sessionSectorBests = [
                    sectorOneBest && sectorOneBest.getSectorTimes()[0],
                    sectorTwoBest && sectorTwoBest.getSectorTimes()[1],
                    sectorThreeBest && sectorThreeBest.getSectorTimes()[2],
                ];

                const participants = map(session.getParticipants(), part => {

                    const average = part.getAverageLap();
                    const bestPossible = part.getBestPossibleLap();
                    const best = part.getBestLap();
                    const sectorBests = bestPossible && bestPossible.getSectorTimes();

                    const laps = map(part.getLaps(), lap => {

                        const sectors = map(lap.getSectorTimes(), (sector, index) => ({
                            time: sector,
                            isPersonalBest: sectorBests && sector === sectorBests[index],
                            isOverallBest: sector === sessionSectorBests[index],
                        }));

                        return {
                            no: lap.getNumber(),
                            car: lap.getVehicle().getName(),
                            time: lap.getTime(),
                            isPersonalBest: lap === best,
                            isOverallBest: lap === sessionBest,
                            sectors: sectors,
                        };
                    });

                    return {
                        name: part.getDriver().getName(),
                        laps: laps,
                        average: {
                            time: average && average.getTime(),
                            sectors: average && average.getSectorTimes(),
                        },
                        bestPossible: {
                            time: bestPossible && bestPossible.getTime(),
                            sectors: bestPossible && bestPossible.getSectorTimes(),
                        },
                    };
                });

                return {
                    type: session.getType(),
                    participants: participants,
                };
            });

            return {
                id: this._getEventId(event),
                data: indexBy(sessions, 'type'),
            };
        });

        return indexBy(events, 'id');
    }

    getBestLapsData () {
        const events = map(this.resultsParser.getAllResults(), event => {
            const sessions = map(event, session => {

                const byDriver = reduce(
                    session.getBestLapsGroupedByParticipant(), 
                    (agg, lap, index) => [
                        ...agg,
                        {
                            no: lap.getNumber(),
                            driver: lap.getDriver().getName(),
                            car: lap.getVehicle().getName(),
                            time: lap.getTime(),
                            gap: index > 0 && lap.getTime() - agg[index - 1].time,
                        },
                    ],
                    [],
                );

                const bestLaps = session.getLapsSortedByTime().filter(lap => lap.getTime())

                const top20 = reduce(
                    first(bestLaps, 20), 
                    (agg, lap, index) => [
                        ...agg,
                        {
                            no: lap.getNumber(),
                            driver: lap.getDriver().getName(),
                            car: lap.getVehicle().getName(),
                            time: lap.getTime(),
                            gap: index > 0 && lap.getTime() - agg[index - 1].time,
                        },
                    ],
                    [],
                );

                return {
                    type: session.getType(),
                    byDriver: byDriver,
                    top20: top20,
                };
            });

            return {
                id: this._getEventId(event),
                data: indexBy(sessions, 'type'),
            };
        });

        return indexBy(events, 'id');
    }

    getSectorsData () {
        const events = map(this.resultsParser.getAllResults(), event => {
            const sessions = map(event, session => {

                const sectors = map([1, 2, 3], sector => {
                    return reduce(
                        session.getBestLapsBySectorGroupedByParticipant(sector),
                        (agg, lap, index) => [
                            ...agg,
                            {
                                no: lap.getNumber(),
                                driver: lap.getDriver().getName(),
                                car: lap.getVehicle().getName(),
                                time: lap.getSectorTime(sector),
                                gap: index > 0 && lap.getSectorTime(sector) - agg[index - 1].time,
                            },
                        ],
                        [],
                    );
                });

                return {
                    type: session.getType(),
                    sectors: sectors,
                };
            });

            return {
                id: this._getEventId(event),
                data: indexBy(sessions, 'type'),
            };
        });

        return indexBy(events, 'id');
    }

    getPositionsData () {
        const events = map(this.resultsParser.getAllResults(), event => {
            const sessions = map(event, session => {

                const sessionType = session.getType();
                const isRace = sessionType === SessionType.Race;
                const participants = isRace ? session.getParticipants() : [];

                const positions = map(participants, part => {

                    const id = `${part.getDriver().getName()} (${part.getVehicle().getName()})`

                    const data = reduce(
                        rest(range(session.getLastedLaps())), 
                        (agg, index) => {
                            const lapNum = index + 1;
                            const lap = part.getLap(lapNum);
                            const position = lap && lap.getPosition();

                            return position ? [ ...agg, { x: lapNum, y: position } ] : agg;
                        },
                        [],
                    );

                    return {
                        id: part.getDriver().getName(),
                        data: data,
                    };
                }); 

                return {
                    type: sessionType,
                    positions: positions,
                };
            });

            return {
                id: this._getEventId(event),
                data: indexBy(sessions, 'type'),
            };
        });

        return indexBy(events, 'id');
    }

    getConsistencyData() {
        const events = map(this.resultsParser.getAllResults(), event => {
            const sessions = map(event, session => {

                const consistency = map(session.getParticipants(), part => {

                    return {
                        driver: part.getDriver().getName(),
                        car: part.getVehicle().getName(),
                        consistency: part.getConsistency(),
                        consistencyPc: part.getConsistencyPercentage(),
                    };
                });

                return {
                    type: session.getType(),
                    consistency: consistency,
                };
            });

            return {
                id: this._getEventId(event),
                data: indexBy(sessions, 'type'),
            };
        });

        return indexBy(events, 'id');
    }

    _getEventId (sessions) {
        const allSessions = [].concat(sessions);
        const dateStr = first(allSessions).getDate().toJSON();

        // https://stackoverflow.com/a/7616484
        let hash = 0;
        let i; 
        let chr;
    
        for (i = 0; i < dateStr.length; i++) {
            chr = dateStr.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        
        return hash;
    };

}