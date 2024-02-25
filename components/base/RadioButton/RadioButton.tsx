import { FC, ChangeEvent } from 'react';

interface RadioButtonProps {
  label: string;
  name: string;
  checked: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const RadioButton: FC<RadioButtonProps> = (props) => {
  const { label, checked, onChange, name, value } = props;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={label}
        value={value}
        name={name}
        checked={checked}
        onChange={handleInputChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={label}
        className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};
