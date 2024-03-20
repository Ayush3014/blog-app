import { Avatar } from './BlogCard';

export function Appbar() {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex flex-col justify-center text-lg">Blog App</div>
      <div>
        <Avatar name="User" size="large" />
      </div>
    </div>
  );
}
