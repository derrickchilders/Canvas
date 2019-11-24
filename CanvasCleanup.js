// ==UserScript==
// @name         Canvas Cleaup
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  Make Canvas a little more usable
// @author       Derrick Childers
// @include      https://myccsd.instructure.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //fixGrades();
    //fixDashboard();
    setTimeout(fixGrades, 250);
    setTimeout(fixDashboard, 250);
    
    function fixDashboard() {
        $('.ic-DashboardCard__header_hero').css('height', '0px');
        $('.ic-DashboardCard').css('width', '200px');
        $('.ic-DashboardCard').css('margin', '0 10px 10px 0');
        $(".ic-DashboardCard__action-container").css("margin-bottom", "0px");
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
    
        var colors = ["blue", "black", "green", "purple", "lime", "maroon"];
        var tableRows = $(table + " tr");
        var currentName = "ASDF";
        var colorIndex = 0;
        tableRows.find("td:eq(0)").each(function(index, value) {
            var name = $(value).text().split(" ")[0];
            if(name !== currentName) {
                colorIndex+=1;
                currentName = name;
                if(colorIndex > colors.length)
                    colorIndex = 1;
                $(tableRows).eq(index).css("border-top", "2px solid black");
            }
            
            $(value).find("a").css("color", colors[colorIndex-1]);
        });
        tableRows.find("td:eq(1)").each(function(index, value) {
            var grade = parseInt($(this).text());
            if    (isNaN(grade)) $(value).css("color", "white").css("font-size", "1.3em");
            else if (grade < 69.5) $(value).css("color", "red").css("font-size", "1.2em");
            else if (grade < 79.5) $(value).css("color", "orange").css("font-size", "1.1em");
            else if (grade < 89.5) $(value).css("color", "green").css("font-size", "1.1em");
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
