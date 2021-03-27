import React from "react";
import {gql, useMutation} from "@apollo/client";

const mutation = gql`
    mutation LikeLyric($id : ID!){
        likeLyric(id: $id) {
            id
            likes
        }
    }
`

const LyricsList = (props) => {
    const [likeLyric] = useMutation(mutation)

    const onLike = (id, likes) => {
        likeLyric({
            variables : {id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        }).then()
    }

    const renderLyrics = () => {
        return props.lyrics.map(({ id, content, likes}) => {
            return (
                <li key={id} className={'collection-item'}>
                    {content}
                    <div className={'likes'}>
                        <i className={'material-icons'} onClick={() => onLike(id, likes)}>
                            thumb_up
                        </i>
                        {likes}
                    </div>
                </li>
            )
        })
    }

    return(
        <div>
            <ul className={'collection'}>
                {renderLyrics()}
            </ul>
        </div>
    )
}

export default LyricsList
