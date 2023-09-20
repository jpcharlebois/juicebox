import { useState } from 'react'
import { makePost, registerUser } from '../api/ajaxHelper'
import { useNavigate } from 'react-router-dom'

export default function AddNewPostForm({ token }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");

        try {
            let newPostObj = {
                title,
                content,
                tags
            }

            let newPost = await makePost(token, newPostObj);
            navigate('/posts');
        } catch (error) {
            setError(error);
        }
      }

    return (
    <> 
      <div className='new-post-form'>
        <h2>Add New Post</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Title: 
                    <input 
                        type='text' 
                        required={true} 
                        minLength={3} 
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
            <button>CREATE</button>
        </form>
      </div>
    </>
    )
}