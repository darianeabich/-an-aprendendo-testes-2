import { Photo } from '../interfaces/photo';


// criação de uma função utilitária p/ criar os dados do teste
export function buildPhotosList(): Photo[] {
  const photos: Photo[] = [];
  for (let i = 0; i < 8; i++) {
    photos.push({
      id: i + 1,
      url: '',
      description: ''
    });
  }
  return photos;
}
