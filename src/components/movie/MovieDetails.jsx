import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function MovieDetails() {
    var { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [])

    return (
        <>
            <div>
                MovieDetails
            </div>
        </>
    )
}