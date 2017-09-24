$(document).ready(function() {
  // Our game should have good flow and be intuitive to use.
  function DEFAULT_GAME() {
    this.mode = null;
    this.player1 = null;
    this.player2 = null;
    this.state = {
      s1: null,
      s2: null,
      s3: null,
      s4: null,
      s5: null,
      s6: null,
      s7: null,
      s8: null,
      s9: null
    }
    this.turn = null;
  }

  var winningCombinations = [
    // finish vertlical and diagonal combinations
    // first you will need an out loop, if there is a winning combo then break out of outer loop
    // in the inner loop, use Array#every to check if all elements (the squares) have current player marking
    [1,2,3],
    [4,5,6],
    [7.8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ]

  let game = new DEFAULT_GAME();

  // At game init, display only 1 or 2 Player Buttons
  $(".choice-btn").hide();
  $("#game-table").hide();

  $('.mode-btn').on("click", function(e) {
    game.mode = e.target.getAttribute('data-mode');
    $('.mode-btn').hide();
    $('.choice-btn').show();
    console.log('this is what jquery gives us:', $('button'))
    if (game.mode === "computer") {
      window.alert("Good Luck Human");
    } else {
      window.alert("May the best person win!")
    }
  });

  // After game mode is selected, prompt human player OR player 1 to select X or O
  $('.choice-btn').on('click', function(e) {
    game.player1 = e.target.getAttribute('data-choice');
    game.player2 = game.player1 === 'x' ? 'o' : 'x'
    game.turn = game.player1
    $('.choice-btn').hide();
    $('#game-table').show();
    window.alert("Let The Game Begin!")
  })

  function draw() {
    if (document.getElementById('game-table').disabled == true) {
      window.alert("Tie Game!")
    }
  }

  $('td').on('click', function() {
    // 1) update game.state to keep track of moves
    game.state[this.getAttribute('id')] = game.turn

    // 2) mark the board and make disabled

    // 3) check if there is a winner (move to a another function)
      // If not winner, then update game.turn (and if computer, make computer select a valid choice, check for winner, etc)
      // if winner, alert and reset game object
  })

  // After game choice has been selected, display table and prompt player 1 or human player
  // to start the game.

  // Either disable square after it has been selected OR check if it is avaialabe
  // If player selected invalid square, tell them to pick another square

  // if it is valid, add the mark X or O to the <td></td> element and update game.state object

  // After marking, check for a winning combination of game.turn. There are 8 winning combinations
  // if there is a winner, stop game and display a message
  // if there is no winner, check if the board is full
  // if board is full, stop game and display that it is a tie
  // if board is not full, change game.turn to other player


});
