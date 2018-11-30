function constructCheck(controlData, defaults, settings) {
/*
  DOCUMENTATION FOR function constructCheck:
  This function provides a quality control of data provided to a class
  constructor.
  Data types are checked against a provided control object (defaults).
  The function will throw() errors if something is not provided in the
  correct ways,
  and if no errors occurred the function returns true.

  The function needs three objects:
  First object is called controlData which at the moment only should
  include
    - classLabel:`Name of the class`.
    - This is only used for throwing errors with the correct class name
  Second object is called defaults
    - This is the object which is used for checking the input to the
      constructor
    - key:value should be provided in the same way as we wish for our
      final object
  Third object is called settings
    - Settings is the object that is given to the constructor and is
      then checked against the defaults objects key:values


// TODO:
- Is null going to cause any problems?
- Arrays should have a possibility of optional type
- Empty key:values that should be provided later?

*/

  // Is this a dummy object? Used only for type testing
  // Setting the return object
  let constructionObject = {};

  // Is this a dummy object? Used only for type testing
  if( settings !== undefined            &&
      settings[`_DummyObject`] === true )
    return constructionObject;


  // Is everything provided?
  if(!controlData                       ||
     !defaults                          ||
     !settings                          ||
     typeof controlData !== `object`    ||
     typeof defaults    !== `object`    ||
     typeof settings    !== `object`     )
    throw(`Illegal use of constructCheck. Objects with controlData, defaults and settings must be provided`);

  // Is the classLabel provided with correct data type?
  if(controlData[`classLabel`]        === undefined      ||
    typeof controlData[`classLabel`]  !== `string`       ||
    controlData[`classLabel`].length  === 0               )
    throw(`controlData object is incorrect. Must contain classLabel`);

  // For throwing shit at bad constructions
  let errorFrom = `\nError from class constructor: ${controlData[`classLabel`]}`

  // Loop all keys in defaults. Check against settings. Fuck shit up.
  for(let key in defaults){

    // Does the key match the settings object?
    if(settings[key] !== undefined){

      // Change for optional later on pls :(
      // Is the keys value empty?
      if(settings[key].length === 0)
        throw(`${key} can not be empty ${errorFrom}`);

      // Check if default key value is array and if settings doesn't match that
      if(   Array.isArray(defaults[key])  &&
            !Array.isArray(settings[key]) ){
        throw(`${key} is incorrect type. Should be Array ${errorFrom}`);

      } else if(  Array.isArray(defaults[key])  &&
                  Array.isArray(settings[key])  ){

        // If it is an array check the datatypes in the array
        for(let k of settings[key]){
          if(typeof k !== typeof defaults[key][0])
            throw(`${k} in ${key} was incorrect type. Must be ${typeof defaults[key][0]} ${errorFrom}`);

          // Don't allow empty?
          if(k.length === 0)
            throw(`A value in the Array ${key} can not be empty ${errorFrom}`);
        }
      }

      // If it is not an Array
      if(!Array.isArray(defaults[key])){
        // The data type doesn't match?
        if(!Array.isArray(defaults[key])  &&
            typeof settings[key]         !==
            typeof defaults[key]           )
          throw(`${key} is incorrect type. Should be ${typeof defaults[key]} ${errorFrom}`);

        // Are we setting an object as value?
        // Is it constructed from the correct class?

        if(typeof defaults[key] === 'object'){
          if(defaults[key].constructor.name !== settings[key].constructor.name){
            settings[key] = new defaults[key].constructor(settings[key]);
          }
        }
      }
      // Did we throw null shit?
      constructionObject[key] = settings[key];
    }
  }

  // Does construction match the defaults?
  if(Object.keys(defaults).length !==   Object.keys(constructionObject).length){
    // Give error with everything
    let defaultKeyValues = ``;
    for(let key in defaults){
      defaultKeyValues += ` ${key} (${ Array.isArray(defaults[key]) ? 'Array of ' + typeof defaults[key][0] : typeof defaults[key]}) -`;
    }
    throw(`Settings object for ${controlData[`classLabel`]} constructor must provide ${defaultKeyValues} ${errorFrom}`);
  }

  // return true if we didn't break everything with throw()
  return constructionObject;
}
