import React from "react";
import {gql, useMutation} from "@apollo/client";

const mutation = gql`
    mutation AddLyricToSong($content : String!, $songId : ID!){
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics{
                id
                content
            }
        }
    }
`

const LyricsCreate = (props) => {
    let input;
    const [ addLyricToSong ] = useMutation(mutation);


    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                console.log(input.value)
                addLyricToSong({
                    variables: {
                        songId: props.songId,
                        content: input.value
                    },
                })
                    .then(() => {

                    })
                    .catch((e) => {
                        console.log(e)
                    });
                input.value = '';
            }}>
                <label>
                    Add a Lyric
                </label>
                <input
                    ref={node => {
                        input = node;
                    }} id={'addSong'}
                    required={true}
                />
            </form>
        </div>
    )
}

export default LyricsCreate
