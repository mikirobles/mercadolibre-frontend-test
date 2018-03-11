import styled from 'styled-components';
import React from 'react';
import { STYLE_VARS } from 'helpers/constants';

const { colors } = STYLE_VARS;

const SearchBoxWrapper = styled.header`
    background: ${colors.yellow};
    padding: 0.5em;
    .nav-inner {
        width: 100%;
        max-width: 1200px;
        margin: auto;
        display: flex;
        justify-content: center;
    }
    .logo {
        height: 39px;
        margin-right: 1em;
    }
    .input-bar {
        width: 60%;
        height: 39px;
        display: flex;
        input {
            width: 100%;
            height: 39px;
            padding: 1em;
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
    constructor() {
        super();
        this.state = {
            inputValue: '',
        };
    }

    onInputChange = e => {
        this.setState({
            inputValue: e.target.value,
        });
    };

    search = () => {
        alert(this.state.inputValue);
    };

    render() {
        return (
            <SearchBoxWrapper>
                <div className="nav-inner">
                    <img
                        className="logo"
                        src="../static/images/Logo_ML@2x.png"
                        alt="Mercado Libre"
                    />
                    <div className="input-bar">
                        <input
                            placeholder="Nunca dejes de buscar"
                            type="text"
                            onChange={this.onInputChange}
                            value={this.state.inputValue}
                        />
                        <button onClick={this.search}>
                            <img
                                src="../static/images/ic_Search@2x.png"
                                alt="Buscar"
                            />
                        </button>
                    </div>
                </div>
            </SearchBoxWrapper>
        );
    }
}
