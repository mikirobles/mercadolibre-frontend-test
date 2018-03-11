import styled from 'styled-components';
import SearchBox from 'components/SearchBox';
import ErrorMessage from 'components/ErrorMessage';
import { styleConstants } from 'helpers/index';

const { colors } = styleConstants;

const LayoutWrapper = styled.div`
    background: ${colors.lightGray};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1em;
    article {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        max-width: 1200px;
        padding: 1em;
    }
`;

export default ({ children, error }) => (
    <LayoutWrapper>
        <SearchBox />
        <article>
            {error ? ErrorMessage({ error }) : null}
            {children}
        </article>
    </LayoutWrapper>
);
