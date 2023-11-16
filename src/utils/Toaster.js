import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toaster(message, type='default', autoClose = 2000) {
  toast[type](message, {
    position: "top-right",
    autoClose: autoClose,
    newestOnTop: true,
    theme:'light'
  });
};
export default Toaster;

// position="top-center"
// autoClose={5000}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick={false}
// rtl={false}
// pauseOnFocusLoss
// draggable={false}
// pauseOnHover={false}
// theme="colored"
