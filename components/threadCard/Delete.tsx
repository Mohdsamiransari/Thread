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
import { deleteThread } from '@/lib/actions/thread.actions'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

function Delete ( { threadId, userId }: { threadId: string, userId: string } ) {
    const router = useRouter();
    const pathname = usePathname();
    const [dialogOpen, setDialogOpen] = useState(true);

    const handleDelete = async () =>{
        await deleteThread(threadId, pathname)
        setDialogOpen(false); 
    }

    return (
        <Dialog >
            <DialogTrigger className={pathname ===  `/profile/${userId}` ? "block" : "hidden"}>
                <Image
                    src="/assets/delete.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
            </DialogTrigger>
            {dialogOpen && (
                <DialogContent>
                    <DialogHeader className='flex flex-row gap-4 items-center'>
                        <DialogTitle >Are you absolutely sure?</DialogTitle>
                        <DialogDescription >
                            <Button onClick={handleDelete} className='bg-primary-500' >Delete</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            )}
        </Dialog>
    )
};

export default Delete;