import React from "react";
import  {useQuery} from '@apollo/client'
import query from "../queries/fetchSong";
import {Link, withRouter} from "react-router-dom";

import LyricsCreate from "./LyricsCreate";
import LyricsList from "./LyricsList";

const SongDetails = (props) => {
    const {loading, error, data} = useQuery(query, {
        variables : { id : props.match.params.id }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <Link to={'/'}>
                Back
            </Link>
            <h3>
                {data.song.title}
                {console.log(data)}
            </h3>
            <LyricsList lyrics = {data.song.lyrics} />
            <LyricsCreate songId={props.match.params.id} />
        </div>
    )
}

export default withRouter(SongDetails)
