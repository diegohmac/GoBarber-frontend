import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button';
import Form from '../../components/Form';
import logoImg from '../../assets/logo.svg';
import {
  Container,
  Content,
  FormContainer,
  Background,
  AnimationContainer,
} from './styles';

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
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: IFormData): Promise<void> => {
      try {
        const response = await api.post('/users', data);
        console.log(response);
        setFormData(data);
        history.push('/signin');
        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode realizar o seu login.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar!',
          description:
            'Ocorreu um erro ao realizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <FormContainer>
            <h1>Faça seu cadastro.</h1>
            <Form handleSubmit={handleSubmit} config={inputsConfig}>
              <Button type="submit">Entrar</Button>
            </Form>
          </FormContainer>
          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
