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

  let game = new DEFAULT_GAME();

  // At game init, display only 1 or 2 Player Buttons
  $(".choice-btn").hide();
  $("#game-table").hide();

  $('.mode-btn').on("click", function(e) {
    game.mode = e.target.getAttribute('data-mode');
    $('.mode-btn').hide();
    $('.choice-btn').show();
  });

  // After game mode is selected, prompt human player OR player 1 to select X or O
  $('.choice-btn').on('click', function(e) {
    game.player1 = e.target.getAttribute('data-choice');
    game.player2 = game.player1 === 'x' ? 'o' : 'x'
    game.turn = game.player1
    $('.choice-btn').hide();
    $('#game-table').show();
    console.log(game)
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
