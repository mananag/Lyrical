import React  from 'react'
import {Link, withRouter} from 'react-router-dom'
import {useQuery, gql, useMutation} from '@apollo/client'
import query from '../queries/fetchSongs'

const mutation = gql`
    mutation DeleteSong($id : ID){
        deleteSong(id: $id) {
            id
        }
    }
`

function SongList() {
    const { loading, error, data } = useQuery(query);
    const [deleteSong] = useMutation(mutation)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const onSongDelete = (id) => {
        deleteSong({
            variables: {id},
            refetchQueries: [{query}]
        }).then(r =>{

        })
     }

    return (
        <div>
            <ul className={'collection'}>
                {data.songs.map(({ id, title }) => (
                    <li key={id} className={'collection-item'}>
                        <Link to={`/${id}`}>
                            {title}
                        </Link>
                        <i className={'material-icons'}
                           onClick={() => onSongDelete(id)}>
                            delete
                        </i>
                    </li>
                ))}
            </ul>
            <Link to={"/new"} className={'btn-floating btn-large red right'}>
                <i className={'material-icons'}>add</i>
            </Link>
        </div>
    )
}

export default withRouter(SongList)
