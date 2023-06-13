This project is a skinny web interface for a the Alogila API that provides the ability to edit and delete records from a single Algolia index.

## Use case

This project can be used to provide a branded experience for the Algolia service and is intended for non-technical use. All commands here can be manually run throught he Algolia API or Algolia's own interface, but this simplifies the process for a marketing team.

More advanced use cases such should consider a microservice approach.

## Running the project

- Clone repository
- Create environmental files e.g. copy .env.example to .env.local
- Add existing Alogila keys to environmental files
- Install dependencies `yarn install`
- Start server `yarn start`
