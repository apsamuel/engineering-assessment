import { useState, useEffect } from 'react';
import createTheme from '../data/createTheme';


export default function useTheme (mode = 'dark', userTheme = {}) {

  const themes = createTheme(userTheme, )
  let [theme, setTheme] = useState(mode)

  // eslint-disable-next-line no-unused-vars
  const getThemes = () => {
    return themes.map((theme) => theme.name)
  }


  useEffect(() => {
    setTheme(themes[theme])
  }, [themes, theme,] )


  return {
    theme,
    setTheme
  }
}