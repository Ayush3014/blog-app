import { Appbar } from './Appbar';

export function FullBlog() {
  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-12 px-10 w-full pt-2">
        <div className=" col-span-8">hi</div>
        <div className="col-span-4">hello</div>
      </div>
    </div>
  );
}
