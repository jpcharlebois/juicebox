import { useEffect, useState } from 'react'
import { fetchPosts, updatePost } from '../api/ajaxHelper'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPostForm({ token }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const [error, setError] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");

        try {
            let updatedPostObj = {
                id: id,
                title: title,
                content: content,
                tags: tags
            }

            let updatedPost = await updatePost(token, updatedPostObj);
            navigate('/posts');
        } catch (error) {
            setError(error);
        }
      }
    
      useEffect(() => {
        async function getPostHandler() {
          const result = await fetchPosts();
          console.log("results: ", result);
          const postResult = result.find((rPost) => rPost.id === Number(id));
          setTitle(postResult.title);
          setContent(postResult.content);
          setTags(postResult.tags);
        }
        getPostHandler();
        // async function getUserHandler() {
        //     if (token) {
        //       const result = await myData(token);
        //       console.log("user data: ", result);
        //       setUser(result);
        //     }
        //   }
        //   getUserHandler();
      }, [])

    return (
    <> 
      <div className='edit-post-form'>
        <h2>Edit Post</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Title: 
                    <input 
                        type='text' 
                        required={true} 
                        minLength={8} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Content: 
                    <input 
                        type='text' 
                        required={true} 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} />
            </label>
            <button>UPDATE</button>
        </form>
      </div>
    </>
    )
}