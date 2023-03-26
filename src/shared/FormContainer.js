import { Card } from 'antd'
import styled from 'styled-components'

export const FormContainer = styled(Card)`
  margin: 0 auto;
  border: none;
  background-color: ${props => props.bg_color || 'unset'};
  border-radius: 16px;
  padding: ${props => props.drawer === 'true' ? 'unset' : '5px 32px'};
  min-width: ${props => props.drawer === 'true' ? 'unset' : '420px'};
  .ant-card-body {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: ${props => props.drawer === 'true' ? 'unset' : '25px'};
    padding: 0;
  }
`;

export const FormButtonWrapper = styled.div`
    display: flex;
    gap: 15px;
    padding: 30px 0;
`
