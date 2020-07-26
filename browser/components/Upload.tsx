import * as React from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom'
import { Video } from './View'

interface VideoData {
  Videos: Video[]
}

const CREAT_VIDEO = gql`
  mutation CreateVideo($name: String!, $file: String!) {
    CreateVideo(name: $name, file: $file) {
      id
      name
    }
  }
`;

const VIDEOS = gql`
  query {
    Videos {
      id
      name
    }
  }
`

const Upload = () => {
  const [name, setName] = React.useState('')
  const [uploading, setUploading] = React.useState(false)

  const { loading, data: videos } = useQuery<VideoData>(
    VIDEOS,
  );

  const [uploadVideo, { error, data }] = useMutation(CREAT_VIDEO)

  return (
    <>
      <form>
        Title: <input type="text" name="name" onChange={e => setName(e.target.value)} />
        <br />
        <input name="document" type="file" disabled={name === ''} onChange={({target: { files }}) => {
          setUploading(true)
          uploadVideo({ variables: { name, file: files[0].name } })
        }} />
      </form>
      {!data && uploading && (<div>Uploading, please wait...</div>)}
      {data && (<div>
        Your file is being processed, you can monitor its status, and view it, at: <Link to={`/watch/${data.CreateVideo.id}`}>{data.CreateVideo.name}</Link>
      </div>)}

      {videos && (
        <section>
          <h2>Previously Uploaded Videos</h2>
          <ul>
            {videos.Videos.map((vid, i) => <li key={i}><Link to={`/watch/${vid.id}`}>{vid.name}</Link></li>)}
          </ul>
        </section>
      )}
    </>
  )
}

export default Upload
