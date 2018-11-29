class TestClass {

  constructor(settings) {
    let controlData = {
      classLabel: "TestClass" // Same as class, only purpose is error logs
    }

    let defaults = {  // Default defines keys and values with correct datatype
      name: "String",
      age: 1,
      alive: false,
      hobbies: ["Array of string"],
      randomNumbers: [1]
    }

    // If everything validates, create object
    if(constructCheck(controlData, defaults, settings))
      Object.assign(this, settings);
  }
}

// Using the constructor
let p = new TestClass({
  name: "John",
  age: 32,
  alive: true,
  hobbies: ["Climbing", "Fishing"],
  randomNumbers: [1, 2, 3, 4, 5]
});
