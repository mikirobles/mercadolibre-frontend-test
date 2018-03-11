import styled from 'styled-components'
import { STYLE_VARS } from 'helpers/constants'

const { colors } = STYLE_VARS

const LayoutWrapper = styled.div`
  background: ${colors.lightGray};
  min-height: 100vh;
`

export default ({ children }) => <LayoutWrapper>
    {children}
</LayoutWrapper>