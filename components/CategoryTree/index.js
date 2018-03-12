import styled from 'styled-components';
import { styleConstants } from 'helpers/index';

const { breakpoints } = styleConstants;

const CategoryTreeWrapper = styled.div`
    color: gray;
    margin-bottom: 1em;
    font-size: 0.6em;
    span {
        &:not(:last-child):after {
            content: '>';
            margin-left: 0.5em;
        }
        &:not(:first-child) {
            margin-left: 0.5em;
        }
    }
    @media ${breakpoints.tabletPort} {
        font-size: 0.8em;
    }
`;

export default ({ categories }) => (
    <CategoryTreeWrapper>
        {categories.map(category => <span key={category}>{category}</span>)}
    </CategoryTreeWrapper>
);
