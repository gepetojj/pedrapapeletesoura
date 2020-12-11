import Document, { Html, Head, Main, NextScript } from "next/document";

class PagesBase extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="pt-br">
                <Head />
                <body className="dark-theme">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default PagesBase;
