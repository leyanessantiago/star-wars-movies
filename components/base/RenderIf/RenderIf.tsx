import { FC, ReactNode } from 'react';

interface Props {
  condition: boolean;
  children: ReactNode;
}

export const RenderIf: FC<Props> = ({ condition, children }) => {
  return condition ? children : null;
};
