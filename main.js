/*  Your Code Below 
let timeLeft = 10000
setInterval(() => {
  timeLeft -= 100
  console.log(timeLeft)
}, 100) */

//game over box elem
const $gameOverBox = $('#game-over-box')
const $score = $('#score')
const $restartButton = $('#restart-btn')

// answer box elem
const $answerBox = $('#answer-box')
const $secondsLeft = $('#secondsLeft')
const $num1 = $('#num1')
const $num2 = $('#num2')
const $solutionInput = $('#solution-input')

//Default
const INIT_SECONDS = 10
const INIT_MS = INIT_SECONDS * 1000
const REWARD_SECONDS = 10
const REWARD_MS = REWARD_SECONDS * 1000
const CLOCK_INVOKE_INTERVAL = 100

let answer, clockInterval, timeLeft, points = 0

function generateRandomInt() {
  return Math.ceil(Math.random() *10)
}

function generateEquation() {
  const num1 = generateRandomInt()
  const num2 = generateRandomInt()
  answer = num1 + num2

  $num1.text(num1)
  $num2.text(num2)
}

function gameOver(){
  console.log('game is over')
  clearInterval(clockInterval)
  clockInterval = null
  $answerBox.hide()
  $gameOverBox.show()
  $score.html(points)
}

function startClock() {
  timeLeft = INIT_MS
  clockInterval = setInterval(function() {
    timeLeft -= 100

    if (timeLeft <= 0) gameOver()

    $secondsLeft.text((timeLeft / 1000).toFixed(1))
  }, CLOCK_INVOKE_INTERVAL)
}

$solutionInput.on('input', function() {
  console.log(clockInterval)
  if (!clockInterval) startClock()

  if (Number($solutionInput.val()) === answer) {
    points += 5
    timeLeft += REWARD_MS
    $solutionInput.css('border-color', '') //display a '' border
    $solutionInput.val('')
    generateEquation()
  } else {
    $solutionInput.css('border-color', 'red') //display a red border
  }
})

function reset(){
  $gameOverBox.hide()
  $answerBox.show()
  $secondsLeft.text(INIT_SECONDS)
  $solutionInput.val('').css('border-color', '')
}

$restartButton.on('click', reset)

/* add 10 seconds
if true,
timeLeft = timeLeft + REWARDS_SECONDS

  }, CLOCK_INVOKE_INTERVAL)

replace question with new math problem*/


generateEquation()  