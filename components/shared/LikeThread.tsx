'use client'

import Image from "next/image";
import { addLikeToThread, removeLikeFromThread, isLikedThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";



interface Props {
  threadId: string;
  userId: string;
  liked: boolean
}


function LikeThread({ threadId, userId, liked }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const likeThread = async () => {
    await addLikeToThread(threadId, userId, pathname);
  };

  const unlikeThread = async () => {
    await removeLikeFromThread(threadId, userId, pathname);
  };


  const handleLikeClick = async () => {
    if (liked) {
      await unlikeThread();
    } else {
      await likeThread();
    }
  };

  return (
    <Image
      src={liked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleLikeClick}
      aria-label={liked ? "Unlike" : "Like"}
    />
  );
};


export default LikeThread;
