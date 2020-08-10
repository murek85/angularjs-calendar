'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .controller('MwlCalendarSlideBoxCtrl', function($rootScope, $scope, $timeout, calendarConfig, calendarEventTitle) {

    var vm = this;
    vm.calendarConfig = calendarConfig;
    vm.calendarEventTitle = calendarEventTitle;

    vm.isCollapsed = true;
    $scope.$watch('vm.isOpen', function(isOpen) {
      //events must be populated first to set the element height before animation will work
      $timeout(function() {
        vm.isCollapsed = !isOpen;
      });
    });

    vm.highlightEvent = function(startTime, endTime, color, shouldAddClass) {
      $timeout(function() {
        $rootScope.$broadcast('calendar.highlightEvent', {startTime: startTime, endTime: endTime, color: color, shouldAddClass: shouldAddClass});
      });
    };
  })
  .directive('mwlCalendarSlideBox', function() {

    return {
      restrict: 'E',
      template: '<div mwl-dynamic-directive-template name="calendarSlideBox" overrides="vm.customTemplateUrls"></div>',
      replace: true,
      controller: 'MwlCalendarSlideBoxCtrl as vm',
      require: ['^?mwlCalendarMonth', '^?mwlCalendarYear'],
      link: function(scope, elm, attrs, ctrls) {
        scope.isMonthView = !!ctrls[0];
        scope.isYearView = !!ctrls[1];
      },
      scope: {
        isOpen: '=',
        events: '=',
        onEventClick: '=',
        cell: '=',
        customTemplateUrls: '=?',
        templateScope: '=',
        draggableAutoScroll: '='
      },
      bindToController: true
    };

  });
