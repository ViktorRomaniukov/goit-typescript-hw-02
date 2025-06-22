import styles from './ImageCard.module.css';

interface Image {
  alt_description: string | null;
  urls: {
    small: string;
  };
}

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  const { alt_description, urls } = image;

  return (
    <div className={styles.card} onClick={() => onClick(image)}>
      <img
        src={urls.small}
        alt={alt_description || 'Image'}
        className={styles.image}
        loading="lazy"
      />
    </div>
  );
}