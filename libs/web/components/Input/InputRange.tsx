import React, { ReactElement, useEffect, useState } from 'react';
import InputIcon from './InputIcon';
import { NumericFormat } from 'react-number-format';

interface IValueRange {
  valueFrom: string | number;
  valueTo: string | number;
}

interface IProps {
  placeholder?: {
    from: string;
    to: string;
  };
  value?: IValueRange;
  onChangeText?: (range: IValueRange) => void;
  icon?: ReactElement;
}

export function InputRange({
  placeholder,
  value,
  onChangeText,
  icon,
}: IProps) {
  const [inputValues, setInputValues] = useState<IValueRange>(value);
  useEffect(() => {
    setInputValues(value);
  }, [value]);
  
  const handleRange = () => {
    let range = [inputValues.valueFrom, inputValues.valueTo];
    if (range[0] && range[1]) {
      if (Number(range[0]) > Number(range[1])) {
        [range[0], range[1]] = [range[1], range[0]];
      }
    }
    let newValue = {
      valueFrom: range[0],
      valueTo: range[1],
    };
    setInputValues(newValue);
    onChangeText(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRange()
    }
  };

  const isAllowed = (values) => {
    const { floatValue } = values;
    return floatValue < 1000000 || !floatValue;
  };

  return (
    <div className="flex items-center gap-4 md:flex-wrap sm:flex-wrap">
      <NumericFormat 
        customInput={InputIcon}
        icon={icon}
        value={inputValues?.valueFrom}
        placeholder={placeholder?.from}
        onValueChange={(val) => setInputValues({
          ...inputValues,
          valueFrom: val.value,
        })}
        onBlur={handleRange}
        onKeyDown={handleKeyDown}
        className="md:w-4/5 sm:w-4/5"
        allowNegative={false}
        decimalScale={2}
        thousandSeparator=","
        valueIsNumericString
        isAllowed={(values) => {
          const { floatValue } = values;
          return floatValue < 1000000 || !floatValue;
        }}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-2 rounded-sm border-gray-500" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-gray-500"/>
        </div>
      </div>
      <NumericFormat 
        customInput={InputIcon}
        icon={icon}
        value={inputValues?.valueTo}
        placeholder={placeholder?.to}
        onValueChange={(val) => setInputValues({
          ...inputValues,
          valueTo: val.value,
        })}
        onBlur={handleRange}
        onKeyDown={handleKeyDown}
        className="md:w-4/5 sm:w-4/5"
        allowNegative={false}
        decimalScale={2}
        thousandSeparator=","
        valueIsNumericString
        isAllowed={isAllowed}
      />
    </div>
  );
}

export default InputRange;
