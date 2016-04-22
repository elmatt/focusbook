"use strict";

const SNOOZES = [
  'fuck off', 
  'later..', 
  "leave me alone", 
  'go bother someone else',
  'five more minutes',
  'I will continue to waste my life',
]

const QUESTIONS = [
  "What are you doing?",
  "Why did you open facebook? What do you need?",
  "WHY?? What do you need to do that's so important?",
  "Really...what's so important?",
  "Fine, just tell me why you needed to open facebook",
  "Do you not see how nice it is outside?"
]

var app = {
  hiddenCount: 0,
  didChangeTaskText: false,
}
app.topContainerElement = document.createElement('div');
app.topContainerElement.setAttribute('id', 'focusbookTopContainer');
app.topContainerElement.setAttribute('class', 'focusbookActive');
app.topContainerElement.style.top = '-300px'

//MAIN CONTAINER
app.mainContainerElement = document.createElement('div');
app.mainContainerElement.setAttribute('id', 'focusbookMainContainer');

app.textElement = document.createElement("span");
app.textElement.innerHTML = 
app.textElement.innerHTML = QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];
app.textElement.setAttribute('id', 'focusbookMainText');

app.inputElement = document.createElement("input")
app.inputElement.setAttribute('id', 'focusbookInput');
app.inputElement.setAttribute('type', 'text');


app.inputElement.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      hideTask();
      startTask(this.value)
      return false;
    }
  }

app.mainContainerElement.appendChild(app.textElement);
app.mainContainerElement.appendChild(app.inputElement);


// BUTTONS CONTAINER
app.buttonsContainerElement = document.createElement('div');
app.buttonsContainerElement.setAttribute('id', 'focusbookButtons');

app.snoozeButton = document.createElement('button');
app.snoozeButton.setAttribute('id', 'snoozeButton');
app.snoozeButton.setAttribute('class', 'focusbookButton')
app.snoozeButton.onclick = hideTask;

app.buttonsContainerElement.appendChild(app.snoozeButton);

function showTask() {
  app.topContainerElement.setAttribute('class', app.task ? 'focusbookPassive' : 'focusbookActive')
  app.topContainerElement.style.top = '0px'
  app.snoozeButton.innerHTML = SNOOZES[Math.floor(Math.random()*SNOOZES.length)];
  app.expandTimer = setTimeout(expandContainer,  10000);
}

function hideTask() {
  app.topContainerElement.setAttribute('class', 'focusbookPassive')
  app.topContainerElement.style.top = '-300px'
  app.hiddenCount ++
  app.timer = setTimeout(showTask,  20000 + 10000 * app.hiddenCount * app.hiddenCount);
}

function expandContainer() {
  app.topContainerElement.setAttribute('class', 'focusbookExpanding')
}

function startTask(taskString) {
  app.task = taskifyString(taskString)
  app.didChangeTaskText = app.task != taskString
  if (app.didChangeTaskText) {
    app.textElement.innerHTML = "Finished " + app.task + "? GET BACK TO FUCKING WORK!";
  } else {
    app.textElement.innerHTML = `'${app.task}' - finished yet? GO WORK!`;
  }
  app.inputElement.setAttribute('class', 'focusbookPassive')
  app.snoozeButton.style.visibility = "visible";
}

function taskifyString(string) {
  newString = string.toLowerCase();
  newString = newString.replace(" my ", " your ");
  let array = newString.split(" ")

  if (array[0].toLowerCase() == 'to') {
    array.shift()
    array[0] = array[0] + 'ing';
  }

  return array.join(' ');

}

app.topContainerElement.appendChild(app.mainContainerElement);
app.topContainerElement.appendChild(app.buttonsContainerElement);

document.all[0].appendChild(app.topContainerElement);
showTask();
// let container =  document.createElement("div");
// container.setAttribute('id', 'focusbookTopContainer');
// container.innerHTML = `
// <div id='focusbookMainContainer' class='focusbookActive'>
//   <span id='focusbookMainText'>
//     What do you need to do?
//   </span>
//   <input id='focusbookInput' type='text'>
//   </input>
//   <span id='focusbookButtons'>
//     <button id='snoozeButton' class='focusbookButton'>
//       snooze
//     </button>

//     <button id='doneButton' class='focusbookButton'>
//       done
//     </button> 
//   </span>
// </div>
// `
// document.all[0].appendChild(container);

// document.getElementById("focusbookInput").onkeypress = function(e){
//     if (!e) e = window.event;
//     var keyCode = e.keyCode || e.which;
//     if (keyCode == '13'){
//       startTask(this.value)
//       return false;
//     }
//   };



// function startTask(taskString) {
//   let newString = taskString.replace(" my ", " your ")
//   let text = document.getElementById("focusbookMainText")
//   text.innerHTML = "GO "  + newString.toUpperCase()
//   container.setAttribute('class', 'focusbookPassive')

//   document.getElementById("focusbookInput").setAttribute('class', 'focusbookPassive')
// }


