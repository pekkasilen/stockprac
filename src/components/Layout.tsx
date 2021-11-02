import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <RootWrapper>
      <h1>{title}</h1> {children}
    </RootWrapper>
  );
};

export default Layout;

const RootWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: gainsboro;
`;
