import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs , TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { profileTabs } from "@/contants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
const Page = async ({params}: {params: {id: string}}) => {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(params.id)
    if(!userInfo?.onboarded) redirect('/')

    console.log(userInfo.threads.length);
    

    return (
        <section>
            <ProfileHeader 
                accountId ={userInfo.id}
                authUserId ={user.id}
                name={userInfo.name}
                username ={userInfo.username}
                imgUrl = {userInfo.image}
                bio ={ userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tabs)=>(
                            <TabsTrigger key={tabs.label} value={tabs.value} className="tab">
                                <Image
                                    src={tabs.icon}
                                    alt={tabs.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden w-full">{tabs.label}</p>

                                {tabs.label === 'Threads' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-1">
                                        {userInfo?.Threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}

                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default Page

