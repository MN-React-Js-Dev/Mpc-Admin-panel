import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { Modal, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  marginRight:'5%',
  bgcolor: "background.paper",
  border: "1px solid gray",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px 5px 5px 5px",
};

export const CheckOrderStatus = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setData(data);
    if (submitted && data) {
      setOpen(true);
    }
    // console.log("DATA~~>>>", data);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome to My Print Clothes
            </Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "5%",
          }}
        >
          <TextField
            required={false}
            id="outlined-required"
            name="data"
            label="Order ID"
            placeholder="Enter Order ID Here"
            value={data || ""}
            type="number"
            onChange={(e) => setData(e.target.value)}
          />
          {submitted && !data && (
            <label class="error" for="basic-icon-default-email">
              <b>Order ID is required!</b>
            </label>
          )}
          <Button variant="contained" type="submit" className="m-2">
            Submit
          </Button>
        </div>
      </form>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex" style={{justifyContent:'space-between'}}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              fontWeight="700"
              component="h2"
            >
              <u>Order Information for: {data} </u>
            </Typography>

            <Typography
              id="modal-modal-title"
              variant="h6"
              fontWeight="700"
              component="h2"
              onClick={handleClose}
              style={{cursor:'pointer'}}
            >
              ✖ 
            </Typography>
          </div>

          <div className="d-flex justify-space-between">
            <Typography sx={{ mt: 2 }}>
              <b>→</b>
            </Typography>
            <Typography sx={{ mt: 2 }}>Order Name :</Typography>

            <Typography sx={{ mt: 2, ml: 2 }}>Flower Pink Dupptta</Typography>
          </div>

          <div className="d-flex justify-space-between">
            <Typography sx={{ mt: 2 }}>
              <b>→</b>
            </Typography>
            <Typography sx={{ mt: 2 }}>Order Name :</Typography>

            <Typography sx={{ mt: 2, ml: 2 }}>Flower Pink Dupptta</Typography>
          </div>

          <div className="d-flex justify-space-between">
            <Typography sx={{ mt: 2 }}>
              <b>→</b>
            </Typography>
            <Typography sx={{ mt: 2 }}>Order Name :</Typography>

            <Typography sx={{ mt: 2, ml: 2 }}>Flower Pink Dupptta</Typography>
          </div>

          <div className="d-flex justify-space-between">
            <Typography sx={{ mt: 2 }}>
              <b>→</b>
            </Typography>
            <Typography sx={{ mt: 2 }}>Order Name :</Typography>

            <Typography sx={{ mt: 2, ml: 2 }}>Flower Pink Dupptta</Typography>
          </div>

          <div className="d-flex justify-space-between">
            <Typography sx={{ mt: 2 }}>
              <b>→</b>
            </Typography>
            <Typography sx={{ mt: 2 }}>Order Name :</Typography>

            <Typography sx={{ mt: 2, ml: 2 }}>Flower Pink Dupptta</Typography>
          </div>
        </Box>
      </Modal>
    </>
  );
};
