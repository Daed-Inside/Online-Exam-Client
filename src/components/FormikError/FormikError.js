import "./FormikError.css";

export function FormikError(errors, name) {
  console.log("errors", errors);
  return (
    <div className="error-box">
      <div className="triangleError"></div>
      <div className="index-error">{errors[name]}</div>
    </div>
  );
}
