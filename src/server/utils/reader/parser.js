import moment from 'moment';
import { last } from 'underscore';
import { AccReader } from 'simresults';

const ResultsCacheKey = 'Parser_Result_Groups';

class ResultsParser {

    constructor(reader, cache) {
        this._init = false;
        this._cache = cache;
        this._reader = reader;
        this._callbacks = [];
    }

    init() {
        this._init = true;
        this._initAllSessions();

        this._reader.watch();
        this._reader.onNewResult(result => this._updateSessions(result));
    }

    getAllResults() {
        if (!this._init) {
            this.init();
        }

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
                // /!\ Ignore any sessions wth no laps
                .filter(r => r.session.laps.length > 0)
                // /!\ Ignore any sessions wth no participants
                .filter(r => r.session.sessionResult.leaderBoardLines.length > 0)
                // Sort all the sessions in the order they happened, from top (oldest) to bottom (newest)
                .sort((a, b) => a.startTime > b.startTime)
                // Now that we have all the sessions in order, attempt to group them together
                // the grouping strategy is as follows
                // trackName must match, serverName must match, raceWeekendIndex must match, sessionIndex must be sequential
                // When any of these conditions are no longer met, then the group has ended, close it and start a new one
                .reduce((agg, result) => this._groupSessions(agg, result), [])
        );

        this._cache.set(ResultsCacheKey, sortedResults);
    }

    _updateSessions(result) {
        const ignore = (
            // /!\ Ignore any sessions with a raceWeekendIndex of -1, these appear to be staging sessions?
            result.session.raceWeekendIndex === -1
            // /!\ Ignore any sessions wth no laps
            || result.session.laps.length === 0
            // /!\ Ignore any sessions wth no participants
            || result.session.sessionResult.leaderBoardLines.length === 0
        );

        if (ignore) {
            return;
        }

        const oldSessions = this._cache.get(ResultsCacheKey);
        const updatedSessions = this._groupSessions(oldSessions, result);

        this._cache.set(ResultsCacheKey, updatedSessions);
        this._callbacks.forEach(callback => callback(updatedSessions));
    }

    _groupSessions(agg, result) {

        const session = (
            new AccReader(result.session)
                .getSession()
                .setDate(moment(result.startTime).toDate())
        );

        const currentGroup = last(agg);
        const previousSession = last(currentGroup);
        const useCurrentGroup = (
            previousSession
            && session.getTrack().getVenue() === previousSession.getTrack().getVenue()
            && session.getServer().getName() === previousSession.getServer().getName()
            && session.getRaceWeekendIndex() === previousSession.getRaceWeekendIndex()
            && session.getSessionIndex() > previousSession.getSessionIndex()
        );

        if (useCurrentGroup) {
            currentGroup.push(session);
            agg[agg.length - 1] = currentGroup;
        } else {
            agg.push([ session ]);
        }

        return agg;
    }
};

export default ResultsParser;