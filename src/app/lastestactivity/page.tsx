import Notifications from "@/components/Details/Notifications";
import TopComponent from "@/components/Nested/TopComponent";

const LastestActivityPage = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full min-h-screen">
            <TopComponent text="Notification & Lastest Activity" />
            <Notifications />
        </div>
    );
};

export default LastestActivityPage;