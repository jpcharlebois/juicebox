const BASE_URL = `http://localhost:3000/api`;

export async function registerUser(userObj) {
  try {
      const response = await fetch(`${BASE_URL}/users/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": userObj.username,
            "password": userObj.password, 
            "name": userObj.name,
            "location": userObj.location
          })
      });
      const result = await response.json();
      console.log("sign up response: ", result);
      return result.token;
  } catch (error) {
      console.log(error.message);
      throw error;
  }
}

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "username": username,
          "password": password 
      })
    });
    const result = await response.json();
    console.log(result);
    return result.token;
  } catch (err) {
    console.error(err);
  }
}

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const result = await response.json();
    console.log(result);
    return result.users;
  } catch (err) {
    console.error(err);
  }
}

export const fetchPosts = async () => {
  try {
    const FETCH_ALL_POSTS_URL = `${BASE_URL}/posts`
    const response = await fetch(FETCH_ALL_POSTS_URL, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result.posts
  } catch (err) {
    console.error(err);
  }
}

export const makePost = async (token, postObj) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          authorId: postObj.authorId,
          title: postObj.title,
          content: postObj.content,
          tags: postObj.tags
        }
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const updatePost = async (token, postObj) => {
  try {
    const UPDATE_POST_URL = `${BASE_URL}/posts/${postObj.id}`;
    console.log("Update post url: ", UPDATE_POST_URL);
    const response = await fetch(UPDATE_POST_URL, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
          title: postObj.title,
          content: postObj.content,
          tags: postObj.tags
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const deletePost = async (token, id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const fetchTags = async () => {
  try {
    const FETCH_ALL_TAGS_URL = `${BASE_URL}/tags`
    const response = await fetch(FETCH_ALL_TAGS_URL, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result.tags
  } catch (err) {
    console.error(err);
  }
}
