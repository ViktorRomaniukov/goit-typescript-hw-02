import './modal-config.js';
import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar.jsx';
import { ImageGallery } from './components/ImageGallery/ImageGallery.jsx';
import { Loader } from './components/Loader/Loader.jsx';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage.jsx';
import { LoadMoreBtn } from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import { ImageModal } from './components/ImageModal/ImageModal.jsx';
import { searchImages } from './components/photoRequest-api';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

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

  const handleSearch = newQuery => {
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
