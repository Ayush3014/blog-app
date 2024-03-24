export function FullBlogSkeleton() {
  return (
    <div>
      <div className=" animate-pulse">
        <div className="flex justify-center ">
          <div className="grid grid-cols-12 px-10 w-full mx-10 pt-12 max-w-screen-xl">
            <div className="col-span-8">
              <div className="text-5xl font-extrabold ">
                <div className="h-4 bg-gray-200 max-w-2xl rounded-full mb-4"></div>
                <div className="h-2.5 bg-gray-200  rounded-full w-48 mb-4"></div>
              </div>
              <BlogContentSkeleton padding={4} />
              <BlogContentSkeleton padding={2} />
              <BlogContentSkeleton padding={2} />
            </div>
            <div className="col-span-4">
              <div className="text-slate-600 text-lg">
                <div className="h-2 bg-gray-200 rounded-full mb-1"></div>
              </div>

              <div className="flex ">
                <div className="pr-4 flex flex-col justify-center ">
                  <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                </div>
                <div className="pt-4">
                  <div className="text-xl font-bold">
                    <div className="h-2 bg-gray-200 rounded-full w-48 mb-4"></div>
                  </div>
                  <div className="pt-2 ">
                    <div className="h-2 bg-gray-200 rounded-full w-48 mb-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function BlogContentSkeleton({ padding }: { padding: number }) {
  return (
    <div className={`pt-${padding}`}>
      <div className="h-2 bg-gray-200 max-w-2xl rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 max-w-2xl rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 max-w-2xl rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full w-48 mb-4"></div>
    </div>
  );
}
