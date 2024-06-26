# Process

## Plan

- I read the requirements of the challenge
- I inspected the data source
  - what **`questions can be answered`** with the available data
  - how we can **`add value`** to the existing API
- I thought about how this may eventually be packaged and delivered (containers)

## Brainstorm

- *Searchability*
  - (search by food category, vendor, or nearest distance)
- *Maps & Visualization*
  - I need to look into what's available, hopefully something that's free
- *Preferences & Favorites*
  - I want to avoid creating users, but perhaps we can leverage session cookies to store preferences
    - we can use the rating component in MUI, this will need to be coded appropriately
  - I checked a few yelp reviews for these trucks, and they exist!
    - this implies we know how to search yelp, parse the interesting data, and render it in app somehow. 🤨
      - i would need to tokenize the truck name to a string which is lowercased, has spaces replaced by '-' and stripped of non alphanumeric characters, and append 'san-francisco'
      - Philz Coffee Truck reviews can be found in yelp as [Philz Coffee Truck](https://www.yelp.com/biz/philz-coffee-truck-san-francisco)

- Use existing libraries to accelerate the development of APIs, UIs and CLIs.
  - **API** => `express` for quickly defining an API
  - **UI** => using the `vite` framework to create a `react` project. Using `MaterialUI` for component framework.
  - **CLI** => `commander` for accelerating CLI development

## Develop

- I created a **very** simple API for the data source
  - I wanted to have control over representation of the data
    - I want to use my own simpified searching/sorting/mapping algorithms
- I scaffolded a new vite react project and started to define primary components
  - Data component took/taking the most time, mainly as a result of how to present the data with pagination
  - Focusing on visualizing the data, and I want to add something useful
    - distance!
    - I'm also filtering this data to ensure vendors are approved and have some basic properties set (such as coordinates)
- i used the `./scripts` folder and files as a scratch area, but this became the backbone of the CLI

## Operate

Once I had enough of the assesment working locally, I began working on containerization, first defining the Dockerfiles, and then creating a docker-compose file to orchestrate the total project.

I wanted to run the CLI container persistently, but ran into some issues that may be related to the ENTRYPOINT/CMD or base container configuration. I decided it's not totally neccesary, and documented the steps to using the containerized CLI tool.
