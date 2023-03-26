import styled from 'styled-components';

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const TableActionsWrapper = ({ children }) => (
    <ActionsWrapper>
        { children }
    </ActionsWrapper>
)
