(function (root) {
  var Game = root.Game = (root.Game || {});

  function Dir(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Dir.prototype.plus = function(otherDir) {
    return new Dir(this.x + otherDir.x, this.y + otherDir.y);
  }
  
  var Snake = Game.Snake = function(x, y) {
    this.DIRECTIONS = ["N", "E", "S", "W"];
    this.dir = "N";
    this.segments = [new Dir(x, y)];
    this.growth = 0;
  };
  
  var move = Snake.prototype.move = function() {
    var dirMap = [new Dir(0, -1), new Dir(1, 0), new Dir(0, 1), new Dir(-1, 0)];
    var firstMove = dirMap[this.DIRECTIONS.indexOf(this.dir)];
    var lastMove = this.segments[0];
    this.segments[0] = this.segments[0].plus(firstMove);
    for(var i = 1; i < this.segments.length; i++) {
      var newLastMove = this.segments[i];
      this.segments[i] = lastMove;
      lastMove = newLastMove;
    }
    
    if (this.growth > 0) {
      this.growth--;
      this.segments.push(lastMove);
    }
  };
  
  var turn = Snake.prototype.turn = function(dir) {
    this.dir = dir;
  };
  
  var eat = Snake.prototype.eat = function() {
    this.growth += 3;
  };
})(this);