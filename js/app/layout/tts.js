﻿var app = app || {};

app.clearSelection = () => {
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(document.createRange());
}
app.stopTTS = () => {
    app.clearSelection();
    if (app.tts && app.tts.IsSpeaking()) {
        app.tts.ShutUp();
    }
};

function getText(node, selection, target) {
    var text = [],
        nonWhitespaceMatcher = /\S/;

    function getTextNodes(node) {
        var parent = $(node.parentNode);
        var special = false;
        
        if (selection.containsNode(node, true) && (node.nodeName.toLowerCase() === 'input' ||
            node.nodeName.toLowerCase() === 'textarea') && nonWhitespaceMatcher.test(node.value)) {

            special = true;
        }

        if (!special &&
            selection.containsNode(node, true) &&
            node.nodeType === 3 &&
            nonWhitespaceMatcher.test(node.nodeValue) &&
            parent.is(':visible') &&
            parent.css('user-select') !== 'none' &&
            parent.parents().css('user-select') !== 'none' &&
            node.parentNode.tagName !== 'SCRIPT'
        ) {
            if (!node.nodeValue.match(/\.\s*$/) && node.nextElementSibling === null && parent.is('h1, h2, h3, h4, h5, h6, p, th, td, .dataTable th span')) {
                text.push(node.nodeValue + '. ');
            } else {
                text.push(node.nodeValue);
            }
            if (text.length === 1) {
                if ($(selection.anchorNode).is(selection.focusNode)) {
                    text[0] = text[0].substring(0, selection.focusOffset).substring(selection.baseOffset);
                } else {
                    text[0] = text[0].substring(selection.baseOffset);
                }
            }
        } else {
            for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                getTextNodes(node.childNodes[i]);
            }
        }
    }
    getTextNodes(node);
    
    text = text.join(' ').replace(/(?:\r\n|\r|\n)/g, ' ').replace(/ +\./g, '. ').replace(/\s\s+/g, ' ').replace(',.', '.').trim();
    return text;
}


app.enableTTS = () => {
    if (bowser.desktop) {
        let snapSelectionToWord = () => {
            let selection = window.getSelection();
            if (!selection.isCollapsed) {
                let range = selection.getRangeAt(0);
                if (range.collapsed || range.toString().length === 0) {
                    return;
                }

                try {
                    // select full start word
                    while (range.startOffset > 0 && range.toString()[0].match(/[^\s]/)) {
                        range.setStart(range.startContainer, range.startOffset - 1);
                    }
                    // remove space as first selected
                    let start = range.startContainer.data.substring(range.startOffset).charAt(0);
                    if (start === ' ') {
                        range.setStart(range.startContainer, range.startOffset + 1);
                    }
                } catch (e) {

                }

                try {
                    // select full end word
                    while (range.endOffset < range.endContainer.length && range.toString()[range.toString().length - 1].match(/[^\s]/)) {
                        range.setEnd(range.endContainer, range.endOffset + 1);
                    }
                    // remove space as last selected
                    let end = range.endContainer.data.substring(0, range.endOffset).slice(-1);
                    if (end === ' ') {
                        range.setEnd(range.endContainer, range.endOffset - 1);
                    }
                } catch (e) {

                }

                selection.removeAllRanges();
                selection.addRange(range);
            }
            return selection;
        }

        if (bowser.msie) {
            if (!app.html.hasClass('polyfills-loaded')) {
                app.head.append($('<script src="dist/js/polyfills.min.js"></script>'));
                app.html.addClass('polyfills-loaded')
            }
        }

        $.getScript('dist/js/tts.min.js', () => {
            let awsCredentials = new AWS.Credentials('AKIAIUIGJHORPPUHXYXA', 'jmVeV3yty4koyYVydkjQEz0EBjsR/IeSVmVwknyw');

            let settings = {
                awsCredentials: awsCredentials,
                awsRegion: 'eu-central-1',
                pollyVoiceId: 'Russell'
            };

            app.tts = ChattyKathy(settings);

            app.html.attr('data-tts', true);

            $(window).on('mousedown touchstart', (e) => {
                if (!app.isLoading() && !app.isFocus() && app.isTTS() && app.isTTSEnabled()) {
                    app.clearSelection();
                }
            });

            $(window).on('mouseup touchend', (e) => {
                if (!$(document.activeElement).is('input, textarea, button, select, .dropdown')) {
                    if (!app.isLoading() && !app.isFocus() && app.isTTS() && app.isTTSEnabled() && e.originalEvent.detail < 3) {
                        setTimeout(() => {
                            let selection = snapSelectionToWord();
                            let text = getText(selection.getRangeAt(0).commonAncestorContainer, selection, e.target);

                            if (text.length) {
                                app.tts.SpeakWithPromise(text).then(() => {
                                    app.clearSelection();
                                });
                            } else {
                                app.stopTTS();
                            }
                        });
                    }
                }
            });

            app.header.find('.tts').click(() => {
                if (app.html.attr('data-tts') === 'true') {
                    app.html.attr('data-tts', false);
                    app.stopTTS();
                } else {
                    app.html.attr('data-tts', true);
                }
            });
        });
    }
};