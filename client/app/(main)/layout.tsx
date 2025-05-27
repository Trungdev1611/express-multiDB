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
                <div className="w-1/5"><Navbar /></div>
                <div className="flex-1 bg-white ">{children}</div>
            </div>



        </div>
    );
}
