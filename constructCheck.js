function constructCheck(controlData, defaults, settings) {

/*
  DOCUMENTATION FOR function constructCheck:
  This function provides a quality control of data provided to a class constructor.
  Data types are checked against a provided control object (defaults).
  The function will throw() errors if something is not provided in the correct ways,
  and if no errors occurred the function returns true.

  The function needs three objects:
  First object is called controlData which at the moment only should include
    - classLabel:`Name of the class`.
    - This is only used for throwing errors with the correct class name
  Second object is called defaults which at the moment only should include
    - This is the object which we use for checking the input to the constructor
    - key:value should be provided in the same way as we wish for our final object
    - See "How to use" further down
  Third object is called settings
    - Settings is the object that is given to the constructor and is then
      checked against the defaults objects key:values


// TODO:
- Null is an object, need to check that
- Some things should be optional
- Should some datatypes be optional?

*/

  // Is everything provided?
  if(!controlData || !defaults || !settings || typeof controlData !== `object` || typeof defaults !== `object` || typeof settings !== `object`)
    throw(`Illegal use of constructCheck. Objects with controlData, defaults and settings must be provided`);

  // Is the classLabel provided the correct data type?
  if(typeof controlData[`classLabel`] !== `string` || controlData[`classLabel`].length === 0)
    throw(`controlData object is incorrect. Must contain classLabel`);

  let errorFrom = `\nError from class constructor: ${controlData[`classLabel`]}`

  // Get number of keys in defaults
  let numOfDefaults = Object.keys(defaults).length;

  // Loop all keys in the settings object
  for(let setting in settings){

    // Does the key not match the defaults object?
    if(defaults[setting] === undefined){
      delete settings[setting]; // Delete unwanted key
    } else {
      // Is the keys value empty?
      if(settings[setting].length === 0)
        throw(`${setting} can not be empty ${errorFrom}`);

      // Check if default key value is array and if settings doesn't match that
      if(Array.isArray(defaults[setting]) && !Array.isArray(settings[setting])){
        throw(`${setting} is incorrect type. Should be Array ${errorFrom}`);
      } else if(Array.isArray(defaults[setting]) && Array.isArray(settings[setting])){
        // If it is an array check the datatypes in the array
        for(let s of settings[setting]){
          if(typeof s !== typeof defaults[setting][0])
            throw(`${s} in ${setting} was incorrect type. Must be ${typeof defaults[setting][0]} ${errorFrom}`);

          // Don't allow empty
          if(s.length === 0)
            throw(`A value in the Array ${setting} can not be empty ${errorFrom}`);
        }
      }
      // If it is not an Array but the data type doesn't match
      if(!Array.isArray(defaults[setting]) && typeof settings[setting] !== typeof defaults[setting])
        throw(`${setting} is incorrect type. Should be ${typeof defaults[setting]} ${errorFrom}`);

      // No errors? Check one key off the list
      numOfDefaults--;
    }
  }

  // If there was any missing
  if(numOfDefaults !== 0){
    let defaultKeyValues = ``;
    for(let key in defaults){
      defaultKeyValues += ` ${key} (${ Array.isArray(defaults[key]) ? 'Array of ' + typeof defaults[key][0] : typeof defaults[key]}) -`;
    }
    throw(`Settings object for ${controlData[`classLabel`]} constructor must provide ${defaultKeyValues} ${errorFrom}`);
  }

  // return true if we didn't break everything with throw()
  return true;

}
