import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../hooks';

export function Blogs() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Appbar />
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
