﻿var app = app || {};

$(function () {
    app.body.on("keydown", function (e) {
        var target = $(e.target),
            parent = target.parent();
        if (app.isLoading()) {
            if (e.which === 9 || e.ctrlKey && e.keyCode === 65) { // tab ||  ctrl + a
                e.preventDefault();
            }
        } else {
            if (e.which === 37 && !app.isModal()) { // left
                if (app.isAsideLeft()) {
                    app.toggleAside(); // closes right
                } else if (!app.isAsideRight()) {
                    app.toggleAside('right'); // opens right
                }
            } else if (e.which === 39 && !app.isModal()) { // right
                if (app.isAsideRight()) {
                    app.toggleAside(); // closes left
                } else if (!app.isAsideLeft()) {
                    app.toggleAside('left'); // opens left
                }
            } else if (e.which === 27) { // esc
                if (app.isReadingRuler()) {
                    app.hideReadingRuler();
                } else if (app.isModal()) {
                    app.closeModal();
                } else {
                    if (app.isAside()) {
                        app.toggleAside(); // closes aside
                    }
                    var popups = app.body.children('.popup');
                    if (popups.length) {
                        popups.fadeOut(app.fadeOutTime, function () {
                            popups.remove();
                        });
                    }
                    var dropdowns = app.content.find('div.dropdown.open');
                    if (dropdowns.length) {
                        dropdowns.removeClass('open');
                    }
                    app.html.attr('data-authentication', '');
                }
            }
            if (e.which === 13) { // enter
                var dropdown = target.parents('div.dropdown');
                if (dropdown.length || parent.parent().hasClass('accordion')) {
                    target.click();
                    e.preventDefault();
                    if (dropdown.length) {
                        dropdown.children('div').focus();
                    }
                } else if (parent.hasClass('checkbox') || parent.hasClass('radio') || parent.hasClass('switch') || target.hasClass('toggle')) {
                    target.siblings('input').click();
                    e.preventDefault();
                }
            }
        }
    });

    app.body.on('keyup', function (e) {
        if (!app.isLoading() && !app.isReadingRuler()) {
            if (e.which === 9) { // tab
                var target = $(e.target);
                if (!target.parents('div.dropdown.open').length) {
                    $('div.dropdown.open').removeClass('open');
                }
                if (!target.parents('#authenticated.open').length || target.closest('#authenticated > button').length) {
                    $('#authenticated.open').removeClass('open');
                }
                if (app.isModal()) {
                    if (!target.parents('#modal').length) {
                        app.closeModal();
                    }
                } else {
                    var aside = target.parents('aside');
                    if (aside.length === 0 && target.is('aside')) {
                        aside = target;
                    }
                    if (aside.length && aside.attr('id') !== app.html.attr('data-aside')) {
                        app.toggleAside(aside.attr('id'));
                    } else if (!aside.length && app.isAside()) {
                        app.toggleAside();
                    }
                }
            }
        }
    });
});