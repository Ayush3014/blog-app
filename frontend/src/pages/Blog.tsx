import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { FullBlog } from '../components/FullBlog';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { Appbar } from '../components/Appbar';
import { jwtDecode } from 'jwt-decode';

export function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || '',
  });

  const token = localStorage.getItem('token');
  const decodedJWT = jwtDecode(token);

  if (loading) {
    return (
      <div>
        <Appbar name={decodedJWT.name || 'Anonymous'} />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
}
