import React from "react"

const TeamCard = ({ name, members }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg my-2">
      <div className="">
        <div className="font-bold text-center text-xl mb-2 bg-gray-100 py-2">{name}</div>
        <ul className="text-grey-darker text-base">
          {members.map((member) => (
            <li className="odd:bg-gray-50 py-1 px-2">{member.email}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TeamCard
