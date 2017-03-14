$(function () {
  class LearnWords {
    constructor() {
      this.workmas; //data
      this.split;
      this.from;
      this.to;
      //STATISTIC play field
      this.len;
      this.language;

      this.correct;
      this.left;
      this.wrong;

      this.playedRoundsRU = 0;
      this.playedRoundsEN = 0;

      this.question;
      this.answer;
      //pause choose cards per game(userSplit)
      this.pauseSaveQuestion;
      this.pauseSaveAnswer;
      this.pauseSaveButton;
      this.userSplit;

      this.isEng = false;
      this.isStart = false;
      this.isPause = false;
      this.isProgressBarReDraw = true;
      this.isPicture = false;
      this.isTimeOut = false;
      //STATISTIC
      this.$len = $('.card_length');
      this.$language = $('.card_language');

      this.$correct = $('.card_variables-correct');
      this.$left = $('.card_variables-left');
      this.$wrong = $('.card_variables-wrong');

      this.$playedRoundsRU = $('.playedRoundsRU');
      // this.$playedRounds = $('.playedRounds');
      this.$playedRoundsEN = $('.playedRoundsEN');

      this.$question = $('.card_question');
      this.$answer = $('.card_answer');
      //CONTROLLERS
      this.$copy = $('.icon_copy-eng');
      // this.$pictures = $('.fa-picture-o');
      this.$settings = $('.icon-settings');

      // BUTTON
      this.$btnSP = $('.card_btnjoin');
      this.$btnOK = $('.fa-check');
      this.$btnNO = $('.fa-minus');

      // this.$progressbar = $('.card_progressbar');
      this.$progressbar = $('.card_progressbar');
      new Clipboard('.icon_copy-eng');

      this.EventInit();
      this.DrawInterface();
    }
    EventInit() {
      this.$btnSP.click(this.ClickHandler.bind(this));
      this.$btnOK.click(this.ClickHandler.bind(this));
      this.$btnNO.click(this.ClickHandler.bind(this));

      // this.$pictures.click(this.ClickHandler.bind(this));
      this.$language.click(this.ClickHandler.bind(this));
      this.$settings.click(this.ClickHandler.bind(this));
      this.$progressbar.on('click', '.grid_item', this.ClickHandler.bind(this));

      window.addEventListener('keydown', function (event) {
        // console.log(event.keyCode);
        // event.preventDefault();
        if (!this.isTimeOut) {
          // console.log('enter');
          switch (event.keyCode) {
            case 13:  // enter+left
            case 37: {
              if (!this.$btnOK.parent().hasClass('notActive')) {
                this.$btnOK.trigger('click');
              }
              else {
                this.$btnSP.trigger('click');
              }
              break;
            }
            case 27:  // esc+right
            case 39: {
              if (!this.$btnNO.parent().hasClass('notActive')) {
                this.$btnNO.trigger('click');
              }
              else {
                this.$btnSP.trigger('click');
              }
              break;
            }
            case 32: {  // space
              event.preventDefault();
              if (this.$btnSP.attr('data-action') == 'sp') {
                this.$btnSP.trigger('click');
              }
              break;
            }
            case 83: {  // s
              if (!this.$settings.hasClass('notActive')) {
                this.$settings.trigger('click');
              }
              break;
            }
            case 76: {  // l
              if (!this.$language.hasClass('notActive')) {
                this.$language.trigger('click');
              }
              break;
            }
            case 67: {  // c
              if (!this.$copy.hasClass('notActive')) {
                this.$copy.trigger('click');
              }
              break;
            }
            default: {

            }
          }
        }
        else {
          if (!this.isPause) {
            let date = new Date();
            let str = 'Fast click at ';
            if (date.getHours() < 10) str += "0" + date.getHours();
            else str += date.getHours();
            if (date.getMinutes() < 10) str += ":0" + date.getMinutes();
            else str += ":" + date.getMinutes();
            if (date.getSeconds() < 10) str += ":0" + date.getSeconds();
            else str += ":" + date.getSeconds();
            console.log(str);
            console.log('-----------');
          }
          else {
            console.log('---fast click in settings---');
          }
        }
        this.isTimeOut = true;
        // setTimeout(_.bind(this.Timer, this), 200);
        setTimeout(() => {
          this.isTimeOut = false; // `this` указывает на объект
        }, 100);

      }.bind(this));
    }
    ChangeLanguage() {
      if (this.isEng) {
        this.language = 'EN';
        this.$question.attr('id', '');
        this.$answer.attr('id', 'eng');
        this.isEng = false;
      }
      else {
        this.isEng = true;
        this.language = 'RU';
        this.$question.attr('id', 'eng');
        this.$answer.attr('id', '');
      }
      this.Init();
    }
    FirstInit() {
      // console.log('FirstInit');
      this.len = data.length;
      this.split = this.userSplit || 12;
      if (this.len < this.split) {
        this.split = this.len;
      }
      this.from = 1;
      this.to = this.split;

      this.$settings.removeClass('notActive');
      this.$language.removeClass('notActive');
      // this.$pictures.removeClass('notActive');
      this.$copy.removeClass('notActive');
      this.$playedRoundsRU.removeClass('notActive');
      this.$playedRoundsEN.removeClass('notActive');

      this.DrawProgressBar();
    }
    Init() {
      // console.log('Init');
      this.isStart = true;
      this.correct = 0;
      this.left = this.to - (this.from - 1);
      this.wrong = 0;

      this.$len.text(this.len + " (" + this.from + "-" + this.to + ")");

      this.$left.removeClass('card_variables-final');
      this.ShuffleData();
      this.OneWord();
      this.DrawInterface();
    }
    ClickHandler(event) {
      // console.log(event.currentTarget.dataset.action);
      // console.log("----");
      switch (event.currentTarget.dataset.action) {
        case 'sp': {
          if (this.isProgressBarReDraw) {
            this.isProgressBarReDraw = false;
            this.FirstInit();
            this.Init();
          }
          else if (!this.isStart) {
            this.Init();
          }
          else {
            this.DrawInterface(true);
          }
          break;
        }
        case 'ok': {
          this.correct++;
          this.left--;
          if (this.left == 0) {
            if (this.isEng) {
              this.playedRoundsEN++;
            }
            else {
              this.playedRoundsRU++;
            }
            this.ChangeLanguage();
            this.GameStop();
          }
          else {
            this.$answer.text('');
            this.OneWord();
            this.DrawInterface();
          }
          break;
        }
        case 'no': {
          this.wrong++;
          if (this.left > 1) {
            let tmp = this.workmas.splice(this.left - 1, 1);
            this.workmas.splice((this.left - 1) / 2, 0, tmp[0]);
          }
          else {
            this.$left.addClass('card_variables-final');
          }
          this.$answer.text('');
          this.OneWord();
          this.DrawInterface();
          break;
        }
        case 'settings': {
          if (this.isPause) {
            this.isPause = false;
            this.$question.text(this.pauseSaveQuestion);
            this.$answer.text(this.pauseSaveAnswer);
            this.$progressbar.addClass('notActive');
            this.$settings.css('color', '');
            this.$btnOK.css({
              'color': '',
              'background-color': '',
              'border': 'none',
              'box-shadow': ''
            });
            this.$btnOK.attr('data-action', 'ok');
            this.$btnNO.css({
              'color': '',
              'background-color': '',
              'border': 'none',
              'box-shadow': ''
            });

            this.$btnSP.attr('data-action', 'sp');
            this.$btnNO.attr('data-action', 'no');
            if (this.pauseSaveButton) {
              this.$btnOK.parent().addClass('notActive');
              this.$btnNO.parent().addClass('notActive');
              this.$btnSP.css('background-color', '');
              this.$btnSP.css('box-shadow', '');
            }
          }
          else {
            this.isPause = true;
            this.$progressbar.removeClass('notActive');
            this.pauseSaveQuestion = this.$question.text();
            this.pauseSaveAnswer = this.$answer.text();
            this.pauseSaveButton = this.$btnOK.parent().hasClass('notActive');
            this.$question.text("Сards for the round: 1/" + this.len);
            this.$settings.css('color', '#F39C49');
            this.$btnOK.css({
              'color': '#18BC9C',
              'background-color': '#fdfdfd',
              'border': '1px solid #95A5A6',
              'box-shadow': '0px 2px 5px 0px rgba(50, 50, 50, 0.5)'
            });
            this.$btnOK.attr('data-action', 'settings-ok');
            this.$btnNO.css({
              'color': '#E74C3C',
              'background-color': '#fdfdfd',
              'border': '1px solid #95A5A6',
              'box-shadow': '0px 2px 5px 0px rgba(50, 50, 50, 0.5)'
            });
            this.$btnNO.attr('data-action', 'settings');
            this.$btnSP.css('background-color', '#eee');
            this.$btnSP.css('box-shadow', 'none');
            this.$btnSP.attr('data-action', '');
            if (this.pauseSaveButton) {
              this.$btnOK.parent().removeClass('notActive');
              this.$btnNO.parent().removeClass('notActive');
            }
            this.$answer.html(function () {
              return '<input type="number" class="quantity" name="quantity" min="1" max="' + this.len + '" placeholder="' + this.split + '">'
            }.bind(this));
            // $('.quantity').focus();
          }
          break;
        }
        case 'settings-ok': {
          let $quantity = $('.quantity');
          if ($quantity.val() >= 1 && $quantity.val() <= this.len) {
            this.userSplit = parseInt($('.quantity').val());
            this.$settings.trigger('click');    //.bind(this);
            this.left = '';
            if (this.isEng) {
              this.ChangeLanguage();
            }
            this.FirstInit();
            this.GameStop();
          }
          else {
            $quantity.val('');
            $quantity.attr('placeholder', '?');
            $quantity.focus();
          }
          break;
        }
        // case 'pictures': {
        //   // console.log("pictures");
        //   if(!this.isPicture){
        //     this.isPicture = true;

        //   }
        //   break;
        // }
        case 'language': {
          event.preventDefault();
          if (this.isPause) {
            this.$settings.trigger('click');
          }
          this.ChangeLanguage();
          this.GameStop();
          break;
        }
        case 'progressbar': {
          this.playedRoundsRU = 0;
          this.playedRoundsEN = 0;
          let mas = event.currentTarget.innerText.split('\n');
          $('.grid_item-active').removeClass('grid_item-active');
          $(".grid_item[data-part='" + mas[0] + "']").addClass('grid_item-active');
          this.from = mas[0];
          this.to = mas[1];
          this.$settings.trigger('click');
          if (this.isEng) {
              this.ChangeLanguage();
            }
          this.GameStop();
        }
      }
    }
    DrawInterface(isAnswer = false) {
      if (isAnswer) {
        this.$answer.text(this.answer);
        this.$btnOK.parent().removeClass('notActive');
        this.$btnNO.parent().removeClass('notActive');
        this.$btnSP.css('background-color', '#eee');
        this.$btnSP.css('box-shadow', 'none');
        this.$btnSP.attr('data-action', '');
        // console.log('DrawInterface isAnswer=true');
      }
      else {
        this.$question.text(this.question);
        this.$btnOK.parent().addClass('notActive');
        this.$btnNO.parent().addClass('notActive');
        this.$btnSP.css('background-color', '');
        this.$btnSP.attr('data-action', 'sp');
        this.$btnSP.css('box-shadow', '');

        this.$correct.text(this.correct);
        this.$left.text(this.left);
        this.$wrong.text(this.wrong);

        this.$playedRoundsEN.text(this.playedRoundsEN);
        this.$playedRoundsRU.text(this.playedRoundsRU);

        // this.$len.text(this.len + " (" + this.from + "-" + this.to + ")");
        this.$language.text(this.language);
        // console.log('DrawInterface isAnswer=false');
      }
    }
    DrawProgressBar() {
      $('.grid_item').remove();
      let countOfBlocks = Math.ceil(this.len / this.split);
      let tmpFrom = 1;
      let tmpTo = this.split;
      let $html;
      for (let i = 0; i < countOfBlocks; i++) {
        if (i == 0) {
          // nothing
        }
        else if (i == countOfBlocks - 1) {
          tmpFrom = this.split + tmpFrom;
          tmpTo = this.len;
        }
        else {
          tmpFrom += this.split;
          tmpTo += this.split;
        }
        $html = $("<div class='grid_item'><span>" + tmpFrom + "</span><span>" + tmpTo + "</span><p class='grid_block'>"+(i+1)+"</span></div>").attr('data-action', 'progressbar').attr('data-part', tmpFrom);
        if (i == 0) {
          $html.addClass('grid_item-active');
        }
        this.$progressbar.append($html);
      }
    }
    ShuffleData() {
      this.workmas = $(data).slice(this.from - 1, this.to);
      let calculate = this.to - (this.from - 1);
      for (let i = 0; i < calculate; i++) {
        this.workmas[i]['rand'] = Math.floor(Math.random() * 99);
      }
      this.workmas = _.sortBy(this.workmas, ['rand']);
      // this.Show();
    }
    OneWord() {
      for (key in this.workmas[this.left - 1]) {
        if (key != 'rand') {
          if (this.isEng) {
            this.question = key;
            this.answer = this.workmas[this.left - 1][key];
            // console.log(this.question + " = " + this.answer);
          }
          else {
            this.question = this.workmas[this.left - 1][key];
            this.answer = key;
            // console.log(this.question + " = " + this.answer);
          }
        }
      }
    }
    GameStop() {
      // console.log('gameStop');
      this.isStart = false;
      this.question = "Let's Start";
      this.answer = '';
      this.$answer.text(this.answer);
      this.DrawInterface();
    }
    //   Show(){
    //     for(let i = this.split-1; i >= 0; i--){
    //       for(key in this.workmas[i]){
    //         if(key != 'rand'){
    //           if(this.isEng){
    //             console.log(key + ' = ' + this.workmas[i][key]);
    //           }
    //           else{
    //             console.log(this.workmas[i][key] + ' = ' + key);
    //           }
    //         }
    //       }
    //     }
    //     console.log('---------------------------------------------');
    //   }
  }

  let game = new LearnWords();
});
