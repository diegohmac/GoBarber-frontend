import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  text: string;
  className?: string; // é necessário essa tipagem para que o Container do tooltip possar herdar outras estilizações.
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, className }) => {
  return (
    <Container className={className}>
      {children}
      <span>{text}</span>
    </Container>
  );
};

export default Tooltip;
