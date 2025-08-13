import Notifications from "@/components/Notifications";
import TopComponent from "@/components/TopComponent";

const LastestActivityPage = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full h-[100vh]">
            <TopComponent text={"Notification & Lastest Activity"} />
            <Notifications />
        </div>
    );
};

export default LastestActivityPage;