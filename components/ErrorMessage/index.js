import styled from 'styled-components';

const ErrorMessageWrapper = styled.div`
    margin: 1em auto;
    padding: 1em;
    background: rgba(255, 88, 93, 0.3);
    border: 1px solid rgba(255, 88, 93, 0.7);
    border-radius: 3px;
    width: 90%;
    max-width: 650px;
`;

export default ({ error }) => (
    <ErrorMessageWrapper>{error}</ErrorMessageWrapper>
);
