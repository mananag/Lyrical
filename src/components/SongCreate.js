import React from "react";
import {gql,  useMutation} from "@apollo/client"
import {Link,  useHistory} from "react-router-dom";
import query from '../queries/fetchSongs'
import {withRouter} from "react-router-dom"


const mutation = gql`
    mutation AddSong($title : String!){
        addSong(title: $title) {
            title
        }
    }
`

function SongCreate() {
    const history = useHistory()
    let input;
    const [addSong ] = useMutation(mutation);

    return (
        <div>
            <Link to={'/'}>Back</Link>
            <h3>
                Create a New Song
            </h3>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    console.log(input.value)
                    addSong({
                        variables: { title: input.value },
                        refetchQueries: [{query}]
                    })
                        .then(() => {
                        history.push('/')
                    })
                        .catch((e) => {
                        console.log(e)
                    });
                    input.value = '';
                }}
            >
                <label htmlFor={'addSong'}>
                    Song Title:
                </label>
                <input
                    ref={node => {
                        input = node;
                    }} id={'addSong'}
                    required={true}
                />
                <button type="submit" >Add Todo</button>

            </form>
        </div>
    );
}


export default withRouter(SongCreate)
