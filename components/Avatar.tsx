import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import useUser from '@/hooks/useUser';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onCLick = useCallback(
    (e: any) => {
      e.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full
        transition
        cursor-pointer
        relative
        `}
    >
      <Image
        layout="fill"
        style={{ objectFit: 'cover', borderRadius: '100%' }}
        alt="Avatar"
        onClick={onCLick}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
};

export default Avatar;
