import { useState, useEffect } from 'react';
import createTheme from '../data/createTheme';


export default function useTheme (mode = 'dark', userTheme = {}) {

  const themes = createTheme(userTheme, )
  let [theme, setTheme] = useState(mode)

  const getThemes = () => {
    return themes.map((theme) => theme.name)
  }

  console.log('themes: ', getThemes())

  useEffect(() => {
    setTheme(themes[theme])
  }, [themes, theme,] )


  return {
    theme,
    setTheme
  }
}