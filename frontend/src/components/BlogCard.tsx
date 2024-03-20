interface BlogCardType {
  title: string;
  content: string;
  authorName: string;
  publishedDate: string;
}

export function BlogCard({
  title,
  content,
  authorName,
  publishedDate,
}: BlogCardType) {
  return (
    <div className="p-4 border-b border-slate-200 pb-4">
      <div className="flex">
        <Avatar name={authorName} />

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
  );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full ">
      <span className="font-xs text-gray-300">{name[0]}</span>
    </div>
  );
}
