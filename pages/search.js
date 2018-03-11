import Head from 'next/head';
import Layout from 'components/Layout';
import SearchResults from 'components/SearchResults';
import { formattingHelpers, apiHelpers } from 'helpers';
const { handleProps, getBaseApiUrl } = apiHelpers;
const { capitalize } = formattingHelpers;

export default class extends React.Component {
    static async getInitialProps({ req, res }) {
        try {
            if (req.query.search) {
                return {
                    ...(await handleProps({
                        pageName: 'search',
                        dataFetchUrl: `${getBaseApiUrl(req)}/items?q=${
                            req.query.search
                        }`,
                        res,
                    })),
                    searchInput: req.query.search,
                };
            } else {
                res.redirect('/');
            }
        } catch (err) {
            console.error(err);
        }
    }
    render() {
        return (
            <Layout error={this.props.error}>
                <Head>
                    <title>{`${capitalize(
                        this.props.searchInput,
                    )} en Mercado Libre`}</title>
                </Head>
                <SearchResults results={this.props.payload.items} />
            </Layout>
        );
    }
}
