import styled from 'styled-components';
import React from 'react';
import { styleConstants } from 'helpers/index';

const { colors } = styleConstants;

const SearchBoxWrapper = styled.header`
    background: ${colors.yellow};
    padding: 0.5em;
    width: 100%;
    margin-bottom: 1em;
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
        const { inputValue } = this.state;
        if (inputValue) {
            window.location.replace(`/items?search=${inputValue}`)
        }
    };

    render() {
        return (
            <SearchBoxWrapper>
                <div className="nav-inner">
                    <a href="/">
                        <img
                            className="logo"
                            src="../static/images/Logo_ML@2x.png"
                            alt="Ir a Home"
                        />
                    </a>

                    <div className="input-bar">
                        <input
                            placeholder="Nunca dejes de buscar"
                            type="text"
                            onKeyPress={(e) => {
                                if (e.charCode === 13) this.search()
                            }}
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
