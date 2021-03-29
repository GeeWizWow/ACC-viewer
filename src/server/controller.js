
export default class SimresultsController {

    cache;
    simresultsMediator;

    constructor (simresultsMediator, cache) {
        this.cache = cache;
        this.simresultsMediator = simresultsMediator;
    }

    getFullViewModel() {
        return {
            allLaps: this.getAllLapsViewModel(),
            bestLaps: this.getBestLapsViewModel(),
            events: this.getEventsViewModel(),
            positions: this.getPositionsViewModel(),
            results: this.getResultsViewModel(),
            sectors: this.getSectorsViewModel(),
            consistency: this.getConsistencyViewModel(),
        };
    }

    getEventsViewModel() {
        const cacheKey = 'getEventsViewModel';
        const cachedValue = this.cache.get(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const value = this.simresultsMediator.getEventsData();

        this.cache.set(cacheKey, value);
        
        return value;
    }

    getResultsViewModel() {
        const cacheKey = 'getResultsViewModel';
        const cachedValue = this.cache.get(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const value = this.simresultsMediator.getResultsData();

        this.cache.set(cacheKey, value);
        
        return value;
    }

    getAllLapsViewModel() {
        const cacheKey = 'getAllLapsViewModel';
        const cachedValue = this.cache.get(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const value = this.simresultsMediator.getAllLapsData();

        this.cache.set(cacheKey, value);
        
        return value;
    }

    getBestLapsViewModel() {
        const cacheKey = 'getBestLapsViewModel';
        const cachedValue = this.cache.get(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const value = this.simresultsMediator.getBestLapsData();

        this.cache.set(cacheKey, value);
        
        return value;
    }

    getSectorsViewModel() {
        const cacheKey = 'getSectorsViewModel';
        const cachedValue = this.cache.get(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const value = this.simresultsMediator.getSectorsData();

        this.cache.set(cacheKey, value);
        
        return value;
    }

    getPositionsViewModel() {
        const cacheKey = 'getPositionsViewModel';
        const cachedValue = this.cache.get(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const value = this.simresultsMediator.getPositionsData();

        this.cache.set(cacheKey, value);
        
        return value;
    }

    getConsistencyViewModel() {
        const cacheKey = 'getConsistencyViewModel';
        const cachedValue = this.cache.get(cacheKey);

        if (cachedValue) {
            return cachedValue;
        }

        const value = this.simresultsMediator.getConsistencyData();

        this.cache.set(cacheKey, value);
        
        return value;
    }
}