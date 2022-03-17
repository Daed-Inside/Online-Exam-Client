import { showToast } from "../toast/toast";

export const handleApi = (res, func) => {
  if (res && res.data) {
    if (res.data.code === 1) {
      if (func) {
        func(res.data.data);
      }
    } else {
      showToast(res.message, "fail");
    }
  } else {
    showToast("Network error", "fail");
  }
};
