import React from 'react';
import { Image } from 'react-native';
import logoImg from '../../assets/logo.png';
import { Container, Title } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button
        onPress={() => {
          console.log('oi');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SignIn;
