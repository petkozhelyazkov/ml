import { useContext, useEffect, useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import Liked from "./Liked";
import Favorite from "./Favorite";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export default function Saved() {
    const [justifyActive, setJustifyActive] = useState();
    const location = useLocation();
    const { user } = useContext(AuthContext)

    useEffect(() => {
        let path = location.pathname
        let element = path.slice(path.lastIndexOf('/') + 1)
        setJustifyActive(element == 'profile' ? 'liked' : element)
    }, [location])

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };


    return (
        <div className="mb-3 h-full w-2/3 flex flex-col items-center bg-gray-800">
            <TETabs justify>
                <TETabsItem
                    onClick={() => handleJustifyClick("liked")}
                    active={justifyActive === "liked"}
                >
                    Liked
                </TETabsItem>
                <TETabsItem
                    onClick={() => handleJustifyClick("favorite")}
                    active={justifyActive === "favorite"}
                >
                    Favorite
                </TETabsItem>
            </TETabs>

            <TETabsContent>
                <TETabsPane show={justifyActive === "liked"}>
                    <Liked data={user?.liked || []} />
                </TETabsPane>
                <TETabsPane show={justifyActive === "favorite"}>
                    <Favorite data={user?.favorite || []} />
                </TETabsPane>
            </TETabsContent>
        </div>
    )
}