import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`).then((response) => {
      setBlogs(response.data.posts);
      setLoading(false);
    });
  }, []);

  return { loading, blogs };
}

// to get a specific blog with an id and caching it to avoid loading on opening the blog again
export function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog[]>([]);

  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token.jwt,
        },
      })
      .then((response) => {
        console.log(response.data.blog);
        setBlog(response.data.blog);
        setLoading(false);
      });
  }, []);

  return { loading, blog };
}
