import { Appbar } from './Appbar';
import { BlogInterface } from '../hooks';
import { Avatar } from './Avatar';

export function FullBlog({ blog }: { blog: BlogInterface }) {
  return (
    <div>
      <Appbar name={blog.author.name} />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full mx-10 pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on 2nd January 2024
            </div>
            <div className=" pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="large" name={blog.author.name || 'Anonymous'} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || 'Anonymous'}
                </div>
                <div className="pt-2 text-slate-500">Catchphrase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
