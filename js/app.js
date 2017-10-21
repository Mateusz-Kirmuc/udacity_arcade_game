// Declare necessary constants

const pavement_tracks = [60, 143, 226];
const enemy_initial_x_coord = -101;
const player_initial_coords = {
  x: 202,
  y: 405
};
const enemy_img_dimensions = {
  x: 101,
  y: 60,
}

const player_img_dimensions = {
  x: 101,
  y: 80
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;

  // Change enemy track and speed when it is off the screen
  if (this.x > 505) {
    this.change_params();
  }

  // Handle player-enemy collision
  if (this.isCollision()) {
    player.x = player_initial_coords.x;
    player.y = player_initial_coords.y;
  }
};

// When enemy head is located in the player area, then it's collision.
Enemy.prototype.isCollision = function() {
  let enemy_head = {
    x: this.x + enemy_img_dimensions.x,
    y: this.y + enemy_img_dimensions.y / 2
  }
  if (player.x <= enemy_head.x && enemy_head.x <= player.x + enemy_img_dimensions.x &&
    player.y <= enemy_head.y && enemy_head.y <= player.y + enemy_img_dimensions.y) {
    return true;
  } else {
    return false;
  }
};

// When enemy is off the screen, this method choose new initial position of
// the enemy and its speed.
Enemy.prototype.change_params = function() {
  this.x = enemy_initial_x_coord;
  this.y = get_random_y_coordinate();
  this.speed = get_random_int_from_range(200, 400);
}

// Helper function which randomly chooses pavement track y coordinate
get_random_y_coordinate = function() {
  let index = get_random_int_from_range(0, 2);
  return pavement_tracks[index];
}

// Helper function which randomly choose integer from range
get_random_int_from_range = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update player position, unless player goes off the screen.
Player.prototype.update = function() {
  // collision functionality implemented inside Enemy update method
  if (404 >= this.x + this.dx && this.x + this.dx >= 0) {
    this.x += this.dx;
    this.dx = 0;
  }
  if (405 >= this.y + this.dy && this.y + this.dy >= -10) {
    this.y += this.dy;
    this.dy = 0;
  }
  this.dy = 0;
  this.dx = 0;
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "up":
      this.dy = this.dy - 83;
      break;
    case "down":
      this.dy = this.dy + 83;
      break;
    case "right":
      this.dx = this.dx + 101;
      break;
    case "left":
      this.dx = this.dx - 101;
      break;
  }

  this.update();
  this.handleWin();

};

// Function moves player to initial position when he gets to 'sea area'.
Player.prototype.handleWin = function() {
  if (this.y == -10) {
    let player = this;
    setTimeout(function() {
      player.x = player_initial_coords.x;
      player.y = player_initial_coords.y;
    }, 100);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [
  new Enemy(enemy_initial_x_coord, pavement_tracks[1], 500),
  new Enemy(enemy_initial_x_coord, pavement_tracks[0], 500),
  new Enemy(enemy_initial_x_coord, pavement_tracks[2], 500),
];
const player = new Player(player_initial_coords.x, player_initial_coords.y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
