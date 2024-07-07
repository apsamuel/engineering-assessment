import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import * as Colors from '@mui/material/colors';
// const custom = (theme) => {
//   return {
//     patterns: {
//       gridLines: (size, granularity, thickness, gap) => {
//         return {
//           background: [
//             `conic-gradient(at ${gap} ${thickness}, ${theme.palette.primary.contrastText})
//               calc( (${size}/${granularity} - ${gap} + ${thickness}) /2 )
//             `
//           ]
//         }
//       },
//       linear: null,
//     }
//   }
// }
const darkTheme = responsiveFontSizes(
  createTheme({
    mode: 'dark',
    components: {
      DataGrid: {
        styleOverrides: {
          root: {
            // backgroundColor: '#F00909'
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#5C5353',
            maxHeight: '33%',
            fontSize: '0.5rem'
          }

        }
      }
    },
    menu: {
      '& .MuiPaper-root': {
      }

    },
    mixins: {
      MuiDataGrid: {}
    },
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
        paper: '#000000'
      },
      primary: {
        light: '#9E9DB6',
        main: '#2B2A2A',
        dark: '#101010',
        contrastText: '#8E8181'
      },
      secondary: {
        light: '#737C97',
        main: '#615F8C',
        dark: '#2B2768',
        contrastText: '#696161'
      }
    },
    custom: {
      patterns: {
        // eslint-disable-next-line no-unused-vars
        linear: (theme) => {
          return {
            background: [
              `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            ].join(',')
          }
        }
      }
    },

  })
);

const lightTheme = responsiveFontSizes(
  createTheme({
    mode: 'light',
    components: {
      DataGrid: {
        styleOverrides: {
          root: {
            // backgroundColor: '#F00909'
          }
        }
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#5C5353',
            maxHeight: '33%',
            fontSize: '0.5rem'
          }

        }
      }
    },
    menu: {
      '& .MuiPaper-root': {
      }

    },
    mixins: {
      MuiDataGrid: {}
    },
    palette: {
      mode: 'light',
      // background: {
      //   default: Colors.grey[50],
      //   paper: Colors.grey[50]
      // },
      // primary: {
      //   light: Colors.grey[300],
      //   main: Colors.grey[50],
      //   dark: Colors.grey[500],
      //   contrastText: '#000'
      // },
      // secondary: {
      //   light: '#61B5FF',
      //   main: '#57A1E1',
      //   dark: '#2C5172',
      //   contrastText: '#000'
      // }
    },
    custom: {
      patterns: {
        linear: (theme) => {
          return {
            background: [
              `linear-gradient(90deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            ].join(',')
          }
        }
      }
    },

  })
);

export { darkTheme, lightTheme };