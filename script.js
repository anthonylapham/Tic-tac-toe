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
    ['s1', 's2', 's3'],
    ['s4', 's5', 's6'],
    ['s7', 's8', 's9'],
    ['s1', 's4', 's7'],
    ['s2', 's5', 's8'],
    ['s3', 's6', 's9'],
    ['s1', 's5', 's9'],
    ['s3', 's5', 's7']
  ]

  let game = new DEFAULT_GAME();

  // At game init, display only 1 or 2 Player Buttons
  $(".choice-btn").hide();
  $("#game-table").hide();

  // Select game mode
  $('.mode-btn').on("click", function(e) {
    game.mode = e.target.getAttribute('data-mode');
    $('.mode-btn').hide();
    $('.choice-btn').show();
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

  function keepGoing() {
    return _.some(game.state, function(value, square) {
      return value === null
    })
  }

  function checkWinner() {
    for (var outer = 0; outer < winningCombinations.length; outer++) {
      const winnerExists = winningCombinations[outer].every(function(piece) {
        return game.state[piece] === game.turn
      })
      if (winnerExists) {
        return true
      }
    }
    return false
  }

  function computerMoves() {
    var openSpots = _.reduce(game.state, function(acc, value, key) {
      if (value === null) {
        acc.push(key)
      }
      return acc
    }, [])
    var computerChoice = _.sample(openSpots)
    game.state[computerChoice] = game.turn
    $('#' + computerChoice).text(game.turn).css('font-size', '50px').css('text-align', 'center').css('color', '#B22222');
    if (checkWinner()) {
      alert(game.turn + ' is the winner')
      location.reload();
      return
    }

    if (keepGoing() === false) {
      window.alert('Draw')
      location.reload();
    }


    game.turn = game.turn === 'x' ? 'o' : 'x'
  }

  // When a user clicks the board
  $('td').on('click', function() {
    // 0 check if marked
    if ($(this).text() !== '') {
      return
    }

    // 1) update game.state to keep track of moves
    game.state[this.getAttribute('id')] = game.turn

    // 2) mark the board
    $(this).text(game.turn).css('font-size', '50px').css('text-align', 'center');
    if (game.turn === game.player1) {
      $(this).text(game.turn).css('color', '#1E90FF');
    } else {
      $(this).text(game.turn).css('color', '#8B008B');
    }

    // 3) check if there is a winner (move to a another function)
    if (checkWinner()) {
      window.alert(game.turn + ' is the winner')
      location.reload();
      return
    }

    // If no winner, check for a draw
    if (keepGoing() === false) {
      window.alert('Draw')
      location.reload();
    }

    // if not a draw, then update game.turn (and if computer, make computer select a valid choice, check for winner, etc)
    game.turn = game.turn === 'x' ? 'o' : 'x'
    if (game.mode === 'computer') {
      computerMoves()
    }
  })

});