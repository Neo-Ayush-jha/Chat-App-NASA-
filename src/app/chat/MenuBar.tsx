import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";

interface MenuBarProps {
    onUserMenuClick: () => void,
}
export default function ManuBar({ onUserMenuClick }: MenuBarProps) {
    return (
        <div className="p-3 flex item-center justify-between gap-3 bg-white border-e border-e-[#DBDDE1] bg-white p-3">
            <UserButton afterSignOutUrl="/" />
            <div className="flex gap-6 ">
                <span className="Show users">
                    <Users className="cursor-pointer" onClick={onUserMenuClick} />
                </span>
            </div>
        </div>
    )
}