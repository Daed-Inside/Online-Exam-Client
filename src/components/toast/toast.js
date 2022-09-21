import "./toast.css";

function Toast() {
  return (
    <>
      <div id="toast"></div>
    </>
  );
}

export function showToast(msg, status) {
  let classStatus = "success";
  switch (status) {
    case "success":
      classStatus = "success";
      break;
    case "fail":
      classStatus = "failed";
      break;
    case "warning":
      classStatus = "warning";
    default:
      break;
  }

  let toast = document.createElement("div");
  toast.className = `toast_item ${classStatus}`;
  toast.innerHTML = `
        <span>${msg}</span>
        <span class="countdown"></span>
    `;
  document.querySelector("#toast").appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "hide_slide 2s ease forwards";
  }, 4000);
  setTimeout(() => {
    toast.remove();
  }, 6000);
}

export default Toast;
