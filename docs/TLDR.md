# TLDR

## Plan

- I read the requirements of the `Estee Challenge`
- I inspected the data source and thought about what questions can be answered with the data, and how we can add value to the existing API
  - What trucks exist in San Francisco
  - Where is each truck?
  - How far away from my is a truck?
  - Searchability (search by food category, vendor, or nearest distance)
  - maybe other things...
  - another way to capture this can be from the request ip
  - what are my favorite trucks?
    - I want to avoid users, but perhaps session cookies can work?
- I can use existing libraries to accelerate the development of an API, UI and CLI.
  - **API** - `express` for quickly defining an API
  - **UI** - using the `vite` framework to create a `react` project. Using `MaterialUI` for component framework.
  - **CLI** - `commander` for accelerating CLI development.

## Development

- I created a **very** simple API for the data source
- I scaffolded the vite project and started to define primary components
  - Focusing on visualizing the data, and I want to add something useful
    - distance!
    - I'm also filtering this data to ensure vendors are approved and have some basic properties set (such as coordinates)
- i used the `./scripts` folder and files as a scratch area, but this became the backbone of the CLI

## Operationalizing

Once I had enough of the assesment working locally, I began working on containerization, first defining the Dockerfiles, and then creating a docker-compose file to orchestrate the total project.

### To Dos

- TODO: refactor the categories column, it feels bad!
- TODO: troubleshoot DataGrid rendering issues when paging
- TODO: move filtering to top level (eg. compileData)
- TODO: get the cli container to persistently run and avoid a dependency of node to use it
- TODO: program the slider/inputs to act on the application state accordingly
