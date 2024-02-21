import { svg } from "leaflet";
import React from "react";

//<Icon iconName =""/> 

const Icon = ({iconName}) => {
    const icons ={
        
       add: <svg className="add" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" aria-hidden="true" viewBox="0 -960 960 960"><path d="M450.001-450.001h-200q-12.75 0-21.375-8.628-8.625-8.629-8.625-21.384 0-12.756 8.625-21.371 8.625-8.615 21.375-8.615h200v-200q0-12.75 8.628-21.375 8.629-8.625 21.384-8.625 12.756 0 21.371 8.625 8.615 8.625 8.615 21.375v200h200q12.75 0 21.375 8.628 8.625 8.629 8.625 21.384 0 12.756-8.625 21.371-8.625 8.615-21.375 8.615h-200v200q0 12.75-8.628 21.375-8.629 8.625-21.384 8.625-12.756 0-21.371-8.625-8.615-8.625-8.615-21.375v-200Z"/></svg>,
       back: <svg className="back" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill-rule="evenodd" focusable="false" data-icon="close" width="1rem" height="1rem" fill="currentColor" aria-hidden="true"><path d="m127.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L65.078-428.77Q54.23-439.616 49-453.077 43.77-466.539 43.77-480q0-13.461 5.23-26.923 5.231-13.461 16.078-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L127.384-480Z"/></svg>,
       close: <svg className="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill-rule="evenodd" focusable="false" data-icon="close" width="1rem" height="1rem" fill="currentColor" aria-hidden="true"><path d="M480-437.847 277.076-234.924q-8.307 8.308-20.884 8.5-12.576.193-21.268-8.5-8.693-8.692-8.693-21.076t8.693-21.076L437.847-480 234.924-682.924q-8.308-8.307-8.5-20.884-.193-12.576 8.5-21.268 8.692-8.693 21.076-8.693t21.076 8.693L480-522.153l202.924-202.923q8.307-8.308 20.884-8.5 12.576-.193 21.268 8.5 8.693 8.692 8.693 21.076t-8.693 21.076L522.153-480l202.923 202.924q8.308 8.307 8.5 20.884.193 12.576-8.5 21.268-8.692 8.693-21.076 8.693t-21.076-8.693L480-437.847Z"/></svg>,
       lightbulb: <svg className="lightbulb" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-96.924q-30.307 0-52.269-21-21.961-21-23.885-51.307h152.308q-1.924 30.307-23.885 51.307-21.962 21-52.269 21ZM360-224.617q-12.769 0-21.384-8.615-8.615-8.616-8.615-21.384 0-12.769 8.615-21.385 8.615-8.615 21.384-8.615h240q12.769 0 21.384 8.615 8.615 8.616 8.615 21.385 0 12.768-8.615 21.384-8.615 8.615-21.384 8.615H360Zm-23.846-115.384q-62.845-39.077-99.499-102.115Q200.001-505.154 200.001-580q0-116.922 81.538-198.461Q363.078-859.999 480-859.999q116.922 0 198.461 81.538Q759.999-696.922 759.999-580q0 74.846-36.654 137.884-36.654 63.038-99.499 102.115H336.154ZM354-400h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>,
    }
    return(icons[iconName]);
}

export default Icon;