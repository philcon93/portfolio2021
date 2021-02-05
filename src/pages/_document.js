import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    render() {
        return (
        <Html>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                        var storageKey = 'theme';
                        var darkTheme = 'dark';
                        var lightTheme = 'light';
                        var d = document.querySelector('html');
                        var localStorageTheme = null;
                        var localStorageExists = localStorageTheme !== null;

                        function setClassOnDocumentBody(theme) {
                            d.classList.remove(darkTheme, lightTheme);
                            d.classList.add(theme);
                        }
                        try {
                            localStorageTheme = localStorage.getItem(storageKey);
                        } catch (err) {}

                        if (localStorageExists) {
                            localStorageTheme = JSON.parse(localStorageTheme);
                            setClassOnDocumentBody(localStorageTheme);
                        } else {
                            var isDarkMode = d.classList.contains(darkTheme);
                            var theme = isDarkMode ? darkTheme : lightTheme;

                            localStorage.setItem(storageKey, JSON.stringify(theme));
                            setClassOnDocumentBody(theme);
                        }
                        })();
                    `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
        );
    }
}

export default MyDocument;