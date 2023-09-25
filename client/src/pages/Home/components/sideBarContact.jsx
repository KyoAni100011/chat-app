import CardContact from "./cardContact";

export default function SideBarContact({ contact }) {
  return (
    <div className="w-80 bg-white">
      <div className="title h-16 py-4 px-3 border-b border-r border-gray-200">
        <h1 className="text-2xl font-bold tracking-wider">Messages</h1>
      </div>
      <div className="messages-container overflow-y-scroll border-r border-gray-200">
        {contact?.map((item) => (
          <CardContact
            avatar={item.avatar}
            key={item.id}
            id={item.id}
            username={item.username}
            message={item.message}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
