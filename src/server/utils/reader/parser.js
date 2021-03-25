const cacheLayer = require('../cache');
const resultsReader = require('./watcher');
const { last, rest } = require('underscore');

const ResultsCacheKey = 'Parser_Result_Groups';

class ResultsParser {

    constructor(reader, cache) {
        this._cache = cache;
        this._reader = reader;
        this._callbacks = [];
    }

    init() {
        this._initAllSessions();

        this._reader.watch();
        this._reader.onNewResult(result => this._updateSessions(result));
    }

    getAllResults() {
        return this._cache.get(ResultsCacheKey);
    }

    onNewResult(callback) {
        this._callbacks.push(callback);
    }

    _initAllSessions() {
        const allResults = this._reader.getAllResults();
        const sortedResults = (
            allResults
                // /!\ Ignore any sessions with a raceWeekendIndex of -1, these appear to be staging sessions?
                .filter(r => r.session.raceWeekendIndex > -1)
                // Sort all the sessions in the order they happened, from top (oldest) to bottom (newest)
                .sort((a, b) => a.startTime > b.startTime)
                // Lap one times can be bugged on ACC, 30+ mins, fix them here
                .map(r => this._applyLapOneFix(r))
                // Now that we have all the sessions in order, attempt to group them together
                // the grouping strategy is as follows
                // trackName must match, serverName must match, raceWeekendIndex must match, sessionIndex must be sequential
                // When any of these conditions are no longer met, then the group has ended, close it and start a new one
                .reduce((agg, result) => this._groupSessions(agg, result), [])
        );

        this._cache.set(ResultsCacheKey, sortedResults);
    }

    _updateSessions(result) {
        const fixedResult = this._applyLapOneFix(result);
        const oldSessions = this._cache.get(ResultsCacheKey);
        const updatedSessions = this._groupSessions(oldSessions, fixedResult);

        this._cache.set(ResultsCacheKey, updatedSessions);
        this._callbacks.forEach(callback => callback(updatedSessions));
    }

    _groupSessions(agg, result) {
        const currentGroup = last(agg);
        const previousSession = last(currentGroup);
        const useCurrentGroup = (
            previousSession
            && result.session.trackName === previousSession.session.trackName
            && result.session.serverName === previousSession.session.serverName
            && result.session.raceWeekendIndex === previousSession.session.raceWeekendIndex
            && result.session.sessionIndex > previousSession.session.sessionIndex
        );

        if (useCurrentGroup) {
            currentGroup.push(result);
            agg[agg.length - 1] = currentGroup;
        } else {
            agg.push([ result ]);
        }

        return agg;
    }

    _applyLapOneFix = (result) => {
        if (
            result.session.sessionType !== 'R'
            || result.session.laps.length === 0
        ) {
            return result;
        }

        // Grab a list of all entrants and their total race time
        const entrants = result.session.sessionResult.leaderBoardLines.map(entry => entry.car.carId);
    
        entrants.forEach((carId) => {
    
            // Grab a list of every first sector time this car posted
            const raceSplits = result.session.laps
                .filter(l => l.carId === carId)
                .reduce((agg, l) => [ ...agg, l.splits[0] ], []);
    
            // Discard the first entry, as it contains the error
            // and average the remaining ones, including a increment of 5 seconds to simulate the grid start additional time
            const adjustedFirstSplit = (
                (rest(raceSplits).reduce((agg, split) => agg + split, 0) / (raceSplits.length - 1)) + 5000
            );
    
            // find the affected lap, and replace it's first sector time 
            // with the new one we calculated
            const lapIndex = result.session.laps.findIndex(l => l.carId === carId);
    
            result.session.laps[lapIndex].splits[0] = adjustedFirstSplit;
            result.session.laps[lapIndex].laptime = result.session.laps[lapIndex].splits.reduce((agg, split) => agg + split, 0);
        });
       
        return result;
    };

};

module.exports = new ResultsParser(resultsReader, cacheLayer);