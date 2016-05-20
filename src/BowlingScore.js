var _ = require('lodash')

function BowlingScore() {

}

function sum(a, b) {
    return a + b
}


function isStrike(remainingRolls) {
    return remainingRolls[0] == 10
}
function scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls) {
    return {currentFrameScore: currentFrameScore, nextRemainingRolls: nextRemainingRolls}
}
function applyStrike(remainingRolls) {
    var currentFrameScore = 10 + remainingRolls[1] + remainingRolls[2]
    var nextRemainingRolls = _.drop(remainingRolls, 1);
    return scoreAndRemainingRolls(currentFrameScore, nextRemainingRolls)
}
var strikeCalculator = {
    matches: isStrike,
    calculateScore: applyStrike
}

function isSpare(remainingRolls) {
    return remainingRolls[0] + remainingRolls[1] == 10
}
function recursiveFrameScore(remainingRolls) {
    if (remainingRolls.length === 0) return []


    var currentFrameScore;
    var nextRemainingRolls;
    var __ret;


    if (strikeCalculator.matches(remainingRolls)) {
        __ret = strikeCalculator.calculateScore(remainingRolls);
        currentFrameScore = __ret.currentFrameScore
        nextRemainingRolls = __ret.nextRemainingRolls
    }
    else if (isSpare(remainingRolls)) {
        currentFrameScore = 10 + remainingRolls[2]
        nextRemainingRolls = _.drop(remainingRolls, 2);
    } else {
        currentFrameScore = remainingRolls[0] + remainingRolls[1];
        nextRemainingRolls = _.drop(remainingRolls, 2);
    }

    return [currentFrameScore].concat(recursiveFrameScore(nextRemainingRolls))
}

function totalScore(allRolls) {
    var framesScores = recursiveFrameScore(allRolls)
    return framesScores.reduce(sum)
}

BowlingScore.totalScore = totalScore

module.exports = BowlingScore
