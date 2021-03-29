
class Cache {

    cache = {};

    set(key, value) {
        this.cache[key] = value;
        return value;
    }

    get(key) {
        return this.cache[key];
    }

    remove(key) {
        delete this.cache[key];
    }

    invalidate() {
        this.cache = {};
    }
}

export default Cache;