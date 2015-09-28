
var r01 = /abc/;

var r03 = /^abc/;
//carat means no extraneous junk at the beginning

var r04 = /abc$/
//dollar sign means no extraneous junk at the end

var r05 = /ab[def]c/;
//a followed by b followed by d e or f folloed by c

var r06 = /ab{0, 5}c/;
//a followed by 0 to 5 b's followed by at least one c

var r07 = /b+/g
//g equals an array with each match from the read text

//shorthand for any number \d

var r08 = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;
var r08 = /(\d{1,3}\.){3}\d{1,3}/g;

var ts_pattern = /\[.*\]/g;
console.log( "[ajsdnfgakjlnewrkgnakrg]awenfjgansklgm".search(ts_pattern));

var str = "loopy";
console.log( str.charAt(3));
