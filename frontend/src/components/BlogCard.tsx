import { Link } from 'react-router-dom';
import { Avatar } from './Avatar';

interface BlogCardType {
  title: string;
  content: string;
  authorName: string;
  publishedDate: string;
  id: string;
}

export function BlogCard({
  title,
  content,
  authorName,
  publishedDate,
  id,
}: BlogCardType) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md">
        <div className="flex">
          <Avatar name={authorName} size="small" />

          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex flex-col justify-center pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 flex flex-col justify-center text-sm">
            {publishedDate}
          </div>
        </div>

        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + '...'}</div>
        <div className="text-sm text-slate-500 font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
      </div>
    </Link>
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
