/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export const CustomDialog = ({
  handleClose,
  bookAction,
  authors,
  open,
  prevData,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    PaperProps={{
      component: "form",
      onSubmit: (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.price = Number(formJson.price);
        formJson.pages = Number(formJson.pages);
        bookAction(formJson);
      },
    }}
  >
    {prevData ? (
      <DialogTitle>Edit a book</DialogTitle>
    ) : (
      <DialogTitle>Add a book</DialogTitle>
    )}
    <DialogContent>
      {prevData ? (
        <DialogContentText>
          To edit a book, plese enter new information about a book.
        </DialogContentText>
      ) : (
        <DialogContentText>
          To add a book, plese enter information about a book.
        </DialogContentText>
      )}
      <TextField
        required
        margin="dense"
        id="name"
        name="book_name"
        label="Book name"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={prevData ? prevData.book_name : null}
      />
      <TextField
        required
        margin="dense"
        id="name"
        name="price"
        label="Price"
        type="number"
        fullWidth
        variant="standard"
        defaultValue={prevData ? Number(prevData.price.slice(0, -1)) : null}
      />
      <TextField
        required
        margin="dense"
        id="name"
        name="publication"
        label="Publication date"
        type="date"
        fullWidth
        variant="standard"
        defaultValue={prevData ? prevData.publication : "1970-01-01"}
      />
      <TextField
        required
        margin="dense"
        id="name"
        name="pages"
        label="Pages"
        type="number"
        fullWidth
        variant="standard"
        defaultValue={prevData ? prevData.pages : null}
      />
      <InputLabel id="demo-simple-select-label">Author</InputLabel>
      <Select
        sx={{ m: 1, minHeight: 30, width: "100%", ml: 0 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="author_id"
        defaultValue={prevData ? prevData.author_id : null}
      >
        {authors.map((author) => (
          <MenuItem
            key={author.id}
            value={author.id}
          >{`${author.name} ${author.surname}`}</MenuItem>
        ))}
      </Select>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit">Send</Button>
    </DialogActions>
  </Dialog>
);
