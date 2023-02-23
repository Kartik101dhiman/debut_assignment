import MUIButton from "../MUIcomponent/MUIButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MUIBox from "../MUIcomponent/MUIBox";

const Confirmmodal = (props) => {
  const { heading, text, openconfirm, handleCloseconfirm } = props;
  console.log("____________", openconfirm);

  // const handleCloseconfirm = () => {
  //   setOpen(false);
  // };
  return (
    <MUIBox>
      <Dialog
        open={openconfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={() => handleCloseconfirm()}>Confirm</MUIButton>
          <MUIButton onClick={() => handleCloseconfirm()} autoFocus>
            Cancel
          </MUIButton>
        </DialogActions>
      </Dialog>
    </MUIBox>
  );
};

export default Confirmmodal;

// export default function AlertDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open alert dialog
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous
//             location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <MUIButton onClick={handleClose}>Disagree</MUIButton>
//           <MUIButton onClick={handleClose} autoFocus>
//             Agree
//           </MUIButton>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
