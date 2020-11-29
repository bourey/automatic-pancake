function getRandom(opts) {
  return opts[Math.floor(Math.random() * opts.length)];
}

function getNewOpt(lastOpt, opts) {
  const opt = getRandom(opts);
  if (lastOpt && lastOpt.e === opt.e) {
    return getNewOpt(lastOpt, opts);
  } else {
    return opt;
  }
}

function addChar(char, correct) {
  return $('<span/>').text(char).addClass(correct ? 'correct' : 'incorrect');
}

function checkForm(answers, resetFn) {
  let correct = true;
  $('.question').each(function (i, q) {
    const input = $(q).find('input');
    let attempt = input.val();
    attempt = attempt.replace(/([aeiou])\'/, function (match, p1) {
      switch (p1) {
        case 'a':
          return 'á';
        case 'e':
          return 'é';
        case 'i':
          return 'í';
        case 'o':
          return 'ó';
        case 'u':
          return 'ú';
        default:
          return p1;
      }
    });
    attempt = attempt.replace('n~', 'ñ')
    input.val(attempt);

    const answer = answers[0];
    const answerP = $(q).find('.answer');
    if (attempt === answer) {
      answerP.text('')
      input.removeClass('incorrect').addClass('correct');
    } else {
      correct = false;
      let j = 0;
      answerP.text('');
      while (j <= answer.length) {
        if (j <= attempt.length && attempt.charAt(j) === answer.charAt(j)) {
          answerP.append(addChar(answer.charAt(j), true));
        } else {
          answerP.append(addChar(answer.charAt(j), false));
        }
        j++;
      }
      input.addClass('incorrect');
    }
  });
  if (correct) {
    if (submittedCorrectly) {
      resetFn();
    } else {
      submittedCorrectly = true;
    }
  }
}