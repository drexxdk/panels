﻿{
    layoutr.getAssignmentItem = (items, id) => {
        return $($.map(items, (item) => {
            if (item.getAttribute("data-id") === id) {
                return item;
            }
        }));
    };

    layoutr.checkAssignment = (assignments) => {
        if (assignments.length) {
            if (!layoutr.html.hasClass('assignment-loaded')) {
                layoutr.showLoading();
                layoutr.promiseAssignment = layoutr.load.js(layoutr.host + layoutr.jsDist + 'assignment.js').finally(() => {
                    layoutr.hideLoading();
                });
                layoutr.html.addClass('assignment-loaded');
            }

            layoutr.promiseAssignment.then(() => {
                $(assignments).each((i, assignment) => {
                    assignment = $(assignment);
                    layoutr.checkAssignmentSort(assignment);
                    layoutr.checkAssignmentDragAndDrop(assignment);
                    layoutr.checkAssignmentColor(assignment);
                    layoutr.checkAssignmentPuzzle(assignment);
                    layoutr.checkAssignmentMultipleChoice(assignment);
                });
            }).catch((e) => {
                layoutr.showPopupAlert('Failed to load assignment', 'danger');
                console.error(e);
            });
        } else {
            layoutr.arrowKeyLocked = false;
        }
    };
}