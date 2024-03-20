import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string | null;
  };
}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
}
