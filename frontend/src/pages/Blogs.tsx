import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useBlogs } from '../hooks';
import { jwtDecode } from 'jwt-decode';
import { MyToken } from './Blog';

export function Blogs() {
  const { loading, blogs } = useBlogs();
  const token = localStorage.getItem('token');

  if (token) {
    const decodedJWT = jwtDecode<MyToken>(token);
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
        <Appbar name={decodedJWT.name || 'Anonymous'} />
        <div className="flex justify-center ">
          <div className="">
            {blogs.map((blog) => {
              return (
                <div>
                  <BlogCard
                    title={blog.title}
                    content={blog.content}
                    authorName={blog.author.name || 'Anonymous'}
                    publishedDate={'20th March 2024'}
                    id={blog.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
