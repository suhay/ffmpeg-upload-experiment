import * as React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player'

export interface Video {
  id: number
  name: string
  v240p: string
  v480p: string
  v1080p: string
  v4k: string
}

interface VideoData {
  Video: Video
}

interface VideoVars {
  id: number
}

const VIDEO = gql`
  query Video($id: Int!) {
    Video(id: $id) {
      id
      name
      v240p
      v480p
      v1080p
      v4k
    }
  }
`

const View = () => {
  const [version, setVersion] = React.useState('')

  const { id } = useParams();
  const { loading, data } = useQuery<VideoData, VideoVars>(
    VIDEO,
    { variables: { id: parseInt(id) } }
  );

  React.useEffect(() => {
    if (data && version === '') {
      setVersion(data.Video.v480p)
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <>
          <h3>Video Viewer</h3>
          <p>Loading ...</p>
        </>
      ) : (
        <div>
          {data &&
            <>
              <h3>{data.Video.name}</h3>
              <ReactPlayer url={version} controls={true} />
              <ul>
                <li>{data.Video.v240p ? <button onClick={() => setVersion(data.Video.v240p)}>240p</button> : '240p - Processing...'}</li>
                <li>{data.Video.v480p ? <button onClick={() => setVersion(data.Video.v480p)}>480p</button> : '480p - Processing...'}</li>
                <li>{data.Video.v1080p ? <button onClick={() => setVersion(data.Video.v1080p)}>1080p</button> : '1080p - Processing...'}</li>
                <li>{data.Video.v4k ? <button onClick={() => setVersion(data.Video.v4k)}>4k</button> : '4k - Processing...'}</li>
              </ul>
            </>
          }
        </div>
      )}
    </div>
  )
}

export default View
