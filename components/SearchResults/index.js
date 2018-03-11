import styled from 'styled-components';
import React from 'react';
import { styleConstants, formattingHelpers } from 'helpers/index';

const { colors, breakpoints } = styleConstants;

const SearchResultsWrapper = styled.ul`
    width: 100%;
    max-width: 800px;
    margin: auto;
    font-size: 14px;
    a {
        color: inherit;
        text-decoration: none;
        &:hover {
            color: gray;
        }
    }
    .product {
        background: white;
        margin: 0 1em;
        padding: 1em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        --border-radius: 5px;
        &:first-child {
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
        }
        &:last-child {
            border-bottom-left-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
        }
        &:not(:last-child) {
            border-bottom: 1px solid ${colors.lightGray};
        }
        .img-container {
            width: 30%;
            height: 100%;
            margin: 0.5em;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .details {
            width: 100%;
            margin: 0.5em;
            .price {
                //margin: 0.5em 0 0.2em 0;
                font-size: 2em;
                font-weight: 600;
                margin-bottom: 0.3em;
                sup {
                    font-weight: 400;
                    margin-left: 0.1em;
                }
                &.free-shipping {
                    span {
                        position: relative;
                    }
                    span:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        right: -35px;
                        transform: translateY(-50%);
                        width: 25px;
                        height: 25px;
                        background: url(../static/images/ic_shipping@2x.png)
                            center center no-repeat;
                        background-size: contain;
                    }
                }
            }
            h1 {
                font-weight: 200;
                letter-spacing: 1px;
            }
        }
    }
    @media ${breakpoints.tabletPort} {
        .product {
            align-items: left;
            .details {
                margin: 0.5em 0 0 1em;
                .price {
                    margin: 1em 0 0.5em 0;
                }
            }
        }
    }
`;

export default ({ results }) => (
    <SearchResultsWrapper>
        {results.map(product => (
            <li key={product.id} className="product">
                <div className="img-container">
                    <a href={`/items/${product.id}`}>
                        <img
                            src={
                                product.picture ||
                                'https://resources.mlstatic.com/search-images/nopic_es160x160.gif'
                            }
                            alt={`Imagen de ${product.title}`}
                        />
                    </a>
                </div>
                <div className="details">
                    <a href={`/items/${product.id}`}>
                        <div
                            className={`price ${
                                product['free_shipping'] ? 'free-shipping' : ''
                            }`}
                            aria-label={
                                product['free_shipping'] ? 'Envío gratis' : ''
                            }
                        >
                            <span>
                                {formattingHelpers.formatMoney(
                                    product.price.amount,
                                )}
                            </span>
                        </div>
                    </a>
                    <a href={`/items/${product.id}`}>
                        <h1>{product.title}</h1>
                    </a>
                </div>
            </li>
        ))}
    </SearchResultsWrapper>
);
