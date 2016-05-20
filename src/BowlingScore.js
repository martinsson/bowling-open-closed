var _ = require('lodash')
var FrameTypes = require('./FrameTypes')
var strikeFrame = FrameTypes.strikeFrame
var spareFrame = FrameTypes.spareFrame
var normalFrame = FrameTypes.normalFrame

function BowlingScore() {

}

function sum(a, b) {
    return a + b
}

function recursiveFrameScore(remainingRolls) {
    if (remainingRolls.length === 0) return []

    var allFrameTypes = [strikeFrame(), spareFrame(), normalFrame()]
    var frameType = FrameTypes.findFrameType(allFrameTypes, remainingRolls)

    var scoreAndNextRolls = frameType.calculateScore(remainingRolls)

    var nextFrameScores = recursiveFrameScore(scoreAndNextRolls.nextRolls)
    return [scoreAndNextRolls.frameScore].concat(nextFrameScores)
}

function totalScore(allRolls) {
    var framesScores = recursiveFrameScore(allRolls)
    return framesScores.reduce(sum)
}

BowlingScore.totalScore = totalScore

module.exports = BowlingScore
