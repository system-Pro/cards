;'use strict';

$(function () {
  var workmas;
  var len;  //data length
  var left; //
  var right;
  var wrong;

  var question;
  var pauseQuestion;
  var answer;

  var split;
  var from;
  var to;
  var userSplit;

  var isFirstInit = false;
  var isStart = false;
  var isRus = false;

  var pauseAnswer;
  var pausePosition;
  var pauseButton;

  var playedRounds = 0;
  var playedRoundsEN;
  var playedRoundsRU;

  var $len = $('.card_length');

  var $right = $('.card_variables-right');
  var $left = $('.card_variables-left');
  var $wrong = $('.card_variables-wrong');

  var $question = $('.card_question');

  var $answer = $('.card_answer');

  var $no = $('.card_no');
  var $ok = $('.card_ok');
  var $indent = $('.card_indent');

  var $progressbar = $('.card_progressbar');

  var $facheck = $('.fa-check');
  var $faminus = $('.fa-minus');

  var $copy = $('.icon_copy-eng');
  new Clipboard('.icon_copy-eng');

  var $settings = $('.icon-settings');
  var isPause = false;

  var $playedRounds = $('.playedRounds');

  // SETTINGS PAUSE
  $settings.click(function(){
    if(!isPause){
      isPause = true;
      pauseQuestion = $question.text();
      pauseAnswer = $answer.text();
      pauseButton = $ok.hasClass('card_ok-join');
      if(pauseButton){
        $ok.removeClass('card_ok-join');
        $no.removeClass('card_no-join');
        $facheck.removeClass('notActive');
        $faminus.removeClass('notActive');
      }
      $settings.css('color', '#F39C49');
      $ok.css({
        'background-color': 'white',
        'border': '1px solid #95A5A6'
      });
      $no.css({
        'background-color': 'white',
        'border': '1px solid #95A5A6'
      });
      $facheck.css('color', '#18BC9C');
      $faminus.css('color', '#E74C3C');
      $question.text("Сards for the round:");
      $copy.addClass('notActive');
      $answer.html(function(){
        return '<input type="number" class="quantity" name="quantity" min="1" max="' + len +'" placeholder="' + split + '">'
      });
      $('.quantity').focus();
    }
    else{
      isPause = false;
      $question.text(pauseQuestion);
      $answer.text(pauseAnswer);
      $settings.css('color', '');
       $ok.css({
        'background-color': '',
        'border': 'none'
      });
      $no.css({
        'background-color': '',
        'border': 'none'
      });
      $facheck.css('color', '');
      $faminus.css('color', '');
      if(pauseButton){
        $ok.addClass('card_ok-join');
        $no.addClass('card_no-join');
        $facheck.addClass('notActive');
        $faminus.addClass('notActive');
      }
    }
  });
  $facheck.click(function(){
    $ok.trigger('click');
  });
  $faminus.click(function(){
    $no.trigger('click');
  });
  // TOUCH
  $no.click(function(){
    if(isPause){
      $settings.trigger('click');
    }
    else{
      if($no.hasClass('card_no-join')){
        checkAnswer('sp');
      }
      else{
        checkAnswer('no');
      }
    }
  });
  $ok.click(function(){
    if(isPause){
      $('.quantity').css('border-color', '');
      if($('.quantity').val() != ''){
        userSplit = parseInt($('.quantity').val());
        $('.card_progressbar_inner').remove();
        $settings.trigger('click');
        isFirstInit = false;
        gameStop();
      }
      else{
        $('.quantity').attr('placeholder', '?');
      }
    }
    else{
      if($ok.hasClass('card_ok-join')){
        checkAnswer('sp');
      }
      else{
        checkAnswer('ok');
      }
    }
  });
  // KEYBOARD
  window.addEventListener('keydown', function (e) {
    if(isPause){
      if(e.keyCode == 9){
        $settings.trigger('click');
      }
      if(e.keyCode == 13){    //enter
        $ok.trigger('click');
      }
      else if(e.keyCode == 27){   //esc
        $settings.trigger('click');
      }
      else if(e.keyCode == 37){   //left arrow
        $ok.trigger('click');
      }
      else if(e.keyCode == 39){   //right arrow
        $settings.trigger('click');
      }
      else{
        // nothing
      }
    }
    else if(e.keyCode == 76){     //Change language butoon - L
      if(isStart){
        if(isRus == false){
          $RU.trigger('click');
        }
        else{
          $EN.trigger('click');
        }
      }
    }
    else if(e.keyCode == 9){    //Settings button - Tab
      e.preventDefault();
      if(!$settings.hasClass('notActive')){
        $settings.trigger('click');
      }
    }
    else if(e.keyCode == 67){   //Copy eng words to buffer - C
      if(!$copy.hasClass('notActive')){
        $copy.trigger('click');
      }
    }
    else if($ok.hasClass('card_ok-join')){
      checkAnswer('sp');
    }
    else if(e.keyCode == 13){    //enter
        checkAnswer('ok');
      }
    else if (e.keyCode == 37) {   //right arrow
      checkAnswer('ok');
    }
    else if(e.keyCode == 27){   //esc
       checkAnswer('no');
      }
    else if (e.keyCode == 39) {   //left arrow
      checkAnswer('no');
    }
    else{
      //nothing
    }

  });

  function checkAnswer(button){
    if(!isStart){
      gameStart();
      oneStep();
    }
    else if(button == 'sp'){
      $answer.text(answer);
      $indent.removeClass('notActive');
      $ok.removeClass('card_ok-join');
      $no.removeClass('card_no-join');
      $facheck.removeClass('notActive');
      $faminus.removeClass('notActive');

      if(isRus){
        $copy.removeClass('notActive');
      }
    }
    else{
      if(button == 'ok'){
        right++;
        left--;
      }
      if(button == 'no'){
        wrong++;
        if(left > 1){
          var tmp = workmas.splice(left -1, 1);
          workmas.splice((left-1) / 2, 0, tmp[0]);
        }
        else{
          $left.addClass('card_variables-final');
        }
      }
      oneStep();
      if(left == 0){
        playedRounds++;
        if(isRus){
          $EN.trigger('click');
          playedRoundsRU++;
          console.log(playedRoundsRU+' ru++');
        }
        else{
          $RU.trigger('click');
          playedRoundsEN++;
          console.log(playedRoundsEN+' en++');
        }
        if(playedRoundsEN == 3 && playedRoundsRU == 3){
          console.log("3=3");
        }
        gameStop(true);
      }
      $answer.text("");
      $indent.addClass('notActive');
      $ok.addClass('card_ok-join');
      $no.addClass('card_no-join');
      $facheck.addClass('notActive');
      $faminus.addClass('notActive');
      if(isRus){
        $copy.addClass('notActive');
      }
    }
  }

  // function gameStart(){
  //   if(!isFirstInit){
  //     isFirstInit = true;
  //     len = base.length;
  //     split = userSplit || 15;
  //     if(len <  split){
  //       split = len;
  //     }
  //     from = 1;
  //     to = split;
  //     playedRoundsEN = 0;
  //     playedRoundsRU = 0;
  //     progressBar();
  //   }
  //   left = to - (from-1);
  //   isStart = true;
  //   right = 0;
  //   wrong = 0;
  //   question = "";
  //   answer = "";

  //   $len.text(len);
  //   $left.removeClass('card_variables-final');
  //   $settings.removeClass('notActive');
  //   $playedRounds.removeClass('notActive');
  //   if(!isRus){
  //     $copy.removeClass('notActive');
  //   }
  //   shuffleStart(from, to);
  // }

  function gameStop(lang){
    console.log(lang);
    var trig = lang || false;
    console.log(trig);
    if(!trig){
      playedRoundsEN = 0;
      playedRoundsRU = 0;
      console.log('reset');
    }
    isStart = false;
    if(isRus){
      $question.text("Начнем");
    }else{
      $question.text("Let's Start");
    }
    $answer.text("");
    // $indent.addClass('notActive');
    $ok.addClass('card_ok-join');
    $no.addClass('card_no-join');
    $facheck.addClass('notActive');
    $faminus.addClass('notActive');
    $copy.addClass('notActive');
  }

  function shuffleStart(from, to){
    workmas = $(base).slice(from-1, to);
    var calculate = to - (from-1);
    for(var i = 0; i < calculate; i++){
      workmas[i]['rand'] = Math.floor(Math.random() * 99);
    }
    workmas = _.sortBy(workmas, ['rand']);
  }

  function oneStep(){
    for(key in workmas[left-1]){
      if(key != 'rand'){
        if(isRus){
          question = workmas[left-1][key];
          answer = key;
        }
        else{
          question = key;
          answer = workmas[left-1][key];
        }
      }
    }
    interfaceUpdate();
  }

  // function interfaceUpdate(){
  //   $right.text(right);
  //   $left.text(left);
  //   $wrong.text(wrong);
  //   $question.text(question);
  //   $playedRounds.text(playedRounds);
  //   // $playedRounds.text(playedRounds);
  // }

  $progressbar.on('click', '.card_progressbar_inner', function(e) {
    var mas = e.currentTarget.innerText.split('\n');
    $('.card_progressbar_inner-active').removeClass('card_progressbar_inner-active');
    $(".card_progressbar_inner[data-part='" + mas[0] +"']").addClass('card_progressbar_inner-active');
    from = mas[0];
    to = mas[1];
    gameStop();
  });

  // function progressBar(){
  //   var countOfBlocks = Math.ceil(len / split);
  //   var tmpFrom = 1;
  //   var tmpTo = split;
  //   for(var i = 0; i < countOfBlocks; i++){
  //     if(i == 0){
  //       // nothing
  //     }
  //     else if(i == countOfBlocks-1){
  //       tmpFrom = split + tmpFrom;
  //       tmpTo = len;
  //     }
  //     else{
  //       tmpFrom += split;
  //       tmpTo += split;
  //     }
  //     var $txt = $("<div><div>"+tmpFrom+"</div><div>"+tmpTo+"</div></div>").addClass('card_progressbar_inner').attr('data-part', tmpFrom);
  //     if(i == 0){
  //       $txt.addClass('card_progressbar_inner-active');
  //     }
  //     $progressbar.append($txt);
  //   }
  // }

  // function show(){
  //   for(var i = 0; i < split; i++){
  //     for(key in workmas[i]){
  //       if(key != 'rand'){
  //         console.log(key + ' = ' + workmas[i][key]);
  //       }
  //     }
  //   }
  //   console.log('---------------------------------------------');
  // }

   // LANG
  var $RU = $('.card_RU');
  var $EN = $('.card_EN');

  $RU.click(function(e){
    e.preventDefault();
    $EN.removeClass('notActive');
    $RU.addClass('notActive');
    isRus = true;
    $question.attr('id', '');
    $answer.attr('id', 'eng');
    gameStop();
  });
  $EN.click(function(e){
    e.preventDefault();
    $RU.removeClass('notActive');
    $EN.addClass('notActive');
    isRus = false;
    $answer.attr('id', '');
    $question.attr('id', 'eng');
    gameStop();
  });
});
