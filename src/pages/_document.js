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
                        var storageKey = 'dark';
                        var classNameDark = 'dark';
                        var classNameLight = 'light';
                        var d = document.querySelector('html');
                        var localStorageTheme = null;
                        var localStorageExists = localStorageTheme !== null;

                        function setClassOnDocumentBody(dark) {
                            d.classList.add(dark ? classNameDark : classNameLight);
                            d.classList.remove(dark ? classNameLight : classNameDark);
                        }
                        try {
                            localStorageTheme = localStorage.getItem(storageKey);
                        } catch (err) {}

                        if (localStorageExists) {
                            localStorageTheme = JSON.parse(localStorageTheme);
                        }
                        if (localStorageExists) {
                            setClassOnDocumentBody(localStorageTheme);
                        } else {
                            var isDarkMode = d.classList.contains(classNameDark);
                            localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
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