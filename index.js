// As you can see, the HTML page has a div element with an id called buttonsContainer.

// ! Show HTML

// I added five buttons dynamically using for loop in the JavaScript code below.

// const buttonsContainer = document.getElementById("buttonsContainer");

// for (var i = 0; i < 5; i++) {
//   const button = document.createElement("button");
//   button.innerText = i;
//   button.addEventListener("click", function () {
//     console.log(i);
//   });
//   buttonsContainer.appendChild(button);
// }

// I also attached a click event to a button element and appended it to the buttonContainer
//  element on each iteration.

// If I run the code at this stage, I will get a value of 5 regardless of what button is pressed.

// Before understanding what’s happening here… we need to know…what is hoisting.

// ! Hoisting

// By default, a variable declared with var keyword is function scoped but not block-scoped.

// So, any variable declared inside a function, regardless of how deep it is,
//  will be moved to the top and accessible anywhere inside that function.

// On the other hand, if a variable is declared outside of a function, it will become a
//  globally scoped variable and we can access it anywhere in the application as it belongs
//  to the window object (browser only).

// That behavior is called Hoisting.

// ! Variable i Always Has The Last Index

// Let’s see what happens to the code above now.

// The i variable declared with var keyword will be automatically moved to the top of the page
//  as it’s not declared inside a function so it becomes a global variable due to hoisting.

// So the i variable is clearly not scoped to the for loop, but it’s globally scoped and it’s bound
//  to the same variable outside of the callback function on each iteration.

// By the time the for loop reaches the last iteration, the i variable will end up holding the
//  last index value. That’s why the output will always be the last index, in my case, 5.

// ! i Is A Global Variable

// I am going to console log the i variable outside of the for loop.

// console.log("this is I", i);

// You will get 5 in the browser console as soon as the code finishes executing without even
//  clicking any of the buttons.

// This proves that the variable i is globally scoped.

// Now we know the culprit, which is the i variable declared with the var keyword.

// Let’s take a look at a few solutions to fix it.

// ! Solution #1: Closure

// We can use closure to change the scope of the i variable making it possible for functions
//  to have private variables.

// Using closure, we can uniquely save the loop index separately on each callback function.

// const buttonsContainer = document.getElementById("buttonsContainer");

// for (var i = 0; i < 5; i++) {
//   var button = document.createElement("button");
//   button.innerText = i;
//   (function (index) {
//     button.addEventListener("click", function () {
//       console.log(index);
//     });
//   })(i);
//   buttonsContainer.appendChild(button);
// }

// console.log(i);

// Let’s see that in action.

// First, define closure using () opening and closing parenthesis inside the for loop.

// After that, declare an anonymous function that takes the index parameter.

// Then, pass the global variable i into the closure with the final set of ()’s,
//  which calls the closure once on each iteration.

// This is also called Immediately Invoked Function Expression (IIFE) which is one way of
//  declaring closures.

// (function(){
// })()

// So, the above code captures the value of the i variable at each iteration and passes
//  it into an argument to the function which creates a local scope.

// Now each function gets its own version of an index variable that won’t change when
//  functions are created within that loop.

// This closure function preserves the value of the i (the private variable) uniquely for each
// event handler so they each have access to their own value.

// When you click any of the buttons after the for loop ends, an appropriate callback function
// will be executed with a correct index value.

// ! Solution #2: Closure Outer Function Returns Inner Function

// Alternatively, you can return a function that is inside the closure callback function.

// const buttonsContainer = document.getElementById("buttonsContainer");

// for (var i = 0; i < 5; i++) {
//   let button = document.createElement("button");
//   button.innerText = i;
//   button.addEventListener(
//     "click",
//     (function (index) {
//       return function () {
//         console.log(index);
//       };
//     })(i)
//   );
//   buttonsContainer.appendChild(button);
// }

// console.log(i);

// In the previous example, the entire button click event listener
//  code is wrapped with the closure.

// In this example, just the button click callback function is wrapped with a closure.

// The outer function will be executed on every iteration and the i variable (global) is passed
//  as an argument in the caller of the outer function like this (i).

// The inner function will be returned on each iteration and attached to the click event with
//  the unique index value.

// In closure, the inner functions can have access to variables that are declared outside of
//  it even after the outer function is returned.

// ! Solution #3: Use forEach Instead Of for

// The forEach method is a higher-order function that takes a callback function as an argument.

// The callback function takes three arguments: currentValue, index, and array.

// The forEach loop, by default, provides a clean and natural way of getting a distinct
//  callback closure function on every iteration.

// const buttonsContainer = document.getElementById("buttonsContainer");

// const num = [0, 1, 2, 3, 4];

// num.forEach((i) => {
//   var button = document.createElement("button");
//   button.innerText = i;

//   button.addEventListener("click", function () {
//     console.log(i);
//   });
//   buttonsContainer.appendChild(button);
// });

// console.log(i);

// It works without adding any extra wrapper function, which is cleaner than the previous example!

// ! Solution #4: Use let Instead Of var

// In ES6, we have let and const keywords that are block-scoped in contrast to var that is
//  function scoped. In other words, let and const are also hoisted like var but they’re not
//  initialized with a default value.

// So, using the let keyword binds a fresh callback function with an index value on each iteration
//  rather than using the same reference over and over again.

// To fix that, change var to let from the original code and it works.

// for (let i = 0; i < 5; i++) {
//   const button = document.createElement("button");
//   button.innerText = i;
//   button.addEventListener("click", function() {
//     console.log(i)
//   })
//   buttonsContainer.appendChild(button);
// }

// This is the quickest way to fix the click event issue inside a loop.

// But, the one issue with this approach is to be careful with browser backward compatibility as
//  it’s part of the ES6 feature.

// ! Declare Callback Function Outside Of The Loop

// Sometimes we want to declare a callback function separately with a name rather than using
//  an inline anonymous function inside the addEventListener constructor.

// So declare a callback function called buttonClicked() function and invoke it inside the
// addEventListener constructor without any parenthesis.

// By default, the event object is passed into the buttonClicked() function.

// Then, I can easily get access to any information about the selected element using an event object.

// const buttonsContainer = document.getElementById("buttonsContainer");

// for (let i = 0; i < 5; i++) {
//     const button = document.createElement("button");
//     button.innerText = i;
//     button.id = 'button-' + i;
//     button.setAttribute('index', i);
//     button.addEventListener("click", buttonClicked)
//     buttonsContainer.appendChild(button);
//   }

//   function buttonClicked(e) {
//     console.log(e.target.id)
//     console.log(e.target.getAttribute('index'));
//   }

// ?   What if I want to pass a value directly to the callback function as an argument?

// for (let i = 0; i < 5; i++) {
//   const button = document.createElement("button");
//   button.innerText = i;
//   button.id = 'button-' + i;
//   button.setAttribute('index', i);
//   button.addEventListener("click", buttonClicked(i))
//   buttonsContainer.appendChild(button);
// }

// function buttonClicked(index) {
//   return function() {
//     console.log(index)
//   }
// }

// ! Bubbling event listeners

/**
 * This won't work!
 */
// window.addEventListener("click, scroll", function (event) {
//   console.log(event); // The event details
//   console.log(event.target); // The
//   // clicked element
// });

// ! Bubbling event listeners

// Setup our function to run on various events;

// function logTheEvent(event) {
//   console.log("The Event that happened", event.type);
// }
// // Add our event listeners
// document.addEventListener("click", logTheEvent);
// window.addEventListener("scroll", logTheEvent);
// document.addEventListener("keyup", logTheEvent);
// document.addEventListener("keydown", logTheEvent);

// ! Event Bubbling Method

const buttonsContainer = document.getElementById("buttonsContainer");

function logTheEvent(event) {
  console.log(event.target);
  if (event.target.className === "click-me") {
    console.log("The Event that happened", event.type);
    console.log(event.target.innerText);
  }
}

function keyUpEventHandle(event) {
  console.log(event.key);
  if (event.key === "ArrowUp") {
    console.log("event target", event.target);
    buttonsContainer.style.backgroundColor = "red";
  }
}

function doubleClickHandle(event) {
  if (event.target.innerText === "2") {
    console.log("event target", event.target);
    buttonsContainer.style.backgroundColor = "green";
  } else if (event.target.innerText === "4") {
    console.log("event target", event.target);
    buttonsContainer.style.backgroundColor = "blue";
  }
}

document.addEventListener("click", logTheEvent);
document.addEventListener("keyup", keyUpEventHandle);
document.addEventListener("dblclick", doubleClickHandle);

const num = [0, 1, 2, 3, 4];

num.forEach((i) => {
  var button = document.createElement("button");
  button.classList.add("click-me");
  button.innerText = i;

  //   button.addEventListener("click", function () {
  //     console.log(i);
  //   });
  buttonsContainer.appendChild(button);
});
