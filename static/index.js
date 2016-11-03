$(document).ready(function() {

    var loaded = [4];
    var intervalVar;

    function hmmDotting() {
        if (loaded[0] > 0) {
            $('#suggestion')[0].textContent = 'hmm' + ['', '.', '..', '...'][4 - loaded[0]];
            loaded[0] = loaded[0] - 1;
        } else {
            clearInterval(intervalVar);
        }
    }

    intervalVar = window.setInterval(function() {
        hmmDotting();
    }, 300);

    function changeWord() {
        // previoius url http://burgundy.io:8080/
        $.get('/word', function(data) {
            loaded[0] = 0;
            $('#suggestion')[0].textContent = data;
            clearInterval(intervalVar);
        });
    }

    function adjustFont() {
        windowWidth = parseInt($('html').css('width').replace('px',''));
        if (windowWidth > 850) windowWidth = 850;
        $('#suggestion').css('font-size', windowWidth/7.5 + "px")
    }

    adjustFont();
    changeWord();

    $(window).resize(adjustFont);
    $(document).keypress(changeWord);
    $$('body').tap(changeWord);
});
