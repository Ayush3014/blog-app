import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';

export function Appbar({ name }: { name: string }) {
  return (
    <div className="border-b flex justify-between px-10 py-4 ">
      <Link
        to={'/blogs'}
        className="flex flex-col justify-center text-2xl font-bold cursor-pointer"
      >
        Blog App
      </Link>
      <div>
        <Link to={'/publish'}>
          <button
            type="button"
            className=" mr-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
        </Link>

        <Avatar name={name} size="large" />
      </div>
    </div>
  );
}
