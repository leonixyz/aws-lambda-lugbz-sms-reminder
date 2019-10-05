module.exports.getMessages = () => {

  // define events database
  const events = [
    {
      'date': '2019-11-13T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2019-12-11T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-01-08T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-02-12T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-03-11T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-04-08T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-05-13T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-06-10T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-07-08T17:30:00.000',
      'reminders': [0, 3, 7],
      'topic': 'arn:aws:sns:us-east-1:036986015377:lugbz_sms',
      'title': 'LUGBZ desk in Meran'
    },
    {
      'date': '2020-09-09T17:30:00.000',
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
