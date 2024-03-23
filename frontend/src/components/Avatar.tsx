export function Avatar({
  name,
  size,
}: {
  name: string;
  size: 'small' | 'large';
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === 'small' ? 'w-6 h-6' : 'w-10 h-10'
      } overflow-hidden bg-gray-600 rounded-full`}
    >
      <span
        className={`${size === 'small' ? 'text-xs' : 'text-lg'}  text-gray-300`}
      >
        {name[0]}
      </span>
    </div>
  );
}
