const myString = "    first word     , test,split,   , fifth(fourth)";

const arrayOfStrings = myString.split(",").map(str => str.trim()).filter(str => str != "")


console.log(arrayOfStrings);