function main(args) {
    let name = args.name || 'stranger'
    let greeting = 'Hello ' + name + '!'
    let events = args.events || { }
    let dayStart = args.dayStart || '9:00'
    let dayEnd = args.dayEnd || '17:00'

    // Helper function to convert time strings to Date objects
    const toDate = (time) => new Date(`1970-01-01T${time}:00Z`);

    // Helper function to convert a datetime string to a date object (for grouping events by day)
    const toDateObject = (datetime) => new Date(datetime);

    const eventsByDay = {};
    events.forEach(event => {
      const eventDate = toDateObject(event.start).toISOString().split('T')[0]; // Get date part (YYYY-MM-DD)
      if (!eventsByDay[eventDate]) {
        eventsByDay[eventDate] = [];
      }
      eventsByDay[eventDate].push(event);
      });

      const availableTimesByDay = {};

      // For each day, find available times
      Object.keys(eventsByDay).forEach(date => {
        const events = eventsByDay[date];
        const dayStartTime = toDate(dayStart);
        const dayEndTime = toDate(dayEnd);

        // Sort events for the day by start time
        events.sort((a, b) => toDateObject(a.start) - toDateObject(b.start));

        const availableTimes = [];
        let currentStart = dayStartTime;

        events.forEach(event => {
          const eventStart = toDateObject(event.start);
          const eventEnd = toDateObject(event.end);

          // Check if there is a gap before the current event
          if (currentStart < eventStart) {
            availableTimes.push({
              start: currentStart.toISOString().substring(11, 16),
              end: eventStart.toISOString().substring(11, 16),
            });
          }

          // Update current start time to the end of the current event
          currentStart = eventEnd;

          // If currentStart exceeds the dayEndTime, stop looking for available times
          if (currentStart >= dayEndTime) {
            return;
          }
        });

        // Check if there's available time after the last event
        if (currentStart < dayEndTime) {
          availableTimes.push({
            start: currentStart.toISOString().substring(11, 16),
            end: dayEndTime.toISOString().substring(11, 16),
          });
        }

        availableTimesByDay[date] = availableTimes;
      });

    console.log(availableTimesByDay)
    return {"body": availableTimesByDay}
  }

exports.main = main
