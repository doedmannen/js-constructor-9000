# js-constructor-9000
Needed a better way of constructing objects from classes in JS, so this is my solution at the moment. 


    How to use:
    class Person {

      constructor(settings) {
        let controlData = {
          classLabel: "Person" // Same as class, only purpose is error logs
        }

        let defaults = {  // Default defines keys and values with correct datatype
          name: "String",
          age: 1,
          alive: false,
          hobbies: ["Array of string"],
          randomNumbers: [1]
        }

        if(constructCheck(controlData, defaults, settings))
          Object.assign(this, settings);
      }
    }

    // Create new object from the class
    let p = new Person({
      name: "John",
      age: 32,
      alive: true,
      hobbies: ["Climbing", "Fishing"],
      randomNumbers: [1, 2, 3, 4, 5]
    });
