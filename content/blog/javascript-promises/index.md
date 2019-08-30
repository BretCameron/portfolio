---
title: A Guide to JavaScript Promises
date: "2019-08-07T22:12:03.284Z"
description: "A whistle-stop tour of all things asynchronous in JavaScript: from callback hell to async/await"
---

![Image Credit: [Marcos Mayer / Unsplash](https://unsplash.com/photos/8_NI1WTqCGY)](https://cdn-images-1.medium.com/max/10368/1*e-1gfnNch17BxEOcwQuaKQ.jpeg)

_Image Credit:_ [_Marcos Mayer / Unsplash_](https://unsplash.com/photos/8_NI1WTqCGY)

The more I’ve learned about web development, the more I’ve begun to appreciate the importance of asynchronous code. Once you move beyond static websites, asynchronous code becomes integral. Every full-stack application depends on sending, receiving and processing data via an API.

But writing asynchronous code can feel very different to writing regular, synchronous JavaScript. Synchronous code allows you to get away with more. For example, the order of operation in synchronous code is more forgiving. Messily structured code can still execute successfully — even if it makes your co-workers unhappy!

By contrast, the structure and order of asynchronous code must be far more rigid and in this article, we’ll see how. We’ll look at the three main systems for writing asynchronous code, and I’ll also share some ways of making synchronous functions asynchronous.

## Callback Functions, Try and Catch

In the early days of JavaScript, doing multiple asynchronous operations in a row would result in so-called pyramids of doom, like the one below.

    func1(function(result) {
      func2(result, function(newResult) {
        func3(newResult, function(finalResult) {
          func4(newResult, function(finalResult) {
            console.log(finalResult);
          }, failureCallback);
        }, failureCallback);
      }, failureCallback);
    }, failureCallback);

This situation was also known as callback hell. As the number of asynchronous operations increased, it quickly becomes very difficult to keep track of what’s going on.

For more straightforward cases, specifying a failure callback could also be handled using try and catch statements, which have been around since the early days of JavaScript.

    try {
      asyncFunction();
    }
    catch (err) {
      console.error(err);
    }

But again, the need for multiple asynchronous actions can quickly lead to even worse confusion!

    try {
      func1();
      try {
        func2();
        try {
          func3();
        } catch {
          failureFunc1();
        }
      } catch {
        failureFunc2();
      }
    } catch {
      failureFunc3();
    }

## Promises, Then and Catch

A major shift came in ES6, with the introduction of a new object: Promises. The Promise object represents the completion or failure of an asynchronous operation and the resulting value of that operation.

A Promise can be created using the new Promise() constructor. This takes a function with two arguments — resolve and reject — as in the example below:

    const foo = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('bar');
      }, 3000);
    });

If we try to call console.log(foo) before the Promise has been resolved or rejected, we’ll simply see Promise {<pending>} .

But once the action is completed, calling console.log(foo) will return a Promise object containing a value: in this case, Promise {<resolved>}: "bar" .

### Then and Catch

To perform subsequent operations on the resolved or rejected Promise, ES6 also introduced two new methods: then and catch . This can be chained onto our original promise. For example, to access the result of the Promise foo above, we could use:

    foo
      .then(result => console.log(result)
      .catch(err => console.error(err);

then triggers if the Promise is resolved, catch if the Promise is rejected. These methods can be chained as many times as necessary. For example, a common pattern when using fetch to request JSON data looks like this:

    fetch(myRequest)
      .then(response => response.json())
      .then(data => {
        processData(data);
      });

Inside the first then method, we use json() to read and parse the data and return it. In the next then method, we can process the parsed JSON data.

## Async and Await

Asynchronous code got even more convenient in ES8, with the introduction of two new keywords: async and await .

This system didn’t introduce any new functionality. Rather, it provides a layer of abstraction (or ‘syntactic sugar’), allowing asynchronous code to be written in a very similar way to synchronous code.

    const foo = async () => {
      const result = await new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('bar');
      }, 3000)
      });
      console.log(result);
    };

You can define an asynchronous function using async function() {} or — as in the example above — with const myFunctionName = async () => {} .

Inside the async function, you can use the await keyword to pause the execution of the function until the Promise has been resolved.

Here’s another example, where we’ll use fetch to make a GET request to retrieve user data using Github’s API. No explicit use of the Promise object is necessary, as this is implied in the fetch method:

    const getUserData = async (user) => {
      let response = await fetch(`https://api.github.com/users/${name}`);
      let data = await response.json();
      return data;
    }

The only problem with async/await syntax is that, because of its similarity to synchronous code, it can be easy to slip into the synchronous mindset. Especially when I was new to async/await, I made mistakes by forgetting that I was dealing with Promises!

## Turning Synchronous Functions Asynchronous

Let’s take a synchronous function, which returns the sum of every value in an array.

    function sum(arr) {
      return arr.reduce((x, y) => x + y);
    };

If our array is particularly large, we may not want this function to block other JavaScript code from executing. To allow other code to continue, we need to make our function asynchronous. And to do _that_, we need it to return a Promise. Since ES8, the simplest way to do this is by adding the async keyword:

    async function sum(arr) {
      return arr.reduce((x, y) => x + y);
    };

But what’s if we want more control over the execution of our Promise? Implicitly, the async keyword makes whatever our function returns into a Promise object, so the following function has more-or-less identical behaviour to the one above:

    const asyncSum = (arr) => {
      return new Promise((resolve, reject) => {
        resolve(arr.reduce((x, y) => x + y))
      });
    };

We can then call this function, and use the methods or keywords described above to define further actions, depending on whether our Promise is returned successfully or not. Often, if we’re using a library like React, we might want to update state when our result is returned:

    asyncSum(veryLargeArray)
      .then(result => {
        *this*.setState({ sum: result });
      });
      .catch(err => console.log(err));

Or, for the same result using async and await :

    (async () => {
      const result = await asyncSum(veryLargeArray);
      *this*.setState({ sum: result });
    })()

## **Bonus: Asynchronous Redux**

Finally, given the popularity of Redux, I thought I’d mention how to turn Redux actions — which are synchronous, by default — into asynchronous ones.

Once you have redux and react-redux installed, you’ll also need to install middleware to allow your action creators to return a function instead of an action. The most popular choice is redux-thunk .

To incorporate Redux Thunk in your Redux store, you can use the following boilerplate code:

<iframe src="https://medium.com/media/d144e9321b2a53c5f75c1212cdfbdfc8" frameborder=0></iframe>

Then, you can return functions as well as actions. Here’s an example function, which makes a POST request to create an item:

<iframe src="https://medium.com/media/ff28421840c14e18a47ca5405bf53df3" frameborder=0></iframe>

Thanks to Redux Thunk, this action is now ‘thenable’, meaning we can perform further actions once — and only once — the result is returned successfully. It’s rare for me to use Redux without implementing Redux Thunk!

I hope you found this article useful, whether you’re new to Promises or you fancied a refresher. If you have any questions, feel free to leave a comment!
