import express from 'express'
import user from '../models/user.js'
import authenticateToken from '../auth/userAuth.js'

const cartRouter = express.Router();

//put book to cart
cartRouter.put("/add-to-cart", authenticateToken, async (req,res)=> {
  try {
    const { bookid, id } = req.headers;
    const userData = await user.findById(id);
    const isBookinCart = userData.cart.includes(bookid);
    if (isBookinCart) {
      return res.json({ status: "Success", message: "Book is already in cart",});
    }

    await user.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    return res.json({ status: "Success", message: "Book added to cart",});
    
  } catch (error) {
    return res.status(500).json({ message: "An error occured" })
  }
  
});

//remove book from cart
cartRouter.put("/remove-from-cart/:bookid", authenticateToken, async (req,res)=> {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await user.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    
  return res.json({ status: "Success", message: "Book removed from cart",});
    
  } catch (error) {
    return res.status(500).json({ message: "An error occured" })
  }
  
});

//get cart of a partculart user
cartRouter.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
      const { id } = req.headers;
      const userData = await user.findById(id).populate("cart");
      const cart = userData.cart.reverse();
      return res.json({ status: "Success", data: cart,});
      
    } catch (error) {
      return res.status(500).json({ message: "An error occured" })
    }
})


export default cartRouter;