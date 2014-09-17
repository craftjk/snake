(function (root) {
  var Game = root.Game = (root.Game || {});
  
  var View = Game.View = function(display) {
    this.$el = display
  };
  
  var handleKeyEvent = View.prototype.handleKeyEvent = function(event) {
    var code = event.keyCode;
    console.log(code)
    
    switch(code) {
    
    case 38:
      this.board.king.turn("N");
      break;
    case 40:
      this.board.king.turn("S");
      break;
    case 37:
      this.board.king.turn("W");
      break;
    case 39:
      this.board.king.turn("E");
      break;
    case 87:
      this.board.python.turn("N");
      break;
    case 83:
      this.board.python.turn("S");
      break;
    case 65:
      this.board.python.turn("W");
      break;
    case 68:
      this.board.python.turn("E");
      break;
    }
    
  };
  
  View.prototype.start = function () {
    this.board = new Game.Board(15);
    
    var that = this;
    
    $("body").keydown(function(event) {
      that.handleKeyEvent(event);
    })
    
    var that = this;
    var timerId = setInterval(function() {
      if (that.board.update()) {
        that.render();
      } else {
        clearInterval(timerId);
        alert("You lost!");
      }
      // that.$el.empty();
      // that.$el.append(that.board.render());
    }, 150)
  };
  
  var emptyDivs = View.prototype.emptyDivs = function() {
    var rows = this.$el.children();
    for(var i = 0; i < rows.length; i++) {
      var tiles = $(rows[i]).children();
      for(var j = 0; j < tiles.length; j++) {
        $(tiles[j]).attr("id", "blank");
      }
    }
  }
  
  var render = View.prototype.render = function () {
    this.emptyDivs();
    
    var segments = this.board.king.segments;
    for(var i = 0; i < segments.length; i++) {
      var row = this.$el.find("[data-id=\"" + segments[i].y + "\"]");
      var tile = row.find("[data-id=\"" + segments[i].x + "\"]");
      if (i === 0) {
        tile.attr("id", "king");
      } else {
        tile.attr("id", "king-segment");
      }
    }
    
    var segments = this.board.python.segments;
    for(var i = 0; i < segments.length; i++) {
      var row = this.$el.find("[data-id=\"" + segments[i].y + "\"]");
      var tile = row.find("[data-id=\"" + segments[i].x + "\"]");
      if (i === 0) {
        tile.attr("id", "python");
      } else {
        tile.attr("id", "python-segment");
      }
    }
    
    var apple = this.board.apple;
    var row = this.$el.find("[data-id=\"" + apple.y + "\"]");
    var tile = row.find("[data-id=\"" + apple.x + "\"]");
    tile.attr("id", apple);
  }
  
})(this);

$(document).ready(function() {
  var boardContents = "";
  for ( var i = 0 ; i < 15 ; i++ ) {
    var row = "<div class=\"row\" data-id=\"" + i + "\">";
    for ( var j = 0 ; j < 15 ; j++) {
      row += "<div class=\"tile\" data-id=\"" + j + "\" id=\"blank\"></div>";
    }
    row += "</div>";
    boardContents += row;
  }
  $('.board').append(boardContents);
  
  var view = new Game.View($('.board'));
  view.start();
})