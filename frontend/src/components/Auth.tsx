import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupType } from '@ayush3014/common-app';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export function Auth({ type }: { type: 'signup' | 'signin' }) {
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInputs
      );

      const jwt = response.data;
      console.log(jwt);
      localStorage.setItem('token', JSON.stringify(jwt));

      navigate('/blogs');
    } catch (error) {
      alert('Error while signing up');
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === 'signin'
                ? "Don't have an account? "
                : 'Already have an account? '}
              <Link
                className="pl-1 underline"
                to={type === 'signin' ? '/signup' : '/signin'}
              >
                {type === 'signin' ? 'Sign Up' : 'Sign In'}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === 'signup' ? (
              <LabelledInput
                label="Name"
                placeholder="John Doe"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="johndoe@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={'password'}
              placeholder=""
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === 'signup' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || 'text'}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
