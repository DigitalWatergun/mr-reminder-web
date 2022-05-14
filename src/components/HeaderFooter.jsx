import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const HeaderFooter = (props) => {
    const [userState] = useState(props.userState);
    const [user] = useState(props.user);

    return (
        <div className="container">
            <Header userState={userState} user={user} />
            <div className="content">{props.children}</div>
            <Footer />
        </div>
    );
};
