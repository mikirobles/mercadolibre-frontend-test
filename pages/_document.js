import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props =>
            sheet.collectStyles(<App {...props} />),
        );
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    render() {
        return (
            <html>
                <Head>
                    <link rel="dns-prefetch" href=" " />
                    <link rel="preconnect" href=" " />

                    <title>Mercado Libre Test</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <style
                        dangerouslySetInnerHTML={{
                            __html:
                                '* {margin:0;padding:0;-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} div, input, button{box-sizing:border-box}',
                        }}
                    />
                    {this.props.styleTags}

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/images/favicon/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/images/favicon/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/images/favicon/favicon-16x16.png"
                    />
                    <link
                        rel="manifest"
                        href="/static/images/favicon/manifest.json"
                    />
                    <link
                        rel="mask-icon"
                        href="/static/images/favicon/safari-pinned-tab.svg"
                        color="#ff6b00"
                    />
                    <link
                        rel="shortcut icon"
                        href="/static/images/favicon/favicon.ico"
                    />
                    <meta
                        name="msapplication-config"
                        content="/static/images/favicon/browserconfig.xml"
                    />
                    <meta name="theme-color" content="#ffffff" />

                    <meta name="format-detection" content="telephone=no" />
                    <meta httpEquiv="x-rim-auto-match" content="none" />

                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#81489c" />

                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black"
                    />
                    <meta
                        name="apple-mobile-web-app-title"
                        content="Mercado Libre Test"
                    />
                    <meta
                        name="msapplication-TileImage"
                        content="Mercado Libre Test"
                    />
                    <meta name="msapplication-TileColor" content="#000000" />
                    <meta
                        name="description"
                        content="Test de Front End hecho para Mercado Libre"
                    />
                    <meta name="keywords" content="mercado libre, test" />
                    <meta name="author" content="http://micaelrobles.com" />
                    <meta property="fb:app_id" content="" />
                    <meta
                        property="og:title"
                        content="Mercado Libre Test"
                    />
                    <meta
                        property="og:site_name"
                        content="Mercado Libre Test"
                    />
                    <meta property="og:url" content="" />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:description"
                        content="Test de Front End hecho para Mercado Libre"
                    />
                    <meta property="og:locale " content="es_LA" />
                    <meta property="og:image" content=" " />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:site" content=" " />
                    <meta
                        name="twitter:creator"
                        content="http://micaelrobles.com"
                    />
                    <meta
                        name="msapplication-config"
                        content="/static/images/icons/browserconfig.xml"
                    />
                    <meta name="theme-color" content="#81489c" />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
