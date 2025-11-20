import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard/BookCard";
import Loader from "./Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/book/get-recent-books");
        setData(res.data?.data ?? []);
      } catch (e) {
        console.error("Failed to fetch recent books:", e);
        setErr("Could not load recent books");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mt-14 px-4">
      <h4 className="text-[#F2E8D5] text-3xl font-semibold underline underline-offset-4 decoration-[#8B5E3C]">
        Recently Added Books
      </h4>

      {loading && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}

      {!loading && err && (
        <p className="my-6 text-[#E85A4F]">{err}</p>
      )}

      {!loading && !err && data && data.length === 0 && (
        <p className="my-6 text-[#D7C4A9]">No books yet. Add some to see them here.</p>
      )}

      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {!loading &&
          !err &&
          data &&
          data.map((item, i) => (
            <BookCard key={item?._id || i} data={item} />
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
