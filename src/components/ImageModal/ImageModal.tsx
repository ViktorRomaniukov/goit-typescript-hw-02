import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { UnsplashImage } from '../types/image';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: UnsplashImage;
}

export function ImageModal({ isOpen, onRequestClose, image }: ImageModalProps) {
  if (!image) return null;

  const {
    urls,
    alt_description,
    user,
    likes,
    description,
  } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <button className={styles.closeBtn} onClick={onRequestClose}>
        &times;
      </button>
      <img
        src={urls.regular}
        alt={alt_description ?? 'Image'}
        className={styles.image}
      />
      <div className={styles.info}>
        <p><strong>Author:</strong> {user.name}</p>
        {description && <p><strong>Description:</strong> {description}</p>}
        <p><strong>Likes:</strong> {likes}</p>
      </div>
    </Modal>
  );
}