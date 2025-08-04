import React, { useState } from "react";

const mockGroups = [
  { id: 1, name: "Developers Team", members: 12 },
  { id: 2, name: "Marketing", members: 8 },
  { id: 3, name: "Design Crew", members: 5 },
];

const GroupsPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(mockGroups[0]);

  return (
    <div className="min-h-screen bg-gray-3 dark:bg-boxdark p-6 w-full">
      <div className="bg-white dark:bg-boxdark-2 rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-3 h-full ">
        
        {/* Left Panel: Group List */}
        <div className="border-r border-stroke dark:border-strokedark p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-stroke pb-6">
            <h2 className="text-xl font-semibold text-black dark:text-white">Your Groups</h2>
            <button className="bg-primary text-white px-3 py-1.5 rounded text-sm hover:bg-primary/90">
              + New
            </button>
          </div>

          <ul className="space-y-2">
            {mockGroups.map((group) => (
              <li
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`p-3 rounded cursor-pointer ${
                  selectedGroup?.id === group.id
                    ? "bg-primary text-white"
                    : "bg-gray-2 dark:bg-boxdark hover:bg-gray-100 dark:hover:bg-boxdark-2 text-black dark:text-white"
                }`}
              >
                <div className="font-medium">{group.name}</div>
                <div className="text-sm text-bodydark">{group.members} members</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel: Group Details */}
        <div className="col-span-2 p-6">
          {selectedGroup ? (
            <>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 border-b border-stroke pb-6 ">
                {selectedGroup.name}
              </h3>
              <p className="text-body dark:text-bodydark mb-2">
                Group ID: <span className="font-medium">{selectedGroup.id}</span>
              </p>
              <p className="text-body dark:text-bodydark">
                Total members: <span className="font-medium">{selectedGroup.members}</span>
              </p>
              {/* You can add chat, settings, or members list here */}
            </>
          ) : (
            <p className="text-body dark:text-bodydark">Select a group to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
