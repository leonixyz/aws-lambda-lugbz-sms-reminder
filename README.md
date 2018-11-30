# AWS λ function to send reminders for events

Reads a list of events each one having one or more reminders and publishes a message to a SNS topic. The topic should pre-exist.

Created using the [Serverless framework](https://serverless.com/).

## Setup

1. `npm install`
2. `serverless deploy`
