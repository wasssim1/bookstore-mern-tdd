import React from 'react';
import './App.css';
import Header from "./components/Header";
import BooksSection from "./components/BooksSection";
import UserCartSection from "./components/UserCartSection";

function App() {
    return (
        <div className="App">

            {/*Header*/}
            <Header/>

            <div className="app_content">

                {/*Available Books*/}
                <BooksSection/>

                {/*Borrowed Books*/}
                <UserCartSection/>

            </div>

        </div>
    );
}

export default App;
