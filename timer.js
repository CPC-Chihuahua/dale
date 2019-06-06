var TIME = {
    start: 120,
    set: function(t) {
        T.data('seconds', t);
        TIME.format();
    },
    decrement: function(t) {
        TIME.set(TIME.get() - 1);
    },
    get: function() {
        return parseInt(T.data('seconds'));
    },
    format: function() {
        var count = TIME.get();
        T.text(count);

        if (count > 60) {
            var seconds = (count % 60);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            T.text(Math.floor(count / 60) + ':' + seconds);
        } else if ((count >= 0) && (count < 10) && (T.text().length == 1)) {
            T.text(0 + T.text());
        }
    },

    tick: function() {
        TIME.interval = setInterval(function() {
            TIME.decrement();
            document.title = "Quedan " + TIME.get();
            TIME.style();
        }, 1000);
    },
    style: function() {
        var count = TIME.get();
        var half = Math.ceil(TIME.start / 2);

        TIME.resetClasses();
        if (count > half) {
            $('body').addClass('running');
        }

        if ((count > 0) && (count <= half) && (count > 10)) {
            $('body').addClass('half');
        } else if (count <= 10) {
            $('body').addClass('almost');
            if (count <= 0) {
                $('body').toggleClass('over');
            }
            if (count <= -999) {
                clearInterval(TIME.interval);
            }
        }
    },
    play: function() {
        if ($('body').hasClass('paused')) {
            TIME.style();
            TIME.tick();
        } else {
            TIME.reset();
        }
    },
    reset: function() {
        clearInterval(TIME.interval);
        TIME.set(TIME.start);
        T.css('margin-top', 0);
        TIME.style();
        $('body').addClass('paused');
    },
    resetClasses: function() {
        $('body').removeClass('paused running half almost over');
    },
    boot: function() {
        TIME.start = parseInt(window.location.hash.substr(1)) || 120;
        document.title = "Quedan " + TIME.start;
        $('span').text(TIME.start);
        TIME.set(TIME.start);
        $('body').click(TIME.play).dblclick(TIME.reset);
        TIME.heightWidthProportion = 10 / ($('span').width() / (TIME.start > 60 ? 4 : 2));
    }
};
$(function() {
    T = $('span.digits');
    TIME.boot();
});
