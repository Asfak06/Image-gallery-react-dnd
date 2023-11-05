// components/DraggableImage.tsx
import { ItemTypes } from '@/types/ItemTypes';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

type DraggableImageProps = {
  src: string;
  index: number;
  id: number;
  isFirst: boolean;
  isSelected: boolean;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  toggleSelectImage: (id: number) => void;
};

const DraggableImage: React.FC<DraggableImageProps> = ({
  src,
  index,
  id,
  isFirst,
  isSelected,
  moveImage,
  toggleSelectImage,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.IMAGE,
    drop(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex !== hoverIndex) {
        moveImage(dragIndex, hoverIndex);
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // ...hover logic
      console.log(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.IMAGE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),

  });

  drag(drop(ref));

  

  return (
    <>
      <div
        ref={ref}
        className={`cursor-grab rounded relative border-4 ${
          isSelected ? 'border-blue-500' : 'border-gray-300'
        } ${isFirst ? 'col-span-2 row-span-2' : 'col-span-1'} ${
          isDragging ? 'opacity-50' : 'opacity-100'
        } transition-opacity duration-300 ease-in-out`}
        onClick={() => toggleSelectImage(id)}
      >
        <img
          src={src}
          className="transform transition-transform duration-300 ease-in-out hover:scale-105"
          draggable="false"
        />
        {isFirst && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white py-1 px-3 text-xs font-bold rounded">
            Featured
          </div>
        )}
        <div
          className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out font-semibold"
        >
          {isSelected ? 'Unselect/Drag Image' : 'Select/Drag Image'}
        </div>
      </div>
    </>
  );
};

export default DraggableImage;
