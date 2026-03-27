import React from 'react';
import './FormInput.css';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  textarea = false,
  type = 'text'
}) => {
  return (
    <div className="form-input-group">
      <label className="form-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      {textarea ? (
        <textarea
          className="form-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
        />
      ) : (
        <input
          type={type}
          className="form-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default FormInput;
