import React, { useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Button from '../../components/Button';
import Form from '../../components/Form';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, FormContainer } from './styles';

interface IFormData {
  [key: string]: string;
}

const inputsConfig = [
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
    validations: ['required'],
  },
];

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({});

  const handleSubmit = (data: IFormData): void => {
    setFormData(data);
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <FormContainer>
          <h1>Faça seu logon</h1>
          <Form handleSubmit={handleSubmit} config={inputsConfig}>
            <Button type="submit">Entrar</Button>
          </Form>
          <a href="forgot">Esqueci minha senha</a>
        </FormContainer>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
