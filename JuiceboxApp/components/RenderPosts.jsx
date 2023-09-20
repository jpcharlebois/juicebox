import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchPosts } from '../api/ajaxHelper';

export default function RenderPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  function postMatches(post, text) {
    // return true if any of the fields you want to check against include the text
    // strings have an .includes() method
    if (post.title.includes(text)) {
      return true;
    } else if (post.content.includes(text)) {
      return true;
    }
    return false;
  }
  
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  const handleChange = async (e) => {
    setSearchTerm( e.target.value )
  }

  function deleteHandler(id) {
    deletePost(token, id);
    navigate(`/posts`);
  }

  function renderPosts() {
    console.log("posts: ", postsToDisplay);
    return postsToDisplay.map((post) => {
      return (
        <div key={post.id} className="post" >
          <h2>{post.title}</h2>
          <h4>{post.content}</h4>
          <h4>{post.active}</h4>
          {renderTags(post.tags)}
          <>
            <button onClick={() => navigate(`/posts/editPost/${post.id}`)}>EDIT</button>
            <button onClick={() => deleteHandler(post.id)}>DELETE</button>
          </>
        </div>
      )
    })
  }

  function renderTags(tags) {
    console.log("tags: ", tags);
    return tags.map((tag) => {
      return (
        <div key={tag.id} className="tag" >
          <h5>{tag.name}</h5>
        </div>
      )
    })
  }
  
  useEffect(() => {
    async function getPostsHandler() {
      const result = await fetchPosts();
      console.log("results: ", result);
      setPosts(result);
    }
    getPostsHandler();

  }, [])

  return (
    <div>
      <div>
        <h2>Posts</h2>
        { (token) ?
        <Link to={`/posts/addNewPost`}>ADD POST</Link> :
        <p></p>
        }
      </div>
      <div className='searchbar'>
        <form>
          <label>Search
            <input onChange={handleChange} value={searchTerm} type="search"/>
          </label>
        </form>
      </div>
      <div>
        {renderPosts()}
      </div>
    </div>
  )
}