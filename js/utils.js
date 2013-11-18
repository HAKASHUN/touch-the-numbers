/**
 * ユーティリティー関数
 * @constructor
 */
var Utils = function(){};
/**
 * 配列をシャッフルする
 * @param {Array} arr
 * @returns {Array}
 */
Utils.shuffleArray = function(arr) {
  for(var i = arr.length - 1; i >= 0; i--) {
    var random = Math.floor(i * Math.random());
    var tmp = arr[i];
    arr[i] = arr[random];
    arr[random] = tmp;
  }
  return arr;
};

/**
 * 数字を格納する配列を作る
 * @param {Number} max
 * @returns {Array}
 */
Utils.createNumberArray = function(max) {
  var arr = [];
  for(var i = 1; i < (max + 1); i++){
    arr.push(i);
  }
  return arr;
};
