import axios from 'axios';
import accounting from 'accounting';

export const styleConstants = {
    colors: {
        yellow: '#fff159',
        lightGray: '#eee',
        blue: '#3483fa',
        lightBlue: '#3483fad6'
    },
    breakpoints: {
        small: 'only screen and (max-width: 20em)',
        medium: 'only screen and (min-width: 49em)',
        desktopBig: '(min-width: 106.250em)',
        desktopMedium: '(min-width: 92em)',
        laptopBig: '(min-width: 90em)',
        laptopPc: '(mix-width: 86em)',
        laptopSmall: '(min-width: 70.000em)',
        tabletLand: '(min-width: 63.938em)',
        tabletPort: '(min-width: 47em)',
        smartphoneBigLandscape: 'only screen and (min-width: 40em)',
        smartphoneMediumLandscape:
            'only screen and (min-device-width: 41.688em)',
        smartphoneSmallLandscape:
            'only screen and (min-device-width: 35.500em)',
        smartphoneBig: '(min-width: 25.000em)',
        smartphoneMedium: '(min-width: 23.375em)',
        smartphoneSmall: '(max-width: 20.000em)',
    },
};

export const apiHelpers = {
    handleProps: async ({ dataFetchUrl, pageName, res }) => {
        const apiFetch = await axios.get(dataFetchUrl);
        return {
            page: pageName,
            payload: apiFetch.data,
            error: apiFetch.data.error,
        };
    },
    getBaseApiUrl: req => `${req.protocol}://${req.get('host')}/api`,
};

export const formattingHelpers = {
    capitalize: str =>
        str
            .split(' ')
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(' '),
    formatMoney: amount => {
        const [int, decimals] = accounting.formatMoney(amount).split('.');
        return (
            <React.Fragment>
                {int}
                {decimals !== '00' ? <sup>{decimals}</sup> : null}
            </React.Fragment>
        );
    },
    formatMoneyPlaintext: amount => accounting.formatMoney(amount)
};
