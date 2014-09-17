(function (root) {
  var Game = root.Game = (root.Game || {});
  
  var Board = Game.Board = function(size) {
    this.size = size;
    
    var that = this
    
    this.emptyGrid = function() {
      var grid = [];
      for(var i = 0; i < that.size; i++) {
        var row = [];
        for(var j = 0; j < that.size; j++) {
          row.push("_");
        }
        grid.push(row);
      }
      return grid;
    };
    
    this.grid = this.emptyGrid();

    this.king = new Game.Snake(Math.floor(size / 4), Math.floor(size / 4));
    this.python = new Game.Snake(3*(Math.floor(size / 4)), 3*(Math.floor(size / 4)));
    this.king.turn("E");
    this.python.turn("W");
    
    this.generateApple = function() {
      var x = Math.floor(Math.random() * (that.size - 1));
      var y = Math.floor(Math.random() * (that.size - 1));
      
      [that.king, that.python].forEach(function(snake) {
        for(var i = 0; i < snake.segments.length; i++) {
          if (snake.segments[i].x === x && snake.segments[i].y === y) {
            return that.generateApple();
          } 
        }
      });
      return {x: x, y: y};      
    };
    
    
    this.apple = this.generateApple();
  };
  
  var update = Board.prototype.update = function() {
    var that = this;
    
    [this.king, this.python].forEach(function(snake) {
      var snake_head = snake.segments[0];
      console.log(snake, snake_head);
      if(snake_head.x === that.apple.x && snake_head.y === that.apple.y) {
        snake.eat();
        that.apple = that.generateApple();
      }
    });
    
   
    
    this.king.move();
    this.python.move();
    
    var collision = false;
    
    [this.king, this.python].forEach(function(snake) {
      var segments = snake.segments;
      var snake_head = snake.segments[0];
      var x = snake_head.x;
      var y = snake_head.y;
    
      if (x > that.size - 1 || x < 0 || y > that.size - 1 || y < 0) {
        collision = true;
      }
    
      for(var i = 1; i < segments.length; i++) {
        if (segments[i].x === snake_head.x && segments[i].y === snake_head.y) {
          collision = true;
        }
      }
    });
      
    return !collision;
  }
  
  var render = Board.prototype.render = function() {
    this.grid = this.emptyGrid();
    
    [this.python, this.king].forEach(function() {
      var segments = snake.segments;
      for(var i = 0; i < segments.length; i++) {
        that.grid[segments[i].y][segments[i].x] = "S";
      }
    });
      
    var toRender = ""
    for(var x = 0; x < this.grid.length; x++) {
      var line = "";
      for(var y = 0; y < this.grid.length; y++) {
        line += this.grid[x][y];
      }
      toRender += line + "<br>"
    }
    return toRender
  };
})();