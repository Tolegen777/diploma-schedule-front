import styled from 'styled-components';

export const PreviewCard = styled.div`
  width: 50%;
  height: 100vh;
  background: url(${props => props.image}) 100%;
  background-size: cover;
`;
