angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl', function(moment, alert, calendarConfig) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        alert.show('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        alert.show('Deleted', args.calendarEvent);
      }
    }];
    vm.events = [
      {
        title: 'An event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        badgeTotal: 10,
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        badgeTotal: 10,
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: 'This is a really long event title that occurs on every year',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('day').add(23, 'hours').add(30, 'minutes').toDate(),
        endsAt: moment().startOf('day').add(24, 'hours').toDate(),
        badgeTotal: 10,
        recursOn: 'year',
        draggable: true,
        resizable: true,
        actions: actions
      }
    ];

    vm.cellIsOpen = true;

    vm.addEvent = function() {
      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    vm.eventClicked = function(event) {
      alert.show('Clicked event', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited event', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted event', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized event', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      // if (vm.calendarView === 'month') {
      //   if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
      //     vm.cellIsOpen = false;
      //   } else {
      //     vm.cellIsOpen = true;
      //     vm.viewDate = date;
      //   }
      // } else if (vm.calendarView === 'year') {
      //   if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
      //     vm.cellIsOpen = false;
      //   } else {
      //     vm.cellIsOpen = true;
      //     vm.viewDate = date;
      //   }
      // }

      vm.fevents = [];

      if (moment(date).startOf('day').isSame(moment(new Date('02/11/2020')).startOf('day'))) {
        vm.fevents = [
          {
            title: 'This is a really long event title that occurs on every year',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true,
            actions: actions
          }
        ];
      }

    };

  });