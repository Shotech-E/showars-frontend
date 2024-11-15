const TextInput = ({label, name, value, onChange, placeholder, type="text"}) => {
  return (
    <div>
        <label className="block text-gray-700 text-sm font-medium" htmlFor={name}>
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="add-product-InputCSS"
        />
    </div>
  );
}

export default TextInput
