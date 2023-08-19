import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { communityTabs } from "@/contants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs , TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";

const Page = async ({params}: {params: {id: string}}) => {
    const user = await currentUser();
    if(!user) return null;


    const communityDetail = await fetchCommunityDetails(params.id)
    return (
        <section>
            <ProfileHeader 
                accountId ={communityDetail.id}
                authUserId ={user.id}
                name={communityDetail.name}
                username ={communityDetail.username}
                imgUrl = {communityDetail.image}
                bio ={ communityDetail.bio}
                type= "Community"
            />

            <div className="mt-9">
                <Tabs defaultValue="" className="w-full">
                    <TabsList className="tab">
                        {communityTabs.map((tabs)=>(
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
                                        {communityDetail?.Threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}

                    </TabsList>
                        <TabsContent  value="threads" className="w-full text-light-1">
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetail._id}
                                accountType="Community"
                            />
                        </TabsContent>
                        <TabsContent  value="members" className="w-full text-light-1">
                            <section className="mt-9 flex flex-col gap-10">
                                {communityDetail?.members.map((member: any)=>(
                                    <UserCard
                                        key={member.id}
                                        id={member.id}
                                        name={member.name}
                                        username={member.username}
                                        imgUrl={member.image}
                                        personType="User"
                                    />
                                ))}
                            </section>
                        </TabsContent>
                        <TabsContent  value="requests" className="w-full text-light-1">
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetail._id}
                                accountType="User"
                            />
                        </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default Page

