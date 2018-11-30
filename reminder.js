module.exports.getMessages = () => {

  // define events database
  const events = [
    {
      'date': '2018-12-12T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-01-09T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-02-13T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-03-13T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-04-10T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-05-08T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-06-12T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-07-10T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-09-11T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    }
  ];

  // helper function to set a date object to noon
  const unsetTime = date => {
    date.setHours(12);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  // helper function to get a human readable string for a reminder value
  const getReminderText = days => {
    switch (days) {
      case 0:
        return 'today';
      case 1:
        return 'tomorrow';
      case 2:
        return 'the day after tomorrow';
      case 7:
        return 'in one week';
      default:
        return `in ${days} days`
    }
  }

  // used for comparison
  const today = unsetTime(new Date());

  // used as a return value for this function
  const messages = [];

  // iterate on all events, and for each reminder check if it's today
  for (let e of events) {
    const event = unsetTime(new Date(e.date));
    for (let r of e.reminders) {
      const reminder = unsetTime(new Date(event.getTime() - (r * 3600 * 24 * 1000)));
      if (today.getTime() === reminder.getTime()) {
        messages.push({
          message: `Reminder: ${getReminderText(r)} will take place the event "${e.title}"`,
          topic: e.topic
        });
      }
    }
  }

  return messages;
}