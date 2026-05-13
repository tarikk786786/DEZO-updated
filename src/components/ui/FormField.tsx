import React from 'react';

export const FormField = ({ label, id, type = "text", value, onChange, placeholder, options, required = false, className = "" }: any) => {
  return (
    <div className={`mb-4 w-full ${className}`}>
      <label htmlFor={id} className="block text-xs font-bold text-main-dark uppercase tracking-widest mb-1.5">
        {label} {required && <span className="text-[var(--primary)]">*</span>}
      </label>
      {type === "select" ? (
        <select 
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-main-light border border-main-light rounded-xl px-4 py-3 text-sm text-main-dark focus:outline-none focus:border-[var(--primary)] smooth-transition"
        >
          {options?.map((opt: any, i: number) => (
            <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className="w-full bg-main-light border border-main-light rounded-xl px-4 py-3 text-sm text-main-dark focus:outline-none focus:border-[var(--primary)] smooth-transition resize-none"
        />
      ) : (
        <input 
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-main-light border border-main-light rounded-xl px-4 py-3 text-sm text-main-dark focus:outline-none focus:border-[var(--primary)] smooth-transition"
        />
      )}
    </div>
  );
};
