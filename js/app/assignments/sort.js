﻿var app = app || {};

app.assignment.sort = function (assignment) {
    var container = assignment.find('.container'),
        items = assignment.find('.item');

    Sortable.create(container[0], {
        draggable: ".item",
        animation: 0,
        scroll: false,
        forceFallback: true,
        fallbackOnBody: true,
        ghostClass: 'sort-sortable-ghost',
        chosenClass: 'sort-sortable-chosen'
    });

    var checkWidth = function () {
        container.removeClass('row').addClass('column');
        var containerLeft = container[0].getBoundingClientRect().left;
        var firstItem = container.find('> .item:first-child');
        var firstItemLeft = firstItem[0].getBoundingClientRect().left - parseInt(firstItem.css('margin-left'));
        if (firstItemLeft < containerLeft) {
            container.removeClass('column').addClass('row');
        }
    };

    checkWidth();

    $(window).on("throttledresize.assignment", function () {
        checkWidth();
    });

    var getItem = function (id) {
        return $($.map(items, function (item) {
            if (item.getAttribute("data-id") === id) {
                return item;
            }
        }));
    };

    var reset = function () {
        items.removeClass('valid invalid');
        assignment.removeClass('validated');
        items = items.shuffle();
    };

    var getCorrect = function () {
        // this should be retrieved with api call
        return ['3', '1', '2', '5', '4', '7', '6', '8', '9'];
    };

    assignment.on('click', 'button[type="submit"]', function () {
        if (!assignment.hasClass('validated')) {
            //var checked = getChecked();
            //if (checked.length) {
            //    checked.prop('checked', false);
            //}
            assignment.addClass('validated');
            var correct = getCorrect();
            $(correct).each(function (i, id) {
                var item = getItem(id);
                if (item.index() === i) {
                    item.addClass('valid');
                } else {
                    item.addClass('invalid');
                }
            });
        }
    });

    assignment.on('click', 'button[type="reset"]', function () {
        reset();
    });

    var insertAtIndex = function (i, item) {
        if (i === 0) {
            container.prepend(item);
        } else {
            container.find('> .item:nth-child(' + i + ')').after(item);
        }
    };

    assignment.on('click', 'button.correct', function () {
        reset();
        assignment.addClass('validated');
        var correct = getCorrect();
        $(correct).each(function (i, id) {
            var item = getItem(id);
            item.addClass('valid');
            insertAtIndex(i, item);
        });
    });
};