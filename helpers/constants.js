const STYLE_VARS = {
    colors: {
        yellow: '#fff159',
        lightGray: '#eee'
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
        smartphoneMediumLandscape: 'only screen and (min-device-width: 41.688em)',
        smartphoneSmallLandscape: 'only screen and (min-device-width: 35.500em)',
        smartphoneBig: '(min-width: 25.000em)',
        smartphoneMedium: '(min-width: 23.375em)',
        smartphoneSmall: '(max-width: 20.000em)',
    }
}

const API_CONFIG = {
    getSearchItemsUrl: ({query}) => `https://api.mercadolibre.com/sites/MLA/search?q=${query}`,
    getItemDetailsUrl: ({itemId}) => `https://api.mercadolibre.com/items/${itemId}`,
    getItemDescriptionUrl: ({itemId}) => `https://api.mercadolibre.com/items/${itemId}/description`,
}

module.exports = {
    STYLE_VARS,
    API_CONFIG
}