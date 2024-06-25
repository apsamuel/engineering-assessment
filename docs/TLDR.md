# TLDR

## Plan

- I read the requirements of the `Estee Challenge`
- I inspected the data source and thought about what questions can be answered with the data, and how we can **add value** to the existing API
  - Map/Viz?
    - I need to look into what's available, hopefully something that's free
    - what trucks exist in San Francisco
    - where is each truck?
  - Info
    - how far away from me is the truck?
  - Searchability
    - (search by food category, vendor, or nearest distance)
  - what are my favorite trucks?
    - I want to avoid users, but perhaps session cookies can work?
    - we can use the rating component in MUI, this will need to be coded appropriately
- I can use existing libraries to accelerate the development of an API, UI and CLI.
  - **API** - `express` for quickly defining an API
  - **UI** - using the `vite` framework to create a `react` project. Using `MaterialUI` for component framework.
  - **CLI** - `commander` for accelerating CLI development.

## Development

- I created a **very** simple API for the data source
  - I wanted to have control over representation of the data
    - I want to use my own simpified searching/sorting/mapping algorithms
- I scaffolded a new vite react project and started to define primary components
  - Data component took/taking the most time, mainly as a result of how to present the data with pagination
  - Focusing on visualizing the data, and I want to add something useful
    - distance!
    - I'm also filtering this data to ensure vendors are approved and have some basic properties set (such as coordinates)
- i used the `./scripts` folder and files as a scratch area, but this became the backbone of the CLI

## Operations

Once I had enough of the assesment working locally, I began working on containerization, first defining the Dockerfiles, and then creating a docker-compose file to orchestrate the total project.

I wanted to run the CLI container persistently, but ran into some issues that may be related to the ENTRYPOINT/CMD or base container configuration. I decided it's not totally neccesary, and documented the steps to using the containerized CLI tool.
