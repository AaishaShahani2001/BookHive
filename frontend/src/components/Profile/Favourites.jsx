import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import DeleteConfirm from "../DeleteConfirm.jsx";
import { useSnackbar } from "notistack";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const headersBase = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          'https://bookhive-backend-muz9.onrender.com/api/favourite/get-favourite-books',
          { headers: headersBase }
        );
        setFavouriteBooks(res?.data?.data ?? []);
      } catch (err) {
        setFavouriteBooks([]);
      }
    };
    fetchFavourites();
  }, []);

  // 1️⃣ Open confirm popup instead of removing instantly
  const askDelete = (id) => {
    setSelectedBookId(id);
    setOpenDelete(true);
  };

  // 2️⃣ Actually remove from backend + UI AFTER confirm
  const confirmDelete = async () => {
    try {
      await axios.put(
        'https://bookhive-backend-muz9.onrender.com/api/favourite/remove-book-from-favourite',
        {},
        { headers: { ...headersBase, bookid: selectedBookId } }
      );

      // Remove from UI
      setFavouriteBooks((prev) =>
        prev.filter((book) => book._id !== selectedBookId)
      );

      enqueueSnackbar("Book removed from favourites", { variant: "success" });
      setOpenDelete(false);
      setSelectedBookId(null);
    } catch (err) {
      enqueueSnackbar("Failed to remove from favourites", { variant: "error" });
      setOpenDelete(false);
    }
  };

  return (
    <>
      {favouriteBooks.length === 0 && (
        <div className='text-yellow-300 h-[100%] text-2xl font-semibold flex items-center justify-center w-full'>
          No Favourite Books
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favouriteBooks.map((item) => (
          <div key={item._id}>
            <BookCard 
              data={item} 
              favourite={true} 
              onRemove={() => askDelete(item._id)}   // 🔴 ONLY opens popup now
            />
          </div>
        ))}
      </div>

      {/* CONFIRM DELETE POPUP */}
      <DeleteConfirm
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
        title="Remove from favourites?"
        message="Do you want to remove this book from your favourites?"
      />
    </>
  );
};

export default Favourites;
