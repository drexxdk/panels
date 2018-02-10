﻿var app = app || {};

app.media = function (media) {
    if (media.length) {
        if (!app.html.hasClass('media-loaded')) {
            app.head.append($('<link rel="stylesheet" href="dist/css/plyr.min.css">'));
            app.html.addClass('media-loaded');
        }

        $.getScript('dist/js/plyr.min.js', function () {
            media.each(function (i, item) {
                plyr.setup(item);
            });
        });
    }
};