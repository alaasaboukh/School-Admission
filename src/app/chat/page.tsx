import TopComponent from "@/components/TopComponent";
import ChatPage from "@/components/Chat";

const Page = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-[100vw] max-lg:h-[125vh]">
            <TopComponent text="Chat" />
            <ChatPage />
        </div>
    );
};

export default Page;