import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          'https://bookhive-backend-muz9.onrender.com/api/favourite/get-favourite-books',
          { headers }
        );
        setFavouriteBooks(res?.data?.data ?? []);
      } catch (err) {
        setFavouriteBooks([]);
      }
    };
    fetchFavourites();
  }, []);

  //  Remove item from UI immediately
  const handleRemove = (id) => {
    setFavouriteBooks((prev) => prev.filter((book) => book._id !== id));
  };

  return (
    <>
      {favouriteBooks.length === 0 && (
        <div className='text-yellow-300 h-[100%] text-2xl font-semibold flex items-center justify-center w-full'>
          No Favourite Books
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favouriteBooks.map((item, i) => (
          <div key={i}>
            <BookCard 
              data={item} 
              favourite={true} 
              onRemove={handleRemove}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
