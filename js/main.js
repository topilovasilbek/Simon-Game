let ai_clicked_buttons = []
let user_clicked_buttons = []

let level = 0
let waiting_for_click = false
let s = 0

$('#start').click(function () {
  ai_clicked_buttons = []
  user_clicked_buttons = []
  ai_lightsFunction()
})

function levelDetector () {
  if (level === 0) {
    $('#body-top p').text('Game Over!')
    $('#body-top button').css('visibility', 'visible')
    $('#body-top button').text('Restart')
  }  else if (level > 0) {
    $('#body-top p').css('visibility', 'visible')
    $('#body-top p').text('Level ' + level)
    $('#body-top button').css('visibility', 'hidden')
  }
}

function ai_lightsFunction () {
  s = 0;
  level++
  levelDetector()
  waiting_for_click = true
  let the_light = ['green', 'red', 'yellow', 'blue'][
    Math.floor(Math.random() * 4)
  ]
  let intervalID = setInterval(() => {
    $('#' + the_light).addClass('ai-press')
  }, 300)
  setTimeout(() => {
    $('#' + the_light).removeClass('ai-press')
    clearInterval(intervalID)
  }, 600)

  ai_clicked_buttons.push(the_light)
  //console.log("ai ---",ai_clicked_buttons)
}

$('.box').click(function () {
  if (s===0) {
    user_clicked_buttons = [];
  }
  user_clicked_buttons.push(this.id)
  s++
  //console.log("user ---",user_clicked_buttons)
  if (waiting_for_click && s !== ai_clicked_buttons.length) {
    if (user_clicked_buttons[s - 1] == ai_clicked_buttons[s - 1]) {
      makeSound(this.id);
      let intervalID = setInterval(() => {
        $('#' + this.id).addClass('user-press')
      }, 200)
      setTimeout(() => {
        $('#' + this.id).removeClass('user-press')
        clearInterval(intervalID)
      }, 300)
    } else {
      errorFunction()
      levelDetector()
    }
  } else if (waiting_for_click && s == ai_clicked_buttons.length) {
    if (user_clicked_buttons[s - 1] == ai_clicked_buttons[s - 1]) {
      makeSound(this.id);
      let intervalID = setInterval(() => {
        $('#' + this.id).addClass('user-press')
      }, 200)
      setTimeout(() => {
        $('#' + this.id).removeClass('user-press')
        clearInterval(intervalID)
        ai_lightsFunction()
      }, 300)
    } else {
      errorFunction()
      levelDetector()
    }
  } else {
    errorFunction()
  }
})

function errorFunction () {
  makeSound('wrong')
  level = 0;
  s = 0;
  waiting_for_click = false;
  let intervalID = setInterval(() => {
    $('body').addClass('error')
  }, 100)
  setTimeout(() => {
    $('body').removeClass('error')
    clearInterval(intervalID)
  }, 600)
}

function makeSound (which) {
  let audio = new Audio("./sounds/" + which + ".mp3")
  audio.play()
}
