import { useEffect } from "react";
import Header from "../components/Header";
import "../styles/globals.css";

function App({ Component, pageProps }) {
    useEffect(() => {
        const themeHandler = document.getElementsByTagName("body")[0];
        changeTheme(localStorage.getItem("theme"), themeHandler);

        window.addEventListener("storage", (event) => {
            if (event.key === "theme") {
                changeTheme(event.newValue, themeHandler);
            }
        });
        window.addEventListener("keyup", (event) => {
            if (
                event.isTrusted === true &&
                event.key === "q" &&
                event.ctrlKey === true
            ) {
                switch (localStorage.getItem("theme")) {
                    case "dark-theme":
                        changeTheme("light-theme", themeHandler);
                        break;
                    case "light-theme":
                        changeTheme("dark-theme", themeHandler);
                        break;
                    default:
                        break;
                }
            }
        });
    });

    const changeTheme = (theme, themeHandler) => {
        const themes = ["dark-theme", "light-theme"];
        if (!themes.includes(theme)) {
            localStorage.setItem("theme", themes[0]);
            themeHandler.setAttribute("class", themes[0]);
        } else {
            localStorage.setItem("theme", theme);
            themeHandler.setAttribute("class", theme);
        }
    };

    return (
        <div>
            <Header />
            <Component {...pageProps} />
        </div>
    );
}

export default App;
