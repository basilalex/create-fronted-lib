'use strict';
const { DefaultReporter } = require('@jest/reporters');

const keysColor = {
    failed: '\x1b[31m',
    removed: '\x1b[32m',
    written: '\x1b[32m',
    updated: '\x1b[32m',
    passed: '\x1b[32m',
    total: '\x1b[37m',
};

const suitesKeys = {
    failed: 'numFailedTestSuites',
    passed: 'numPassedTestSuites',
    total: 'numTotalTestSuites',
};

const testsKeys = {
    failed: 'numFailedTests',
    passed: 'numPassedTests',
    total: 'numTotalTests',
};

const snapshotsKeys = {
    failed: 'unmatched',
    removed: 'unchecked',
    written: 'added',
    updated: 'updated',
    passed: 'matched',
    total: 'total',
};

class JestReporter extends DefaultReporter {
    log(message) {
        process.stdout.write(`${message}\n`);
    }

    createRes(num, type) {
        return num ? `${keysColor[type]}${num} ${type}\x1b[0m` : '';
    }

    createLine(result, keysObj) {
        return Object.entries(keysObj)
            .map(([type, key]) => this.createRes(result[key], type))
            .filter(Boolean)
            .join(', ');
    }

    onRunComplete(_, result) {
        const time = Date.now() - result.startTime;
        console.log(`Test Suites:\t${this.createLine(result, suitesKeys)}`);
        console.log(`Tests:\t\t${this.createLine(result, testsKeys)}`);
        console.log(`Snapshots:\t${this.createLine(result.snapshot, snapshotsKeys)}`);
        console.log(`Time:\t\t${time / 1000}s`);
        super.onRunComplete(_, result);
    }
}

module.exports = JestReporter;
