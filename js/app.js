document.addEventListener('DOMContentLoaded', function() {
  var app = new App();
});

/**
 * ゲームのクラス
 * @constructor
 */
var App = function() {
  this.timer = null; //動作中のタイマーID
  this.currentTime = 0; //現在の経過秒数
  this.nextNumber = 1; //次に押す番号を持つ
  this.challengeNumber = 1; //チャレンジの回数
  this.init();
};

/**
 * 設定
 * @type {Object}
 */
App.prototype.config = {
  rows: 5, //列数
  cols: 5  //行数
};

/**
 * ゲームの初期化
 */
App.prototype.init = function() {
  var rows = this.config.rows;
  var cols = this.config.cols;
  this._createField(rows, cols);
};

/**
 * フィールドを作成
 * @param {Number} rows 列数
 * @param {Number} cols 行数
 * @private
 */
App.prototype._createField = function(rows, cols) {
  var self = this;
  var maxNumber = rows * cols;
  //1 ~ maxNumberまでの数字が入った配列を作成(ex. [1, 2, 3 ... maxNumber])
  var numbers = Utils.createNumberArray(maxNumber);
  //配列の中身をランダムにシャッフルする
  var shuffledNumbers = Utils.shuffleArray(numbers);

  var tableElement = document.querySelector('#game');
  for(var i = 0; i < cols; i++) {
    var trElement = document.createElement('tr');
    for(var j = 0; j < rows; j++) {
      var tdElement = document.createElement('td');
      tdElement.textContent = shuffledNumbers.shift();
      trElement.appendChild(tdElement);
      tdElement.addEventListener('click', function(e){
        var target = e.currentTarget;
        self.clicked(target);
      });
    }
    tableElement.appendChild(trElement);
  }

};

/**
 * ゲームの開始
 */
App.prototype.start = function() {
  var self = this;
  this.timer = setInterval(function(){
    self._timecount();
  }, 100);
};

/**
 * ゲームの終了
 */
App.prototype.end = function() {
  clearInterval(this.timer);

  //結果をresultに入れる。
  var resultElement = document.querySelector('#result');
  var currentResultElement = document.createElement('li');
  var time = document.querySelector('#time').textContent;
  currentResultElement.textContent = this.challengeNumber + '回目::' + time + '秒';
  resultElement.appendChild(currentResultElement);

  this.reset();

};

/**
 * ゲームのリセット
 */
App.prototype.reset = function() {
  this.challengeNumber++;
  this.currentTime = 0;
  this.nextNumber = 1;

  var tableElement = document.querySelector('#game');
  tableElement.innerHTML = '';
  this._createField(this.config.rows, this.config.cols);
  this._setCurrentTime(this.currentTime);
};

/**
 * 番号がクリックされた時の処理
 * @param {Element} target
 */
App.prototype.clicked = function(target) {
  var targetNumber = Utils.toNumber(target.textContent);
  var rows = this.config.rows;
  var cols = this.config.cols;

  if(targetNumber === this.nextNumber) {
    if(targetNumber === 1) {
      //ゲームスタート
      this.start();
    }
    target.className = 'selected';
    this.nextNumber++;
  }

  if(targetNumber === rows * cols) {
    //ゲーム終了
    this.end();
  }
};

/**
 * タイムをカウントする
 */
App.prototype._timecount = function() {
  //参考: http://ginpen.com/2011/12/13/decimal
  var time = (this.currentTime * 10) + 1.0;
  this.currentTime = time / 10;
  this._setCurrentTime(this.currentTime);
};

/**
 * 経過時間をセットする
 * @param {Number} time
 * @private
 */
App.prototype._setCurrentTime = function(time) {
  var timeElement = document.querySelector('#time');

  //必ず小数点1位まで表示する
  timeElement.textContent = time.toFixed(1);
};

