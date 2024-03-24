import { ChangeEvent, useState } from 'react';
import { Appbar } from '../components/Appbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { MyToken } from './Blog';

export function Publish() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  if (token) {
    const decodedJWT = jwtDecode<MyToken>(token);
    return (
      <div>
        <Appbar name={decodedJWT.name || 'Anonymous'} />
        <div className="flex justify-center w-full pt-8">
          <div className="max-w-screen-lg w-full">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Title"
              required
            />
            <TextEditor
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button
              onClick={async () => {
                const tokenString = localStorage.getItem('token');
                const token = tokenString ? JSON.parse(tokenString) : null;
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + token.jwt,
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              type="submit"
              className=" inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-3xl focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border rounded">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <textarea
              onChange={onChange}
              cols={10}
              rows={10}
              className="focus:outline-none block w-full px-0 rounded-lg text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
