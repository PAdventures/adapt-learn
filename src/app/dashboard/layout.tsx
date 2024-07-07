import DashboardSideNavigationBar from "@/components/dashboard/navigation/SideNavBar.tsx";
import DashboardTopNavigationBar from "@/components/dashboard/navigation/TopNavBar.tsx";

interface DashboardLayoutParams {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutParams) {

	return (
        <section>
            <DashboardTopNavigationBar />
            <div className="h-[90vh] w-screen flex">
                <DashboardSideNavigationBar />
                {children}
            </div>
        </section>
    );
}