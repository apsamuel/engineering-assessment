import { useEffect, useState } from 'react';
// import { parse } from 'path';

export default function useImage(fileName) {
  const parse = (fileName) => {
    const parts = fileName.split('/')
    const dir = parts.slice(0, -1).join('/')
    const base = parts.at(-1).split('.').at(0)
    const ext = parts.at(-1).split('.').at(-1)

    return {
      dir,
      parts,
      base,
      ext
    }
  }
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const assetRoot = '../assets/images';
  fileName = `${assetRoot}/${fileName}`;
  useEffect(() => {
    const loadImage = async () => {
      try {
        if (!fileName) return;
        if (!loading && !image) {
          const { base, } = parse(fileName);
          const imageAsset = (await import(`../assets/images/${base}.svg`)).default;
          // TEST: can we load this asset as a component using the svg loader?
          setImage(imageAsset);
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false);
      }
    }
    loadImage();
  }, [fileName, image, loading])

  return { loading, error, image };
}