import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  validations: string[];
  formHasError: boolean;
  handleError: (value: string, validations: string[]) => string;
}

const Input: React.FC<InputProps> = ({
  name,
  validations,
  icon: Icon,
  formHasError,
  handleError,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    const inputValue = inputRef?.current?.value || '';
    let error = '';
    if (handleError) error = handleError(inputValue, validations);
    error ? setErrorMessage(error) : setErrorMessage('');
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, [handleError, validations]);

  useEffect(() => {
    if (formHasError) {
      inputRef?.current?.focus();
      inputRef?.current?.blur();
    }
  }, [formHasError]);

  return (
    <Container
      hasError={!!errorMessage}
      isFocused={isFocused}
      isFilled={isFilled}
    >
      {Icon && <Icon size={20} />}
      <input
        name={name}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleInputBlur}
        {...props}
      />
      {errorMessage && (
        <Error text={errorMessage}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
