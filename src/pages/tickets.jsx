import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUser } from "@clerk/clerk-react"

import TicketCard from "@/components/TicketCard"

import { getTicketsAction } from "@/redux/slices/tickets"

const TicketsPage = () => {

  const dispatch = useDispatch()

  const { user } = useUser()


  

  const { tickets, isLoading, error } = useSelector(
    (state) => state.tickets
  )



  useEffect(() => {
    dispatch(getTicketsAction())
  }, [dispatch])

  
  const myTickets = tickets.filter(
    (ticket) => ticket.userId === user?.id
  )

 
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-black">
        Loading tickets...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-black">
        Failed to load tickets
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Tickets
        </h1>

        {myTickets.length === 0 ? (
          <div className="text-gray-400">
            No tickets purchased yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {myTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
              />
            ))}

          </div>
        )}
      </div>
    </div>
  )
}

export default TicketsPage