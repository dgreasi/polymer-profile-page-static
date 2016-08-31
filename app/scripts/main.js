import app from './app';
import Event from './Event';
import localforage from 'localforage';

export default function main() {

  app.events = [];

  app.selectedEvent = null;


  // Toggle toast to delete event loaded
  app.dialogToggle = function () {
    if (app.selectedEvent != null) {
        document.querySelector('#dialog').toggle();
    } else {
        document.querySelector('#noCurrentEvent').toggle();
    }
  };


  // Create new event and counters
  app.newEventCreate = function () {
    var newEvent = new Event(document.getElementById("newEventName").value);
    var numberOfCounters = +document.getElementById("newCounterNum").value;

    
    for (var i = 0; i < numberOfCounters; i++) {
      newEvent.counters.push({
        name: 'Counter ' + (i+1),
        value: 0
      });
    }

    app.push('events', newEvent);
    app.set('selectedEvent', newEvent);

    app.lForageSaveEvent(newEvent);
  };

  // Reload page
  app.myReload = function () {
    location.reload();
  };

  // ################# LocalForage Functions ################# //

  // Save one event
  app.lForageSaveEvent = function (event) {

    // set as key the id of each event
    localforage.setItem(event.id, event).then(function(value) {
        console.log(value,' saved!!!');
    });

  };


  // Load one event, arg to lF: the id of the event
  app.lForageLoadEvent = function (event) {

    localforage.getItem(event.id).then(function(value) {
        console.log(value);
    });

  };


  // Remove one event
  app.lForageRemoveEvent = function (event) {

    localforage.removeItem(event.id).then(function(value) {
        console.log('Key is cleared!');
        
        if (app.selectedEvent == event) {
            app.selectedEvent = null;
        }

        var pos = app.events.indexOf(event);
        app.splice('events', pos, 1);
        page.redirect('/oldEvents');
    });


  };

  // Save all events locally (LF)
  app.buttonSave = function (events) {
    document.querySelector('#position').toggle();
    var x;

    for (x in app.events) {
        app.lForageSaveEvent(app.events[x]);    
    }
    
  };

  // Save all events, from a given list of events as arg
  app.lForageSaveAll = function (events) {
    var x;

    for (x in app.events) {
        app.lForageSaveEvent(app.events[x]);    
    }
    
  };


  // Load to the list: app,events, all the events
  app.lForageLoadAll = function () {

    localforage.iterate(function(value, key, iterationNumber) {
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.
        if (value != 'testPromiseValue') {
          app.push('events', value);
        }
        console.log(value);
    }).then(function() {
        console.log('Iteration has completed');
    });

  };


  // Remove all events from localForage
  app.lForageRemoveAll = function () {

    // alert("All events deleted");

    app.events = [];

    app.selectedEvent = null;

    localforage.clear(function(err) {
        // Run this code once the database has been entirely deleted.
        console.log('Database is now empty.');
    });

  };


}
