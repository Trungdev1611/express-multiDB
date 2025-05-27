'use client'
import Navbar from "@/components/Navbar";

export default function MainLayout
    ({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <div>
            <div className="flex gap-x-2 bg-gray-100">
                <div className="w-[200px] h-full bg-white"><Navbar /></div>
                <div className="flex-1 bg-white ">{children}</div>
            </div>



        </div>
    );
}
