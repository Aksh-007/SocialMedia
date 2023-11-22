/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
// import PropTypes from "prop-types";

// prop type
// TextInput.propTypes = {
//   placeholder: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   styles: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   labelStyles: PropTypes.string.isRequired,
//   register: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   error: PropTypes.string.isRequired,
// };
const TextInput = React.forwardRef(
  (
    { type, placeholder, styles, label, labelStyles, register, name, error },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            aria-invalid={error ? "true" : "false"}
          />
        </div>
        {error && <span className="text-xs text-[#f64949fe]">{error}</span>}
      </div>
    );
  }
);

export default TextInput;
