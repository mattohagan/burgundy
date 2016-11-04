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

    // get a new word
    function changeWord() {
        $.get('/word', function(data) {
            // catch the times when user tries to switch views and an old request returns 
            if(currentView == WORDS_VIEW) {
                wordsUsed = true;
                $('#help-words').addClass('hide');
                $('#word').removeClass('hide');
                $('#word')[0].textContent = data;
            }
        });
    }

    // get a new prompt
    function changePrompt() {
        $.get('/prompt', function(data) {
            if(currentView == PROMPTS_VIEW) {
                promptsUsed = true;
                $('#help-prompts').addClass('hide');
                $('#prompt').removeClass('hide');
                $('.prompt-title').removeClass('hide');
                $('#prompt')[0].textContent = data;
            }
        });
    }

    // switch view to words
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
        }
    }

    // switch view to prompts
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
        }
    }

    function adjustFont() {
        windowWidth = parseInt($('html').css('width').replace('px',''));
        if (windowWidth > 850) windowWidth = 850;
        $('#word').css('font-size', windowWidth/7.5 + "px")
        $('#prompt').css('font-size', windowWidth/9 + "px")
    }

    // hah this is pretty outdated, works though 
    adjustFont();
    $(window).resize(adjustFont);

    $(document).keypress(registerTap);
    $$('#suggestion').tap(registerTap);

    $$('#words').tap(switchToWords);
    $$('#prompts').tap(switchToPrompts);
});
