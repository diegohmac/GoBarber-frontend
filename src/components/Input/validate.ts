interface ValidateAttributes {
  [key: string]: (value: string) => string;
}

const isRequired = (value: string): string => {
  if (value.length <= 0) {
    return 'Campo obrigatório.';
  }
  return '';
};

const isEmail = (value: string): string => {
  if (!/^\S+@\S+\.\S{2,}$/i.test(value)) {
    return 'E-mail inválido.';
  }
  return '';
};

const isPassword = (value: string): string => {
  if (value.length < 6) {
    return 'Mínimo de 6 caracteres.';
  }
  return '';
};

const validate: ValidateAttributes = {
  required: isRequired,
  email: isEmail,
  password: isPassword,
};

export default validate;
