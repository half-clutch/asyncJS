const getSomething = () => {
  return new Promise((resolve, reject) => {
    // inside the promise we write a function that does the network request

    resolve("some data that is fetched");
    reject("some error");
  });
};

getSomething()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// -------------------------------------------------------------------------------------------------------------------------------------

// Here we are going to use the fetch api which uses the promises concept.

fetch("todo.json")
  .then((response) => {
    console.log("Resolved", response);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("Error", err);
  });

// The fetch api returns a Promise which when resolved gives a response obect.
// This response object is not the actual data itself , so we have to use the
// response.json() to get the meaningful data that we are looking for...now this(response.json) is also a promise which when resolved gives data or else if rejected gives error.

// The fetch api throws an error(rejects) only if there is a network related problem
// so even if you give the wrong url it still tries to fetch it...only thing the fetched response will have a 404 not found error as status.

//-----------------------------------*************-------------------------------------

// Async and Await

const todo = async () => {};
// here we can see that an async function always return a Promise...even when the function does not contain anything.
console.log(todo());

const getTodos = async () => {
  // in here we to the fetching or any time consuming task
  const response = await fetch("todo.json"); // the await keyword makes the response variable get the value only after the fetch is resolved...basically stalling or blocking the code, but because this is happening in the async block its not actually blocking the main thread.
  if (response.status != 200) {
    throw new Error("cannot fetch url response");
    // when any async block(function) throws an error then the promise returnd by it is rejected and caught in the catch block.
  }
  const data = await response.json(); // same here data gets value only if the response is resolved.

  //chaining multiple operations basically.
  const response2 = await fetch("todo2.json");
  const data2 = await response2.json();

  // here the function being async always return a Promise...which only after resolving can give the data.so we have to use the then() method to access the data.

  return [data, data2];
};

console.log("1");
console.log(2);

getTodos()
  .then((data) => console.log("resolved \n", data[0], "\n", data[1]))
  .catch((err) => console.log("Error is : ", err));

console.log(3);
console.log(4); // just to check if its non blocking...and it is.

// So this is basically asynchronous javascript...
// reference : net ninja async javascript (youtube playlist).
