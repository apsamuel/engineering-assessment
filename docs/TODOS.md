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
|             control theming             |     leverage existing hooks for exposing theming features     | Development |   ✔️   |
|      distance from truck and user       |                  add distance to UI and CLI                   | Development |   ✅   |
|            Sliders & Inputs             |                   program sliders & inputs                    | Development |   ✅   |
|              CLI container              |          CLI container persistence in docker-compose          |   DevOps    |   ✔   |
|      refactor `categories` column       |                  reformat presentation layer                  | Development |   💻   |
|    review DataGrid rendering issues     |                ~~pagination~~ is rendering poorly                 | Development |   💻   |
|    centralize core filters/mappings     | we should not have to repeat the filters and mappings so much | Development |   💻   |

## Notes

- The Material UI `DataGrid` seems to perform horribly in both chrome & safari
  - after coding up the form interface and adding reactivity to the dataset, updates render atop each other.
  - I initially thought this was a pagination issue, but it is an issue with how the DataGrid refreshes
  - I may explore a different component to display data, but I'll spend some more time looking at this first, I really think a DataGrid provides the perfect "home" view
