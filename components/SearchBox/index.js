import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { styleConstants } from 'helpers/index';

const { colors } = styleConstants;

const SearchBoxWrapper = styled.header`
    background: ${colors.yellow};
    box-shadow: 0 0 1px #00000024;
    padding: 0.5em;
    width: 100%;
    .nav-inner {
        width: 100%;
        max-width: 800px;
        margin: auto;
        display: flex;
        justify-content: center;
    }
    .logo {
        height: 39px;
        margin-right: 1em;
    }
    .input-bar {
        width: 100%;
        height: 39px;
        display: flex;
        box-shadow: 0px 1.5px 1px #00000024;
        input {
            width: 100%;
            height: 39px;
            padding: 0 1em;
            font-size: 1em;
            border: none;
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
        }
        button {
            height: 39px;
            padding: 0.5em 1em;
            border: none;
            background: ${colors.lightGray};
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            img {
                width: 17px;
            }
        }
    }
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.initialValue || '',
            canSearch: false,
            loading: false
        };
    }

    onInputChange = e => {
        this.setState({
            inputValue: e.target.value,
            canSearch: !!e.target.value
        });
    };

    search = () => {
        this.setState({
            loading: true
        });
        const { inputValue } = this.state;
        if (inputValue) {
            Router.push(`/items?search=${inputValue}`);
        }
    };

    render() {
        return (
            <SearchBoxWrapper>
                <div className="nav-inner">
                    <a href="/">
                        <img
                            className="logo"
                            src="https://tocklify.sirv.com/mercadolibre/Logo_ML%402x.png"
                            alt="Ir a Home"
                        />
                    </a>
                    <div className="input-bar">
                        <input
                            placeholder="Nunca dejes de buscar"
                            type="text"
                            onKeyPress={e => {
                                if (e.charCode === 13) this.search();
                            }}
                            onChange={this.onInputChange}
                            value={this.state.inputValue}
                        />
                        <button onClick={this.search}>
                            {!this.state.loading ? (
                                <img
                                    src="https://tocklify.sirv.com/mercadolibre/ic_Search%402x.png"
                                    alt="Buscar"
                                />
                            ) : (
                                <img
                                    src="https://tocklify.sirv.com/mercadolibre/tail-spin.svg"
                                    alt="Cargando..."
                                />
                            )}
                        </button>
                    </div>
                </div>
            </SearchBoxWrapper>
        );
    }
}
