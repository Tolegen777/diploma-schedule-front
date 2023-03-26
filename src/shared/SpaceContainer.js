import { Space } from 'antd';
import styled from 'styled-components'

export const SpaceContainer = styled(Space)`
  width: 100%;
`;

SpaceContainer.defaultProps = {
    direction: 'vertical',
    size: 'large'
}
