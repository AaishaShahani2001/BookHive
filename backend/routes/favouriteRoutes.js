import express from 'express'
import user from '../models/user.js'
import authenticateToken from '../auth/userAuth.js'

const favouriteRouter = express.Router();

//add book to favourite
favouriteRouter.put("/add-book-to-favourite", authenticateToken, async (req,res)=> {
  try {
    const { bookid, id } = req.headers;
    const userData = await user.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite){
      return res.status(200).json({ message: "Book is already in favourites" });
    }
    await user.findByIdAndUpdate(id, {$push: { favourites: bookid }});
    return res.status(200).json({ message: "Book added to favourites" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })

  }
  
});

//delete book from favourites
favouriteRouter.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    const userData = await user.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);

    if (!isBookFavourite) {
      return res.status(200).json({ message: "Book is not in favourites" });
    }

    //Remove using $pull
    await user.findByIdAndUpdate(id, {
      $pull: { favourites: bookid }
    });

    return res.status(200).json({ message: "Book removed from favourites" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


//get favourite books of a particular user
favouriteRouter.get("/get-favourite-books", authenticateToken, async (req,res)=> {
  try {
    const { id } = req.headers;
    const userData = await user.findById(id).populate("favourites");
    const favouritesBooks = userData.favourites;
    return res.json({ status: "Success", data: favouritesBooks,});
    
  } catch (error) {
    return res.status(500).json({ message: "An error occured" })
  }
  
});


export default favouriteRouter;