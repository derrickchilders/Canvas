// ==UserScript==
// @name         Canvas Cleaup
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      https://myccsd.instructure.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    fixGrades();
    fixDashboard();
    
    function fixDashboard() {
        $('.ic-DashboardCard__header_hero').css('height', '0px');
        $('.ic-DashboardCard').css('width', '200px');
        $('.ic-DashboardCard').css('margin', '0 10px 10px 0');
        $(".ic-DashboardCard__action-container").css("margin-bottom", "0px");
        $('.ic-DashboardCard__header_hero.span').css('color', 'red');
        sortUsingNestedText($("#DashboardCard_Container"), "div.ic-DashboardCard", "h2");
    }
    function sortUsingNestedText(parent, childSelector, keySelector) {
        console.log("parent");
        var items = parent.find(childSelector).sort(function(a, b) {
            console.log("sorting");
            var vA = $(keySelector, a).text();
            var vB = $(keySelector, b).text();
            console.log("vA: " + vA + " vB: " + vB);
            return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
        });
        parent.append(items);
    }
    function fixGrades() {
        $("td").css("font-size", "0.8em");
        $("td .content-box").css("margin", "0 0");
        $("td select.grading_periods_selector").css("height", "20px");
        var table = "table.course_details.observer_grades";
        var jTableToSort = $(table);
        jTableToSort.find("tr").sort(SortByFirstColumnTextAscending).appendTo(jTableToSort);
    
        var colors = ["blue", "black", "purple", "lime", "maroon"];
        var tableRows = $(table + " tr");
        var currentName = "ASDF";
        var colorIndex = -1;
        tableRows.find("td:eq(0)").each(function(index, value) {
            var name = $(value).text().split(" ")[0];
            if(name !== currentName) {
                colorIndex+=1;
                currentName = name;
            }
            $(value).find("a").css("color", colors[colorIndex]);
        });
        tableRows.find("td:eq(1)").each(function(index, value) {
            var grade = parseInt($(this).text());
            if    (isNaN(grade)) $(value).css("color", "white");
            else if (grade < 70) $(value).css("color", "red");
            else if (grade < 80) $(value).css("color", "orange");
            else                 $(value).css("color", "green");
        });
    
    }
    function SortByFirstColumnTextAscending (zA, zB)
    {
        var ValA_Text = $(zA).find("td:eq(0)").text();
        var ValB_Text = $(zB).find("td:eq(0)").text();
        if(ValA_Text > ValB_Text) return 1;
        if(ValA_Text < ValB_Text) return -1;
        return 0;
    }
})();
