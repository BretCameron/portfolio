---
title: 13 Tips to Write Faster, Better-Optimized JavaScript
date: "2019-08-12T22:12:03.284Z"
description: "Actionable Tips and Tricks to Increase the Speed of Your Code"
link: https://medium.com/@bretcameron/how-to-publish-your-first-npm-package-b224296fc57b?source=friends_link&sk=f98952b9c7075e398e9bbca2799d303f
---

<!-- Actionable Tips and Tricks to Increase the Speed of Your Code -->

![Photo by [Cara Fuller](https://unsplash.com/@caraventurera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/cheetah?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/10574/1*PS8IX1JSAVV62RMgOHb97A.jpeg)

_Photo by_ [_Cara Fuller_](https://unsplash.com/@caraventurera?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) _on_ [_Unsplash_](https://unsplash.com/search/photos/cheetah?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

10 years ago, Amazon shared that every 100ms of latency cost them 1% in sales revenue: across an entire year, 1 second of added load time would cost the company in the region of \$1.6 billion. Similarly, Google found that an extra 500ms seconds in search page generation time reduced their traffic by 20%, slicing a fifth off their potential ad revenue.

Few of us may have to deal with such dramatic figures as Amazon and Google, but the same principles apply even on a smaller scale: faster code creates a better user experience and it’s better for business. Especially in web development, speed may be the critical factor thing that gives you an edge on your competitors. Every wasted millisecond on a faster network is amplified on a slow network.

In this article, we’ll look into 13 practical ways that you can increase the speed of your JavaScript code — whether you’re writing server-side code with Node.js or client-side JavaScript. Wherever possible, I’ve included links to benchmark tests created with [https://jsperf.com](https://jsperf.com/). If you’d like to test these tips for yourself, make sure to click on those links!

![Avoid unnecessary steps — photo by [Jake Hills](https://unsplash.com/@jakehills?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/steps?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/11792/1*zcsVWcSLy3OPvN2KHLUlIw.png)_Avoid unnecessary steps — photo by [Jake Hills](https://unsplash.com/@jakehills?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/steps?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

## Do It Less

> “The fastest code is the code that never runs.”

### 1. Remove Unnecessary Features

It’s easy to jump into optimizing code that’s already been written, but often the biggest performance gains come from taking a step back and asking whether our code needed to be there in the first place.

Before moving on to individual optimisations, ask yourself whether your program needs to do everything that it’s doing. Is that feature, component or function necessary? If not, remove it. This step is incredibly important to improving the speed of your code, but it is easily overlooked!

### 2. Avoid Unnecessary Steps

_Benchmark: [https://jsperf.com/unnecessary-steps](https://jsperf.com/unnecessary-steps)_

On a smaller scale, is every step a function takes necessary to get to the end result? For example, does your data jump through unnecessary hoops in order to get to the end result? The following example may be oversimplified, but it represents something that can be much harder to spot in a larger codebase:

    'incorrect'.split('').slice(2).join('');  // converts to an array
    'incorrect'.slice(2);                     // remains a string

Even in this simple example, [the difference in performance is dramatic](https://jsperf.com/unnecessary-steps) — running some code is _a lot_ slower than running no code! Though few people would make the mistake above, in longer and more complex code it can be easy to add in unnecessary steps to get to the desired end result. Avoid them!

![Break out of loops as early as possible — photo by [Claire Satera](https://unsplash.com/@daisybisley?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/loop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/11792/1*Xc66RSxk6pqfG0d0KJxYKw.png)_Break out of loops as early as possible — photo by [Claire Satera](https://unsplash.com/@daisybisley?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/loop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

## Do It Less Often

If you can’t remove code, ask yourself if you can do it less often. One of the reasons code is so powerful is that it can allow us to easily repeat actions, but it’s also easy to perform tasks more often than necessary. Here are some specific cases to look out for.

### 3. Break Out of Loops As Early As Possible

_Benchmark: [https://jsperf.com/break-loops/1](https://jsperf.com/break-loops/1)_

Look out for cases where it’s not necessary to complete every iteration in a loop. For example, if you’re searching for a particular value and find that value, subsequent iterations are unnecessary. You should break terminate the execution of the loop by using a break statement:

    for (let i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle) break;
    }

Or, if you need to perform actions on only certain elements in a loop, you can skip performing the actions on the other elements using the continue statement. continue terminates the execution of the statements in the current iteration and immediately moves on to the next one:

    for (let i = 0; i < haystack.length; i++) {
      if (!haystack[i] === needle) continue;
      doSomething();
    }

It’s also worth remembering that it’s possible to break out of nested loops using [labels](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label). These allow you to associate a break or continue statement with a specific loop:

    loop1: for (let i = 0; i < haystacks.length; i++) {
      loop2: for (let j = 0; j < haystacks[i].length; j++) {
        if (haystacks[i][j] === needle) {
          break loop1;
        }
      }
    }

### 4. Pre-Compute Once Wherever Possible

_Benchmark: [https://jsperf.com/pre-compute-once-only](https://jsperf.com/pre-compute-once-only)_

Take the following function, which we’d like to call multiple times in our app:

    function whichSideOfTheForce(name) {
      const light = ['Luke', 'Obi-Wan', 'Yoda'];
      const dark = ['Vader', 'Palpatine'];

      return light.includes(name) ? 'light' :
        dark.includes(name) ? 'dark' : 'unknown';
    };

    whichSideOfTheForce('Yoda');   // returns "light"
    whichSideOfTheForce('Anakin'); // returns "unknown"

The problem with this code is that every time we call whichSideOfTheForce , we create a new object. With every function call, memory is unnecessarily re-allocated to our light and dark arrays.

Given the values in light and dark are static, a better solution would be to declare these variables once and then reference them when calling whichSideOfTheForce . While we could do this by defining our variables in global scope, this would allow them to be tampered with outside of our function. A better solution is to use a closure, and that means returning a function:

    function whichSideOfTheForce2(name) {
      const light = ['Luke', 'Obi-Wan', 'Yoda'];
      const dark = ['Vader', 'Palpatine'];
      return name => light.includes(name) ? 'light' :
        dark.includes(name) ? 'dark' : 'unknown';
    };

Now, the light and dark arrays will only be instantiated once. The same goes for nested functions. Take the following example:

    function doSomething(arg1, arg2) {
      function doSomethingElse(arg) {
        return process(arg);
      };

      return doSomethingElse(arg1) + doSomethingElse(arg2);
    }

Every time we run doSomething , the nested function doSomethingElse is created from scratch. Again, closures provide a solution. If we return a function, doSomethingElse remains private but it will only be created once:

    function doSomething(arg1, arg2) {
      function doSomethingElse(arg) {
        return process(arg);
      };

      return (arg1, arg2) => doSomethingElse(arg1) + doSomethingElse(arg2);
    }

### 5. Order Code to Minimise the Number of Operations

_Benchmark: [https://jsperf.com/choosing-the-best-order/1](https://jsperf.com/choosing-the-best-order/1)_

Often, improvements to code speed can be improved if we think carefully about the order of actions in a function. Let’s imagine we’ve got an array of item prices, stored in cents, and we need a function to sum the items and return the result in dollars:

    const cents = [2305, 4150, 5725, 2544, 1900];

The function has to do two things — convert cents to dollars and sum the elements — but the order of those actions is important. To convert to dollars first, we could use a function like this:

    function sumCents(array) {
      return '$' + array.map(el => el / 100).reduce((x, y) => x + y);
    }

But, in this method, we perform a division operation on every item in our array. By putting our actions in the opposite order, we only have to perform a division once:

    function sumCents(array) {
      return '$' + array.reduce((x, y) => x + y) / 100;
    }

The key is to make sure that actions are being taken in the best possible order.

### 6. Learn Big O Notation

Learning about Big O Notation can be one of the best ways to understand why some functions run faster and take up less memory than others — especially at scale. For example, Big O Notation can be used to show, at a glance, why Binary Search is one of the most efficient search algorithms, and why Quicksort tends to be the most performant method for sorting through data.

In essence, Big O Notation provides a way of better understanding and applying several of the speed optimisations discussed in this article so far. It’s a deep topic, so if you’re interested in finding out more, I recommend my [article on Big-O Notation](https://medium.com/@bretcameron/ace-your-coding-interview-by-understanding-big-o-notation-and-write-faster-code-6b60bd498040) or my article where I discuss [four different solutions to a Google Interview Question](https://medium.com/@bretcameron/4-ways-to-solve-a-google-interview-question-in-javascript-12e6eec87576) in the context of their time and space complexity.

![Do it faster — photo by [chuttersnap](https://unsplash.com/@chuttersnap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/formula-1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/11792/1*fn_mcH764gZ5tXP1fKyZGg.png)_Do it faster — photo by [chuttersnap](https://unsplash.com/@chuttersnap?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/formula-1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

## Do It Faster

The biggest gains in code speed tend to come from the first two categories of optimisation: ‘Do It Less’ and ‘Do It Less Often’. In this section, we’ll look at a few ways to make your code faster that are more concerned with optimising the code you’ve got, rather than reducing it or making it run fewer times.

In reality, of course, even these optimisations involve reducing the size of your code — or making it more compiler-friendly, which reduces the size of the compiler code. But on the surface, you’re changing your code rather than removing it, and that’s why the following are logged under ‘Do It Faster’!

### 7. Prefer Built-In Methods

_Benchmark: [https://jsperf.com/prefer-built-in-methods/1](https://jsperf.com/prefer-built-in-methods/1)_

For those with experience of compilers and lower-level languages, this point may seem obvious. But as a general rule of them, if JavaScript has a built-in method, use it.

The compiler code is designed with performance optimisations specific to the method or object type. Plus, the underlying language is C++. Unless your use-case is extremely specific, the chance of your own JavaScript implementation outperforming existing methods is very low!

To test this, let’s create our own JavaScript implementation of the Array.prototype.map method:

    function map(arr, func) {
      const mapArr = [];
      for(let i = 0; i < arr.length; i++) {
        const result = func(arr[i], i, arr);
        mapArr.push(result);
      }
      return mapArr;
    }

Now, let’s create an array of 100 random integers between 1 and 100:

    const arr = [...Array(100)].map(e=>~~(Math.random()*100));

Even if we want to perform a simple operation, like multiplying each integer in the array by 2, we will see performance differences:

    map(arr, el => el * 2);  // Our JavaScript implementation
    arr.map(el => el * 2);   // The built-in map method

In my tests, using our new JavaScript map function was roughly 65% slower than using Array.prototype.map . To view the source code of V8’s implementation of Array.prototype.map , [click here](https://github.com/v8/v8/blob/master/src/builtins/array-map.tq). And to run these tests for yourself, [check out the benchmark](https://jsperf.com/prefer-built-in-methods/1).

### 8. Use the Best Object for the Job

_Benchmark 1: [Adding values to a Set vs pushing to an array](https://jsperf.com/adding-to-a-set-vs-pushing-to-an-array)
Benchmark 2: [Adding entries to a Map vs adding entries to a regular object](https://jsperf.com/adding-map-vs-adding-object)_

Similarly, the best possible performance also comes from choosing the most appropriate built-in object for the job at hand. JavaScript’s built-in objects go well-beyond the fundamental types: Numbers , Strings , Functions , Objects and so on. Used in the right context, many of these less common objects can offer significant performance advantages.

In other articles, I have written about how [using Sets can be faster than using Arrays](https://medium.com/@bretcameron/how-to-make-your-code-faster-using-javascript-sets-b432457a4a77), and [using Maps can be faster than using regular Objects](https://medium.com/@bretcameron/how-javascript-maps-can-make-your-code-faster-90f56bf61d9d?source=---------5------------------). Sets and Maps are keyed collections, and they can provide significant performance benefits in contexts where you are regularly adding and removing entries.

Get to know the built-in object types and try always to use the best object for your needs, as this can often lead to faster code.

### 9. Don’t Forget About Memory

As a high-level language, JavaScript takes care of a lot of lower-level details for you. One such detail is memory management. JavaScript uses a system known as garbage collection to free up memory that — as far as it is possible to tell without the explicit instructions from a developer — is no longer needed.

Though memory management is automatic in JavaScript, that doesn’t mean that it’s perfect. There are additional steps you can take to manage memory and reduce the chance of memory leaks.

For example, Sets and Maps also have ‘weak’ variants, known as WeakSets and WeakMaps . These hold ‘weak’ references to objects. These are not enumerable, but they prevent memory leaks by making sure unreferenced values get [garbage collected](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Garbage_collection).

You can also have greater control over memory allocation by using JavaScript’s TypedArray objects, introduced in ES2017. For example, an Int8Array can take values between -128 and 127 , and has a size of just one byte. It’s worth noting, however, that the performance gains of using TypedArrays may be very small: comparing a regular array and a Uint32Array shows [a minor improvement in write performance](https://jsperf.com/uint32array-write-performance) but [little or no improvement in read performance](https://jsperf.com/uint32array-read-performance) (credits to [Chris Khoo](http://Chris Khoo) for these two tests).

Acquiring a basic understanding of a lower-level programming language can help you write better and faster JavaScript code. I write about this more in my article, [What JavaScript Developers Can Learn from C++](https://medium.com/@bretcameron/what-javascript-developers-can-learn-from-c-3cdb93ab8658).

### 10. Use Monomorphic Forms Where Possible

_Benchmark 1: [Monomorphic vs polymorphic](https://jsperf.com/monomorphic-forms)
Benchmark 2: [One function argument vs two](https://jsperf.com/impact-of-function-arguments)_

If we set const a = 2 , then the variable a can be considered polymorphic (it can be changed). By contrast, if we were to use 2 directly, that can be considered monomorphic (its value is fixed).

Of course, setting variables is extremely useful if we need to use them multiple times. But if you only use a variable once, it’s slightly faster to avoid setting a variable at all. Take a simple multiplication function:

    function multiply(x, y) {
      return x * y;
    };

If we run multiply(2, 3) it’s about 1% faster than running:

    let x = 2, y = 3;
    multiply(x, y);

That’s a pretty small win. But across a large codebase, many small wins like this can add up.

Similarly, using arguments in functions provides flexibility at the expense of performance. Again, arguments are an integral part of programming. But if you don’t need them, you’ll gain a performance advantage by not using them. So, an even faster version of our multiply function would look like this:

    function multiplyBy3(x) {
      return x * 3;
    }

As above, the performance improvement is small (in my tests, roughly 2%). But if this kind of improvement could be made many times across a large codebase, it’s worth considering. As a rule, only introduce arguments when a value has to be dynamic and only introduce variables when they’re going to be used more than once.

### 11. Avoid the ‘Delete’ Keyword

_Benchmark 1: [Removing keys from an object vs setting them as undefined](https://jsperf.com/removing-variables-from-an-object/1)
Benchmark 2: [The delete statement vs Map.prototype.delete](https://jsperf.com/delete-vs-map-prototype-delete)_

The delete keyword is used to remove an entry from an object. You may feel that it is necessary for your application, but if you can avoid using it, do. Behind the scenes, delete removes the benefits of the hidden class pattern in the V8 Javascript engine, making it a generic slow object, which — you guessed it — performs slower!

Depending on your needs, it may be sufficient simply to set the unwanted property as undefined:

    const obj = { a: 1, b: 2, c: 3 };
    obj.a = undefined;

I have seen suggestions on the web that it might be faster to create a copy of the original object without the specific property, using functions like the following:

    const obj = { a: 1, b: 2, c: 3 };
    const omit = (prop, { [prop]: _, ...rest }) => rest;
    const newObj = omit('a', obj);

However, in my tests, the function above (and several others) proved even slower than the delete keyword. Plus, functions like this are less readable than delete obj.a or obj.a = undefined .

As an alternative, consider whether you could use a Map instead of an object, as [Map.prototype.delete is much faster than the delete statement](https://jsperf.com/delete-vs-map-prototype-delete).

![Do it later — photo by [Alexander Schimmeck](https://unsplash.com/@alschim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/delay?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/11792/1*NOHuUW6UpNCNJ1Xx_N83Mg.png)_Do it later — photo by [Alexander Schimmeck](https://unsplash.com/@alschim?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/delay?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

## Do It Later

If you can’t do it less, do it less often or do it faster, then there’s a fourth category of optimisation you can use make your code _feel_ faster — even if takes exactly the same amount of time to run. This involves restructuring your code in such a way that less integral or more demanding tasks don’t block the most important stuff.

### 12. Use Asynchronous Code to Prevent Thread Blocking

By default, JavaScript is single-threaded and runs its code synchronously, one-step-at-a-time. (Under the hood, browser code may be running multiple threads to capture events and trigger handlers, but — as far as _writing_ JavaScript code is concerned — it’s single-threaded).

This works well for most JavaScript code, but if we have events likely to take a long time, we don’t want to block or delay the execution of more important code.

The solution is to use asynchronous code. This is mandatory for certain built-in methods like fetch() or XMLHttpRequest() , but it’s also worth noting that any synchronous function can be made asynchronous: if you have a time-consuming (synchronous) operation, such as performing operations on every item in a large array, this code can be made asynchronous so that it doesn’t block the execution of other code. If you’re new to asynchronous JavaScript, check out my article, [A Guide to JavaScript Promises](https://medium.com/@bretcameron/a-guide-to-javascript-promises-da50eff327d7).

In addition, many modules like Node.js’s filesystem have asynchronous and synchronous variants of some of their functions, such as fs.writeFile() and fs.writeFileSync() . In normal circumstances, stick to the default asynchronous method.

### 13. Use Code Splitting

If you’re using JavaScript on the client-side, your priorities should be making sure that the visuals appear as quickly as possible. A key benchmark is ‘first contentful paint’, which measures the time from navigation to the time when the browser renders the first bit of content from the DOM.

One of the best ways to improve this is through JavaScript code-splitting. Instead of serving your JavaScript code in one large bundle, consider splitting it into smaller chunks, so that the minimum necessary JavaScript code is required upfront. How you go about code splitting will vary depending on whether you’re using [React](https://reactjs.org/docs/code-splitting.html), [Angular](https://angular.io/guide/lazy-loading-ngmodules), [Vue](https://vuejsdevelopers.com/2017/07/03/vue-js-code-splitting-webpack/) or vanilla Javascript.

A related tactic is tree-shaking, which is a form of dead code elimination specifically focused on removing unused or unnecessary dependencies from your codebase. To find out more about this, I recommend [this article from Google](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/). (And remember to minify your code for production!)

![Make sure to test your code — photo by [Louis Reed](https://unsplash.com/@_louisreed?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/test?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](https://cdn-images-1.medium.com/max/11792/1*_-kw_FGzyTVBwsdQ7U6SWQ.png)_Make sure to test your code — photo by [Louis Reed](https://unsplash.com/@_louisreed?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/test?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

## Conclusion

The best way to ensure you’re actually making useful optimisation to your code is to test them. Throughout this article, I’ve provided code benchmarks using [https://jsperf.com/](https://jsperf.com/), but you could also check smaller sections of code using:

- [http://jsben.ch/](http://jsben.ch/)

- [https://jsbench.me/](https://jsbench.me/)

- Your own console, using console.time() and console.timeEnd() .

As for checking the performance of entire web applications, a great starting point is the network and performance section of [Chrome’s Dev Tools](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/). I also recommend Google’s [Lighthouse extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en).

Finally, though important, speed isn’t the be-all and end-all of good code. Readability and maintainability are extremely important too, and there’s rarely a good reason to make minor speed improvements if that leads to more time spent finding and fixing bugs.

If you’re a newer developer, I hope this opened your eyes to some of the performance-boosting techniques at your disposal. And if you’re more experienced, I hope this article was a useful refresher.

Got any performance tips that I’ve missed? Let me know in the comments!
