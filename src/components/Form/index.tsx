import React, { useState, useRef, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';

// import { Container } from './styles';
import validate from '../Input/validate';
import Input from '../Input';

interface inputData {
  [key: string]: string;
}

interface IConfigInput {
  inputType?: string;
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  placeholder: string;
  validations: string[];
}

interface IProps {
  handleSubmit: (data: inputData) => void;
  config: IConfigInput[];
}

const Form: React.FC<IProps> = ({ children, handleSubmit, config }) => {
  const [formHasError, setFormHasError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleError = useCallback(
    (value = '', validations: string[]): string => {
      let errorMessage = '';
      validations?.some(type => {
        const error = validate?.[type](value || '');
        if (error?.length > 0) errorMessage = error;
        return !!error;
      });
      return errorMessage;
    },
    [],
  );

  // testar outros tipos de inputs: textarea, number, radio, option etc.
  const getInputValues = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      if (formHasError) return;
      const data: { [key: string]: string } = {};
      const formDom = formRef?.current?.querySelectorAll('input');
      formDom?.forEach(i => {
        data[`${i.name}`] = i.value;
      });
      const hasError = config.some(({ name, validations }) => {
        return !!handleError(data[name], validations);
      });
      if (hasError) {
        setFormHasError(true);
        return;
      }
      handleSubmit(data);
    },
    [config, formHasError, handleError, handleSubmit],
  );

  return (
    <form ref={formRef} onSubmit={e => getInputValues(e)}>
      {config.map(({ inputType, ...input }) => {
        switch (inputType) {
          default:
            return (
              <Input
                {...input}
                handleError={handleError}
                formHasError={formHasError}
              />
            );
        }
      })}
      {children}
    </form>
  );
};

export default Form;
