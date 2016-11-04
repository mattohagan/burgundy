$(document).ready(function() {

    var WORDS_VIEW = 'words';
    var PROMPTS_VIEW = 'prompts';
    var currentView = WORDS_VIEW;
    var promptsUsed = false;
    var wordsUsed = false;

    function registerTap() {
        if(currentView == WORDS_VIEW) {
            changeWord();
        } else if(currentView == PROMPTS_VIEW) {
            changePrompt();
        }
    }

    function changeWord() {
        $.get('/word', function(data) {
            wordsUsed = true;
            $('#help-words').addClass('hide');
            $('#word').removeClass('hide');
            $('#word')[0].textContent = data;
        });
    }

    function changePrompt() {
        $.get('/prompt', function(data) {
            promptsUsed = true;
            $('#help-prompts').addClass('hide');
            $('#prompt').removeClass('hide');
            $('.prompt-title').removeClass('hide');
            $('#prompt')[0].textContent = data;
        });
    }

    function switchToWords() {
        if(currentView != WORDS_VIEW) {
            currentView = WORDS_VIEW;
            $('#words').toggleClass('active');
            $('#prompts').toggleClass('active');

            $('#prompt').addClass('hide');
            $('.prompt-title').addClass('hide');
            $('#help-prompts').addClass('hide');

            if(wordsUsed) {
                $('#word').removeClass('hide');
            } else {
                $('#help-words').removeClass('hide');
            }
            // hide prompts
            // show words
        }
    }

    function switchToPrompts() {
        if(currentView != PROMPTS_VIEW) {
            currentView = PROMPTS_VIEW;
            $('#words').toggleClass('active');
            $('#prompts').toggleClass('active');

            $('#word').addClass('hide');
            $('#help-words').addClass('hide');

            if(promptsUsed) {
                $('#prompt').removeClass('hide');
                $('.prompt-title').removeClass('hide');
            } else {
                $('#help-prompts').removeClass('hide');
            }
            // hide prompts
            // show words
        }
    }

    function adjustFont() {
        windowWidth = parseInt($('html').css('width').replace('px',''));
        if (windowWidth > 850) windowWidth = 850;
        $('#word').css('font-size', windowWidth/7.5 + "px")
        $('#prompt').css('font-size', windowWidth/9 + "px")
    }

    adjustFont();

    $(window).resize(adjustFont);
    $(document).keypress(changeWord);
    $$('#suggestion').tap(registerTap);

    $$('#words').tap(switchToWords);
    $$('#prompts').tap(switchToPrompts);
});
