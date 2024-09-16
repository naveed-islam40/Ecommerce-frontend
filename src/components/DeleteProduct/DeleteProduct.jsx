import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./deleteProduct.css";
import { getProductData } from "../../action/action";
import { useDispatch, useSelector } from "react-redux";

const DeleteProduct = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getProductData(id));
  }, [id, dispatch]);

  const { product } = useSelector((state) => state.productDetail);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePage = () => {
    navigate(`/delete/success/${id}`);
  };
  return (
    <div className="deleteProductParent">
      <div className="productDetail">
        {product && (
          <div>
            <img
              src={product.images && product.images[0]?.url}
              alt={product.name}
              className="deleteImgPic"
            />
            <div className="delContent">
              <p className="delImgName">Name: {product.name}</p>
              <p className="delImgName">Price: ${product.price}</p>
              <p className="delStock">Stock: {product.stock}</p>
            </div>
          </div>
        )}
      </div>
      <div className="delBtn">
        <React.Fragment>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            className="delButton"
          >
            Confirm Delete
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                const email = formJson.email;
                console.log(email);
                handleClose();
              },
            }}
          >
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To Delete this Product, please enter your email address here.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email Address for Permanent Delete"
                type="email"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={deletePage}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </div>
  );
};

export default DeleteProduct;
