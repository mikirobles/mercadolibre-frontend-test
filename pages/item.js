import Head from 'next/head';
import React from 'react';
import Layout from 'components/Layout';
import ItemDetail from 'components/ItemDetail';
import CategoryTree from 'components/CategoryTree';
import { apiHelpers, formattingHelpers } from 'helpers';
const { handleProps, getBaseApiUrl } = apiHelpers;

export default class extends React.Component {
    static async getInitialProps({ req, res }) {
        try {
            if (req.params.id) {
                return handleProps({
                    pageName: 'item',
                    dataFetchUrl: `${getBaseApiUrl(req)}/items/${
                        req.params.id
                    }`,
                    res,
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
    render() {
        const { item } = this.props.payload;
        return (
            <Layout error={this.props.error}>
                {item ? (
                    <React.Fragment>
                        <Head>
                            <title>
                                {item.title +
                                    ' - ' +
                                    formattingHelpers.formatMoneyPlaintext(
                                        item.price.amount,
                                    ) +
                                    ' en Mercado Libre'}
                            </title>
                        </Head>
                        <CategoryTree categories={item.categories}/>
                        <ItemDetail item={item} />
                    </React.Fragment>
                ) : null}
            </Layout>
        );
    }
}
