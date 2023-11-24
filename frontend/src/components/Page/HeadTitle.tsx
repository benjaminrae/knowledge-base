import { Helmet } from 'react-helmet';

type HeadTitleProps = {
  children?: string;
};

export const HeadTitle = ({ children }: HeadTitleProps) => {
  return (
    <Helmet>
      <title>KnowledgeBase | {children}</title>
    </Helmet>
  );
};
