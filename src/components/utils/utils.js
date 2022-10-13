import { showToast } from "../toast/toast";
import { useLocation } from "react-router-dom";

export const handleApi = (res, func) => {
  if (res && res.data) {
    if (func) {
      func(res.data.data);
    }
  } else {
    showToast("Network error", "fail");
  }
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
