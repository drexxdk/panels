﻿var app = app || {};

app.isSmallBreakpoint = function () {
    return $(window).outerWidth() < 732 || !app.html.hasClass('left-push') && app.html.attr('data-aside') === 'left' || !app.html.hasClass('right-push') && app.html.attr('data-aside') === 'right';
};

app.hasTransitions = function () {
    return app.html.hasClass('transitions') && !app.html.hasClass('msedge') && !app.html.hasClass('msie');
};

$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
});

$(function () {
    app.main = $('main');
    app.content = $('#content > div');
    app.header = $('header');
    app.footer = $('footer');
    app.left = $('#left');
    app.right = $('#right');
    app.html = $('html');
    app.body = $('body');
    app.loading = $('#loading');
    app.transitionTime = 400;
    app.fadeOutTime = 500;
    app.htmlOverflowEnabled = true;
    app.smallBreakpoint = 732;
    app.overflow = $('#overflow');
    app.fullscreen = $('#fullscreen');
    app.fullscreen.img = app.fullscreen.find('#fullscreen-img');
    app.fullscreen.title = app.fullscreen.find('#fullscreen-title');
    app.fullscreen.toggle = app.fullscreen.find('#fullscreen-toggle');
    app.fullscreen.description = app.fullscreen.find('#fullscreen-description');

    if (bowser.msedge) {
        app.html.addClass('msedge'); // used to exclude layout transitions
    } else if (bowser.msie) {
        app.html.addClass('msie'); // used to exclude layout transitions
    }
    if (bowser.mobile) {
        app.html.addClass('mobile'); // disables fixed footer
    } else if (bowser.tablet) {
        app.html.addClass('tablet'); // does nothing currently
    } else {
        app.html.addClass('desktop'); // enables hover effects
    }

    if (bowser.android) {
        app.html.addClass('android'); // used by fullscreen
    } else if (bowser.ios) {
        app.html.addClass('ios'); // not currently used for anything
    }

    app.footer.html('<p>\u00A9 ' + new Date().getFullYear() + ' Frederik Nielsen</p>');

    //app.setHtmlScroll(); // outcomment if it can be disabled at first page load

    var transitionLock = false;

    app.toggleAside = function (aside) {
        if (!transitionLock) {
            transitionLock = true;
            var currentAside = app.html.attr('data-aside');
            if (currentAside.length) {
                if (currentAside === aside) {
                    app.html.attr('data-aside', '');
                } else {
                    app.html.attr('data-aside', aside);
                }
            } else {
                app.html.attr('data-aside', aside);
            }
            if (app.hasTransitions()) {
                setTimeout(function () {
                    transitionLock = false;
                    app.checkGoogleMaps();
                }, app.transitionTime);
            } else {
                transitionLock = false;
                app.checkGoogleMaps();
            }
            app.setHtmlScroll();
        }
    };


    $('.aside.left').click(function () {
        app.toggleAside('left');
    });

    $('.aside.right').click(function () {
        app.toggleAside('right');
    });

    $.get('ajax/layout/svg.html', function (data) {
        $(data).prependTo(app.body);
    });

    app.left.on('click', '.tree a', function (e) {
        e.preventDefault();
        var $this = $(this);
        var href = $this.attr('href');
        if (href === 'page1') {
            app.page1();
        } else {
            app.content.load('ajax/content/' + href + '.html');
        }
    });

    app.left.find('> .content > div').load('ajax/layout/menu.html');
    app.page1();
});

$(window).click(function (e) {
    var target = $(e.target);
    var isSmallBreakpoint = app.isSmallBreakpoint();
    var left = app.html.attr('data-aside') === 'left' && (app.html.hasClass('close-left-click-outside') || isSmallBreakpoint) && !target.closest("#left").length;
    var right = app.html.attr('data-aside') === 'right' && (app.html.hasClass('close-right-click-outside') || isSmallBreakpoint) && !target.closest("#right").length;
    var notTarget = !target.closest("#fullscreen").length && !target.closest("#loading").length && !target.closest(".aside").length && !target.closest('.popup').length;

    if ((left || right) && notTarget ) {
        app.enableScroll();
        app.html.attr('data-aside', '');
        app.checkGoogleMaps();
    }
});