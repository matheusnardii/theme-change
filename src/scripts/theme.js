export const themeChange = () => {
    const button = document.querySelector(".header__btn");
    
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const html = document.querySelector("html");
        
        if(button.classList.contains("header__btn")){
            button.classList.toggle("header__btn--dark-mode");
        };
        
        const darkMode = html.classList.toggle("dark-mode");
        const dark = JSON.stringify(darkMode);
        
        localStorage.setItem("@OpenMusic:theme", dark);

    });

};

export const verifyTheme = () => {
    const button = document.querySelector(".header__btn");
    const darkMode = JSON.parse(localStorage.getItem("@OpenMusic:theme"));

    const html = document.querySelector("html");

    if(darkMode){
        html.classList.add("dark-mode");
        button.classList.add("header__btn--dark-mode");
    };
};

// themeChange();
// verifyTheme();
