/*	
		Write a function, deepEqual, that takes two values and returns true 
		only if they are the same value or are objects with the same properties 
		whose values are also equal when compared with a recursive call to 
		deepEqual.

		To find out whether to compare two things by identity (use the === operator for that) 
		or by looking at their properties, you can use the typeof operator. 
		If it produces "object" for both values, you should do a deep comparison. 
		But you have to take one silly exception into account: 
		by a historical accident, typeof null also produces "object".
*/

// Your code here.

function deepEqual (obj1, obj2) {
	//console.log ("**** starting deepEqual ***");

	// First...check if they have the same # of paramaters in each object
	if (!equalNumParameters(obj1, obj2)) {
		//console.log("False: These objects don't even have the same number of parameters!");
		return false;
	} else {
		//console.log ("passed the equal number parameters check...");
	}
	
	// Given they have the same # of parameters, check each parameter for equal value
	// call check parameter function
	var finalAnswer = false;		
	for (var p in obj1) {
		//console.log("obj1 p = ",p);
		
		// check if this parameter exists in obj2
		if (!(p in obj2)) {
			//console.log ("False: object2 does not have the same paramaters as object1!");
			return false;
		} else {
			//console.log (p, "is found in obj2");
		}

		//console.log("obj1.p = ", obj1[p]);
		//console.log("obj2.p = ", obj2[p]);
				
		// if this paramater is itself an object, call a recursive object checker...
		//console.log("typeof obj1[p] = ",typeof(obj1[p]));
		if (typeof(obj1[p]) == "object") {
			//console.log("+++ calling the recursive object checker");
			var recursiveAnswer = deepEqual(obj1[p], obj2[p]);
			//console.log("+++ finished recursiveAnswer = ", recursiveAnswer);
			if (!recursiveAnswer) {
				//console.log ("the recursive object check failed");
				return false;
			} 
		} else {
				// this parameter is not an object type so compare values directly
				if (obj1[p] === obj2[p]) {	
					finalAnswer = true;
				} else {
					//console.log ("obj1.p is not equal to obj2.p");
					return false;
				}
		}
	}
	return finalAnswer;
}

function equalNumParameters(obj1, obj2) {
	// # of paramaters in obj1
	var obj1ParamNum = 0;
	for (var p in obj1) {
		obj1ParamNum++;
	}
	var obj2ParamNum = 0;
	for (var p in obj2) {
		obj2ParamNum++;
	}
	//console.log("Obj1 param # = ", obj1ParamNum);
	//console.log("Obj2 param # = ", obj2ParamNum);
	return (obj1ParamNum == obj2ParamNum);
}

var obj = {here: {is: "an"}, object: 2};
console.log("test 1:", deepEqual(obj, obj));
// → true
console.log("test 2:", deepEqual(obj, {here: 1, object: 2}));
// → false
console.log("test 3:", deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

var objtest = {color: "yellow"};
console.log("test 4:", deepEqual(obj, objtest));
// false

var objtest2 = {color: "red"};
console.log("test 5:", deepEqual(objtest, objtest2));
// false

var objtest3 = {shape: "square", color: {red: 100, green: 50, blue: 10}};
var objtest4 = {shape: "square", color: {red: 100, green: 50, blue: 10}};
console.log("test 6:", deepEqual(objtest3, objtest4));
// true

var objtest5 = {shape: "square", color: {red: 90, green: 50, blue: 10}};
console.log("test 7:", deepEqual(objtest4, objtest5));
// false

