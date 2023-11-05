// components/Gallery.tsx
import React, { useState } from 'react';
import DraggableImage from './DraggableImage';
import { ImageType } from '../types/ImageType';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageType[]>([
    ...Array.from({ length: 10 }, (_, i) => ({
      id: i,
      url: `/images/image-${i + 1}.webp`,
      selected: false, // add selected property to track which images are selected
    })),
  ]);

  const moveImage = (dragIndex: number, hoverIndex: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const dragImage = newImages[dragIndex];
      newImages[dragIndex] = newImages[hoverIndex];
      newImages[hoverIndex] = dragImage;
      return newImages;
    });
  };

  // Toggle image selection
  const toggleSelectImage = (id: number) => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id ? { ...img, selected: !img.selected } : img
      )
    );
  };

  // Delete selected images
  const deleteSelectedImages = () => {
    setImages((prevImages) => prevImages.filter((img) => !img.selected));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-8">
        <div className='flex justify-between w-4/5 m-2'>
        <h1 className="text-4xl font-bold font-mono mb-4 ml-4">Image Gallery</h1>
        <button
          onClick={deleteSelectedImages}
          className="mb-4 mr-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Selected
        </button>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
          {images.map((image, index) => (
            <DraggableImage
              key={image.id}
              index={index}
              id={image.id}
              src={image.url}
              isFirst={index === 0}
              isSelected={image.selected}
              moveImage={moveImage}
              toggleSelectImage={toggleSelectImage}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Gallery;
