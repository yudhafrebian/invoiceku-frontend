"use client"
import { useAppSelector } from "@/app/hook"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const SideBarAvatar = () => {
    const user = useAppSelector((state) => state.authState);
    return (
        <Avatar>
            <AvatarImage src={user.profile_img || ""} />
            <AvatarFallback>{user.first_name[0]}</AvatarFallback>
        </Avatar>
    )
}

export default SideBarAvatar