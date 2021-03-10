import Document, { Head, Html, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from '../utilities/constants';
import { localEnvironment } from '../utilities/helpers';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    render() {
        return (
        <Html>
            <Head>
                { !localEnvironment() &&
                <>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
                        }}
                    />
                </> }
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