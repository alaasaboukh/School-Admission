import TopComponent from "@/components/Nested/TopComponent";
import ChatPage from "@/components/Chats/Chat";

const Page = () => {
    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full min-h-screen">
            <TopComponent text="Chat" />
            <ChatPage />
        </div>
    );
};

export default Page;