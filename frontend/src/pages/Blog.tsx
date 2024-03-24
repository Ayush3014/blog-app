import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { FullBlog } from '../components/FullBlog';
import { Appbar } from '../components/Appbar';
import { jwtDecode } from 'jwt-decode';
import { FullBlogSkeleton } from '../components/FullBlogSkeleton';

export interface MyToken {
  id: string;
  name: string;
}

export function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || '',
  });

  const token = localStorage.getItem('token');
  if (token) {
    const decodedJWT = jwtDecode<MyToken>(token);

    if (loading) {
      return (
        <div>
          <Appbar name={decodedJWT.name || 'Anonymous'} />
          <div className="flex justify-center ">
            <div className="w-full">
              <FullBlogSkeleton />
            </div>
          </div>
        </div>
      );
    }

    if (blog !== null) {
      return (
        <div>
          <Appbar name={decodedJWT.name || 'Anonymous'} />
          <FullBlog blog={blog} />
        </div>
      );
    }
  }
}
