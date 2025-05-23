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
            <div className="flex">
                <div className="w-1/5"><Navbar /></div>
                <div className="flex-1">{children}</div>
            </div>



        </div>
    );
}
