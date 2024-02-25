import { FC } from 'react';
import { RadioButton } from '@/components/base';

interface RadioButtonGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string, value: string }[];
}

export const RadioButtonGroup: FC<RadioButtonGroupProps> = (props) => {
  const { onChange, name, value, options } = props;

  return (
    <div className="flex flex-wrap justify-between">
      {options.map((option, index) => (
        <RadioButton
          key={index}
          label={option.label}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};
