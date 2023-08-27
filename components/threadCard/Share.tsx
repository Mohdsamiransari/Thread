'use client'

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon

} from 'next-share';
interface Props {
    threadId: string
}
function Share({ threadId }: Props) {

    const url = `https://thread-omega.vercel.app/thread/${threadId}`
    return (
        <Dialog>
            <DialogTrigger>
                <Image
                    src="/assets/share.svg"
                    alt="share"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-6">Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription className="flex flex-row gap-3">
                        <FacebookShareButton
                            url={url}
                            quote={'next-share is a social share buttons for your next React apps.'}
                            hashtag={'#nextshare'}
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <WhatsappShareButton
                            url={url}
                        >
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <LinkedinShareButton
                            url={url}
                        >
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default Share;