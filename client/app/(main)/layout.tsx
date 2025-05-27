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
            <div className="flex gap-x-4 bg-gray-100">
                <div className="w-[200px] h-full bg-white border-red-300 border"><Navbar /></div>
                <div className="flex-1 bg-white  border border-green-400">{children}</div>
            </div>



        </div>
    );
}
