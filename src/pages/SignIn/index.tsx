import React, { useState, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

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
  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IFormData): Promise<void> => {
      try {
        const { email, password } = data;
        await signIn({ email, password });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login, verifique as credenciais.',
        });
      }
    },
    [signIn, addToast],
  );

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
