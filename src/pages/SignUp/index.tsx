import React, { useState } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Button from '../../components/Button';
import Form from '../../components/Form';

import logoImg from '../../assets/logo.svg';
import { Container, Content, FormContainer, Background } from './styles';

interface IFormData {
  [key: string]: string;
}

const inputsConfig = [
  {
    name: 'name',
    icon: FiUser,
    placeholder: 'Nome',
    validations: ['required'],
  },
  {
    name: 'email',
    icon: FiMail,
    placeholder: 'E-mail',
    validations: ['required', 'email'],
  },
  {
    inputType: 'password',
    name: 'password',
    icon: FiLock,
    placeholder: 'Senha',
    validations: ['password'],
  },
];

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({});

  const handleSubmit = (data: IFormData): void => {
    setFormData(data);
  };

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <FormContainer>
          <h1>Faça seu cadastro.</h1>
          <Form handleSubmit={handleSubmit} config={inputsConfig}>
            <Button type="submit">Entrar</Button>
          </Form>
        </FormContainer>
        <a href="login">
          <FiArrowLeft />
          Voltar para login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
