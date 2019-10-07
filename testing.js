// const obj = {a: 1, b: 2, c: 3};
// console.log('obj', obj);

// let a = obj.a;
// console.log('a', a);

// a += 2;

// console.log('obj', obj);
// console.log('a', a);

// let obj2 = obj;
// console.log('obj2', obj2);

// obj2.b = 4;
// console.log('obj2', obj2);
// console.log('obj', obj);

// ----------- //

// const objArray = [{a : 1}, {b : 2}, {c : 3}];

// let objArray2 = [];
// objArray.forEach(obj => {
//   objArray2.push(obj);
// })

// objArray2[0].a++;

// console.log('objArray', objArray);
// console.log('objArray2', objArray2);

// ----------- //

// import update from 'immutability-helper';

// const objArray = [{a : 1}, {b : 2}, {c : 3}];

// const objArray2 = update(objArray, {0: {$set: {a : 2}}})

// console.log('objArray', objArray);
// console.log('objArray2', objArray2);