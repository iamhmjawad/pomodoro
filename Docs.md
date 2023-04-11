In HTML, you can define custom data attributes using the "data-" prefix, like "data-mode" that you mentioned. These custom data attributes can be used to store any extra information that you want to associate with an HTML element.

When you access an element's dataset property in JavaScript, it returns an object containing all the custom data attributes of that element. Each custom data attribute is represented as a property in the dataset object with its name formatted in camelCase.

<button
            data-mode="longBreak"
            class="button mode-button"
            id="js-long-break"
          >
Long break
</button>

```javascript
const { mode } = event.target.dataset
// mode returns an object with the value of the data-mode attribute
// mode = { mode: "longBreak" }
```

setInterval() is a built-in JavaScript function that repeatedly executes a given function at a specified interval (in milliseconds).

The basic syntax for setInterval() is as follows:

```js
setInterval(functionToExecute, intervalInMilliseconds)
```

This creates an interval that calls the functionToExecute every intervalInMilliseconds. The functionToExecute can be any valid JavaScript function, including an anonymous function defined inline.

For example, consider the following code snippet:

```js
let count = 0
let timerId = setInterval(function () {
  console.log(count)
  count++
}, 1000)
```

Here, we declare a variable count and an interval ID timerId. We then call setInterval() with an anonymous function that logs the current value of count and increments it. This function will be executed every 1000 milliseconds (or 1 second), starting immediately.

The setInterval() method returns an interval ID that can be used to stop the interval using the clearInterval() method. This can be useful if you need to stop the interval before it completes all its iterations.

For example, you could use the following code to stop the interval after 10 seconds:

```js
setTimeout(function () {
  clearInterval(timerId)
}, 10000)
```

Here, we use the setTimeout() function to call an anonymous function after 10 seconds. This function in turn calls clearInterval() with the timerId to stop the interval.
