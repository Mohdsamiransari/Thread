'use client'

import Image from 'next/image'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { repostThread } from '@/lib/actions/thread.actions'
import { useOrganization } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'


function Repost({ content, userId }: { content: string, userId: string }) {
    const { organization } = useOrganization()
    const router = useRouter();
    const pathname = usePathname();

    const [dialogOpen, setDialogOpen] = useState(true);


    const handleRepost = async () => {
        await repostThread({
            text: content,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        })
        setDialogOpen(false); 
    }
    return (
        <Dialog>
            <DialogTrigger>
                <Image
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
            </DialogTrigger>

            {dialogOpen && (
                <DialogContent>
                    <DialogHeader className='flex flex-row gap-4 items-center'>
                        <DialogTitle >Are you sure?</DialogTitle>
                        <DialogDescription >
                            <Button onClick={handleRepost} className='bg-primary-500' >Repost</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default Repost;