
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LikeThread from "../shared/LikeThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { isLikedThread } from "@/lib/actions/thread.actions";
import Share from "../threadCard/Share";
import Repost from "../threadCard/Repost";
import Delete from "../threadCard/Delete";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    };
    community: { id: string, name: string, image: string } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        };
    }[];
    isComment?: boolean;
}

const ThreadCard = async ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
}: Props) => {
    const userInfo = await fetchUser(currentUserId)
    const liked = await isLikedThread(id, userInfo?._id);

    return (
        <article
            className={`flex w-full flex-col rounded-xl  mt-7 ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
                }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex flex-1 w-full flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image
                                src={author.image}
                                alt="Profile Image"
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>
                        <div className="thread-card_bar" />
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor.pointer text-base-semibold text-light-1">
                                {author.name}
                            </h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2">{content}</p>
                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                            <div className="flex gap-3.5">
                                <LikeThread
                                    threadId={id}
                                    userId={userInfo._id}
                                    liked={liked}
                                />
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src="/assets/reply.svg"
                                        alt="reply"
                                        width={24}
                                        height={24}
                                        className="cursor-pointer object-contain"
                                    />
                                </Link>
                                <Repost content={content} userId={userInfo._id} />
                                <Share threadId={id} />
                            </div>
                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-2 items-center mt-5 ml-2.5">

                {/* TODO: Delete Thread  */}
                
                <Delete threadId={id} userId={currentUserId}/>
                {/* TODO: SHow Comment logos */}

                {!isComment && community && (
                    <Link href={`/communities/${community.id}`} className=" flex items-center">
                        <p className="text-subtle-medium text-gray-1">
                            {formatDateString(createdAt)} - {community.name} Community
                        </p>
                        <Image
                            src={community.image}
                            alt={community.name}
                            width={14}
                            height={14}
                            className="rounded-full ml-1 object-cover"
                        />

                    </Link>
                )}
            </div>

        </article>
    );
};

export default ThreadCard;
