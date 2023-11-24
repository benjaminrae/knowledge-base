import React from 'react';

import { Home } from '@mui/icons-material';
import { Breadcrumbs, Container, ContainerProps } from '@mui/material';
import { HeadTitle } from './HeadTitle';

import { NavLink } from 'react-router-dom';
interface PageProps extends ContainerProps {
  breadcrumbs?: ReadonlyArray<{ content?: React.ReactNode; link?: string }>;
  isFlexContainer?: boolean;
  flexDirection?: 'row' | 'column';
  headTitle?: string;
}

export const Page = ({
  breadcrumbs,
  children,
  headTitle,
  ...props
}: PageProps) => (
  <Container sx={{ paddingTop: '20px' }} {...props}>
    {headTitle && <HeadTitle>{headTitle}</HeadTitle>}
    {breadcrumbs?.length && (
      <Breadcrumbs>
        <NavLink to="/">
          <Home />
        </NavLink>
        {breadcrumbs.map(({ content, link }, index) => (
          <NavLink key={index} to={link ?? ''}>
            {content}
          </NavLink>
        ))}
      </Breadcrumbs>
    )}
    {children}
  </Container>
);
