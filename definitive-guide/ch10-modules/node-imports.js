// node to load std modules
const fs = require("fs");
const http = require("http");

// if  you want to use the express module
const express = require("express");

// node 使用自己定义的模块 
// 注意， 需要使用.js 文件结尾
const stats = require("./stats.js");
const BitSet = require("./utils/bitset.js").BitSet;

let data = [1, 2, 3, 4, 5];
let average = stats.mean(data);

// 可以只导入部分需要的symbol
const { stddev } = require("./stats.js");
let sd = stddev(data);
