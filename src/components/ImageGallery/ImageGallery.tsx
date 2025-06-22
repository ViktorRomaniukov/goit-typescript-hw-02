import styles from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { UnsplashImage } from '../types/image';

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

export function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <ul className={styles.gallery}>
      {images.map(image => (
        <li key={image.id} className={styles.item}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
}