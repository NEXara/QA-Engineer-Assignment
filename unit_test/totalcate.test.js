const myArray = require('../store/totalcate');

var count = Object.keys(myArray).length;

test('number is correct', () => {
    expect(count).toEqual(3294);
  });
  