This project is a skinny web interface for a the Alogila API that provides the ability to edit and delete records from a single Algolia index.

## Use case

This project can be used to provide a branded experience for the Algolia service and is intended for non-technical use. All commands here can be manually run throught he Algolia API or Algolia's own interface, but this simplifies the process for a marketing team.

More advanced use cases such should consider a microservice approach.

## Running the project

- Clone repository
- Create environmental files e.g. copy .env.example to .env.local and copy cypress.env.json.example to eypress.env.json
- Add existing Alogila keys to environmental files
- Install dependencies `yarn install`
- Build server `yarn build`
- Start server `yarn start`

## TODO

- Some utility styles provided by tailwind. Remove these in favour of MUI as having two styling solutions is confusing.
- Provide image load placeholder for images
- Add Form Validation using react-hook-form and Yum
- Add a little description to the top (or in a fab) of the app to explain how to use it
- Add feedback alerts for API responses to inform user of action
- Add message queue using Redis or similar to track state of jobs that have been pushed to Algolia server (see below)

### Algolia caching

Jobs that have been edited or deleted don't instantly reflect on page reload as they are queued by the algolia service. It would be ideal to implement a message queue that tracked the algolia message queue. Failing that, deleted records should be added to a message queue and cleared out at the expected algolia processing rate interval

## Things to consider

Hooks are co-located with context. It may be more readable to split context, provider and hook into individual files. However, the trade-off is maintainability as types, and params can easily be updated from one file. Consider complexity of feature. If feature is too complex, it may be worth splitting the logic into a different feature entirely.
