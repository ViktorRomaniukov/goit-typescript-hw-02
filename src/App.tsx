import './modal-config.js';
import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Loader } from './components/Loader/Loader';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { LoadMoreBtn } from './components/LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from './components/ImageModal/ImageModal';
import { searchImages } from './components/photoRequest-api';
import { UnsplashImage } from './components/types/image';

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await searchImages(query, page);
        setImages(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError('Failed to fetch images');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={setSelectedImage} />
      {isLoading && <Loader />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
  <ImageModal
    key={selectedImage.id}
    isOpen={true}
    onRequestClose={() => setSelectedImage(null)}
    image={selectedImage}
  />
)}
    </div>
  );
}

export default App;
