export const getImageFromJSON = (image: string) => {
  try {
    // console.log(JSON.parse(image).src)
    return 'https://drimo.dev-2-tech.ru:4321/' + JSON.parse(image).src
  } catch (e) {
    console.error('Неправильный формат изображения, нужен JSON')
    return ''
  }
}