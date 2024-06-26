# To Dos

| Icon |          Meaning           |
| :--: | :------------------------: |
|  💻  |        In Progress         |
|  ✔️  |        Work-Around         |
|  ✅  |            Done            |
|  🤣  | Over Committed / Not Doing |

|                  TODO                   |                          Description                          |  Category   | Status |
| :-------------------------------------: | :-----------------------------------------------------------: | :---------: | :----: |
| store preferences to session cookie/etc |                    mocking "user" settings                    | Development |   💻   |
|             control theming             |     leverage existing hooks for exposing theming features     | Development |   ✅   |
|      distance from truck and user       |                  add distance to UI and CLI                   | Development |   ✅   |
|            Sliders & Inputs             |                   program sliders & inputs                    | Development |   ✅   |
|              CLI container              |          CLI container persistence in docker-compose          |   DevOps    |   ✔    |
|    ~~refactor `categories` column~~     |                ~~reformat presentation layer~~                | Development |   ✅   |
|    review DataGrid rendering issues     |              ~~pagination~~ is rendering poorly               | Development |   ✅   |
|    centralize core filters/mappings     | we should not have to repeat the filters and mappings so much | Development |   💻   |

## Notes about items on TO DO

- About DataGrid
  - The Material UI `DataGrid` component seems to perform horribly in both chrome & safari, and is pretty buggy
    - I am using the community version, there are 2 paid variants I haven't tried
    - After coding up the `Form` component interface and linking reactivity to the `Data` components display, updates or data refreshes render atop each other.
      - more specifically, page 0 is always displayed under any refreshed data!
        - I have a clue as to why, any it is related to the inner workings of the react component. An event is overfiring, or some state is not being correctly managed.
          - This may be a result of how the data set is presented. On mount, we fetch the full list of trucks and work with that data. I may need to review more carefully how I am handling/filtering the data in the component
        - I initially thought this was a pagination issue, but it is an issue with how the DataGrid refreshes
        - I may explore a different component to display data, but I'll spend some more time looking at this first, I really think a DataGrid provides the perfect "home" view
          - interesting, with theme toggling enabled, this improves some, but not much, will loop back around.
        - resolved. I was using react-router-doms browser router, and had specified the `<App>` component twice. Removing the duplicate entry fixed everything.
- About category refactor
  - this is actually not that bad, spacing could be improved, and the initial parsing of categories needs some work.
    - various edge cases in the data make the simple regex/splitting fail silently, leaving long sentences for categories where simple words are expected (hamburgers, mexican food, lobster rolls, etc.)
