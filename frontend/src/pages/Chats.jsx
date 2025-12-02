import ChatBox from "../components/ChatBox";

export default function Chats({ selectedRole }) {
    return (
        <div className="flex flex-col h-full">
            <ChatBox selectedRole={selectedRole} />
        </div>
    );
}
