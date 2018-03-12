import styled from 'styled-components';
import { styleConstants, formattingHelpers } from 'helpers/index';

const { capitalize, formatMoney } = formattingHelpers;
const { breakpoints, colors } = styleConstants;

const ItemDetailWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: auto;
    background: white;
    border-radius: 5px;
    padding: 1em;
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: 100%;
            max-width: 300px;
            height: 200px;
            margin: 1em;
            object-fit: contain;
        }

        h1 {
            margin: 0.3em 0;
        }
        h2 {
            font-size: 2em;
            sup {
                font-weight: 400;
                margin-left: 0.1em;
            }
        }
        button {
            margin: 1em 0;
            font-size: 1em;
            outline: none;
            border: none;
            background: ${styleConstants.colors.blue};
            color: white;
            padding: 1em 3em;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 0px 1.5px 1px #00000024;
            &:hover {
                background: ${styleConstants.colors.lightBlue};
                box-shadow: none;
            }
        }
    }
    .description {
        border-top: 1px solid ${colors.lightGray};
        padding: 1em;
        > h2 {
            font-weight: 400;
            margin-bottom: 1em;
        }
        img {
            max-width: 100%;
        }
        div {
            white-space: pre-line;
            overflow: hidden;
        }
    }
    @media ${breakpoints.tabletPort} {
        padding: 2em;
        .header {
            flex-direction: row;
            align-items: flex-start;
            padding-bottom: 1em;
            img {
                height: 400px;
            }
            .side-info {
                margin: 2em 0 0 1em;
            }
        }
    }
`;

export default ({ item }) => (
    <ItemDetailWrapper>
        <div className="header">
            <img src={item.picture} alt={item.title} />
            <div className="side-info">
                <p>{`${capitalize(item.condition)} - ${
                    item['sold_quantity']
                } vendidos`}</p>
                <h1>{item.title}</h1>
                <h2>{formatMoney(item.price.amount)}</h2>
                <button>Comprar</button>
            </div>
        </div>
        {item.description ? (
            <section className={'description'}>
                <h2>Descripción del producto</h2>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </section>
        ) : null}
    </ItemDetailWrapper>
);
