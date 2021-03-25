const config = require('../../../../config.json');
const moment = require('moment');
const watch = require('watch');
const path = require('path');
const fs = require('fs');

const WatchOptions = {
    ignoreDotFiles: true,
    interval: config.watchIntervalSeconds,
};

const ReadOptions = {
    encoding: 'utf16le',
};

const FilenameRegex = /^(?<dateTime>(?<date>\d{6})_(?<time>\d{6}))_(?<sessionType>FP|Q|R)\.json$/;

class ResultsWatcher {

    constructor(config) {
        this.resultsFolder = process.env.RESULTS_PATH || config.resultsFolder;
        this.monitor = null;
        this.watching = false;
        this.callbacks = [];
    }

    getAllResults () {
        if (!fs.existsSync(this.resultsFolder)) {
            throw new Error(`[ERR] No such folder: ${this.resultsFolder}`);
        }

        const files = fs.readdirSync(this.resultsFolder);
        return files.map(file => this._parseResultsInfo(file));
    }

    watch () {
        if (this.watching) {
            throw new Error('[ERR] Watch in progress');
        }

        if (!fs.existsSync(this.resultsFolder)) {
            throw new Error(`[ERR] No such folder: ${this.resultsFolder}`);
        }

        watch.createMonitor(this.resultsFolder, WatchOptions, (monitor) => {

            monitor.on('created', filePath => this.onFolderChange(filePath));
            
            this.monitor = monitor;
            this.watching = true;
        });
    }

    stop () {
        if (!this.watching) {
            throw new Error('[ERR] No watch in progress');
        }

        this.monitor.stop();
        this.watching = false;
    }

    _parseResultsInfo (file) {
        const match = file.match(FilenameRegex);

        if (
            !match.groups.dateTime
            || !match.groups.date
            || !match.groups.time
            || !match.groups.sessionType
        ) {
            throw new Error(`[ERR] Unable to parse filename: ${file}`);
        }

        return {
            sessionType: match.groups.sessionType,
            startTime: moment(match.groups.dateTime, 'YY/MM/DD_hhmmss'),
            session: JSON.parse(
                fs.readFileSync(
                    path.join(this.resultsFolder, file),
                    ReadOptions,
                ),
            ),
        };
    }

    onFolderChange (filePath) {
        const fileName = path.basename(filePath);
        const result = this._parseResultsInfo(fileName);

        this.callbacks.forEach(callback => callback(result));
    }

    onNewResult(callback) {
        this.callbacks.push(callback);
    }
}

module.exports = new ResultsWatcher(config);