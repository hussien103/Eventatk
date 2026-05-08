import { getEventsAction } from "@/redux/slices/events"
import { getTicketsAction } from "@/redux/slices/tickets"
import { useMemo ,useEffect} from "react"
import { useSelector,useDispatch } from "react-redux"

export default function OrganizerDashboard() {
    const dispatch = useDispatch()
  const { events } = useSelector((state) => state.events)

  const { tickets } = useSelector((state) => state.tickets)
    useEffect(() => {
      if (events.length === 0) {
        dispatch(getEventsAction())
      }
      if(tickets.length ===0){
        dispatch(getTicketsAction())
      }
    }, [dispatch, events.length,tickets.length])
    
  const stats = useMemo(() => {
    const recentTickets = [...tickets]
    .sort(
        (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 3)
    const totalEvents = events.length

    const totalTicketsSold = tickets.length

    const totalRevenue = tickets.reduce((total, ticket) => {

      const event = events.find(
        (event) => event.id === ticket.eventId
      )

      return total + (event?.price || 0)

    }, 0)

    const upcomingEvents = events.filter(
      (event) => new Date(event.date) >= new Date()
    ).length

    return {
      totalEvents,
      totalTicketsSold,
      totalRevenue,
      upcomingEvents,
      recentTickets
    }

  }, [events, tickets])

  const recentEvents = events.map((event) => {

    const sold =
      event.capacity - event.availableTickets

    const revenue = sold * event.price

    return {
      ...event,
      sold,
      revenue,
    }
  })

  const topEvents = [...recentEvents]
    .sort((a, b) => b.sold - a.sold).slice(0, 3)
    .filter((event)=>{
       if(event.capacity-event.availableTickets > 0){
        return event
       }
    })

    console.log("reecent tickets" + stats.recentTickets)
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Organizer Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your events, tickets, and revenue.
            </p>
          </div>

          <button className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:opacity-90 transition">
            + Create Event
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <p className="text-gray-400 text-sm mb-2">
              Total Events
            </p>

            <h2 className="text-4xl font-bold">
              {stats.totalEvents}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <p className="text-gray-400 text-sm mb-2">
              Tickets Sold
            </p>

            <h2 className="text-4xl font-bold">
              {stats.totalTicketsSold}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <p className="text-gray-400 text-sm mb-2">
              Revenue
            </p>

            <h2 className="text-4xl font-bold">
              ${stats.totalRevenue.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <p className="text-gray-400 text-sm mb-2">
              Upcoming Events
            </p>

            <h2 className="text-4xl font-bold">
              {stats.upcomingEvents}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                Event Performance
              </h2>

              <button className="text-sm text-gray-400 hover:text-white transition">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-sm">
                    <th className="pb-3 font-medium">Event</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Sold</th>
                    <th className="pb-3 font-medium">Revenue</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-4">
                        <div>
                          <p className="font-medium">
                            {event.title.en}
                          </p>

                          <p className="text-sm text-gray-400">
                            Capacity: {event.capacity}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 text-gray-300">
                        {event.category.en}
                      </td>

                      <td className="py-4">
                        <div>
                          <p>
                            {event.sold}
                          </p>

                          <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                            <div
                              className="bg-white h-2 rounded-full"
                              style={{
                                width: `${(event.sold / event.capacity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        ${event.revenue.toLocaleString()}
                      </td>

                      <td className="py-4 text-gray-300">
                        {event.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-5">
                Top Events
              </h2>

              <div className="space-y-4">
                {topEvents.map((event, index) => (
                  <div
                    key={event.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-medium text-sm">
                          {event.title.en}
                        </p>

                        <p className="text-gray-400 text-xs">
                          {event.capacity - event.availableTickets} tickets sold
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            

<div className="bg-white/5 border border-white/10 rounded-2xl p-6">

  <h2 className="text-2xl font-semibold mb-5">
    Recent Activity
  </h2>

  <div className="space-y-4 text-sm">

    {stats.recentTickets.map((ticket, index) => {

      const event = events.find(
        (event) => event.id === ticket.eventId
      )

      return (
        <div
          key={ticket.id}
          className={`border-l-2 pl-4 ${
            index === 0
              ? "border-white"
              : "border-white/30"
          }`}
        >

          <p>
            Ticket purchased for{" "}
            <span className="font-medium">
              {event?.title.en || "Unknown Event"}
            </span>
          </p>

          <span className="text-gray-400 text-xs">
            {new Date(ticket.createdAt).toLocaleString()}
          </span>

        </div>
      )
    })}

    {stats.recentTickets.length === 0 && (
      <p className="text-gray-400">
        No recent ticket activity
      </p>
    )}

  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  )
}
