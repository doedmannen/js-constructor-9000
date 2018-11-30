class TestClass {
  constructor(settings) {
    let controlData = {
      classLabel: "TestClass"
    }

    let defaults = {
      aNumber: 0,
      numberArray: [0]
    }

    Object.assign(this, constructCheck(controlData, defaults, settings));
  }
}

class SuperTestClass {
  constructor(settings) {
    let controlData = {
      classLabel: "SuperTestClass"
    }

    let defaults = {
      aString: "String",
      stringArray: ["String"],
      aTestObject: new TestClass({_DummyObject: true})
    }

    Object.assign(this, constructCheck(controlData, defaults, settings));
  }
}

class ChildTestClass extends SuperTestClass{

  constructor(settings) {

    super(settings);

    let controlData = {
      classLabel: "ChildTestClass"
    }

    let defaults = {
      aBoolean: true,
    }

    Object.assign(this, constructCheck(controlData, defaults, settings));
  }
}

let testing = new ChildTestClass({
  aString: "Hello",
  stringArray: ["Hello", "world"],
  aTestObject: {
    aNumber: 22,
    numberArray: [1,2,3,4,5,6,7,8,9,0]
  },
  aBoolean: false
});

console.log(testing);
