import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { getEventsAction } from "@/redux/slices/events"

const TicketCard = ({ ticket }) => {

  const dispatch = useDispatch()

  const { events } = useSelector(
    (state) => state.events
  )

  useEffect(() => {
    if (events.length === 0) {
      dispatch(getEventsAction())
    }
  }, [dispatch,events.length])

  const event = events.find(
    (event) => event.id === ticket.eventId
  )

  return (
    <Card className="bg-white/5 border border-white/10 text-white overflow-hidden">

      <CardContent className="p-5">

        <div className="flex items-start justify-between mb-4">

          <div>
            <h2 className="text-xl font-bold">
              {event?.title.en || "Unknown Event"}
            </h2>

            <p className="text-sm text-gray-400">
              Ticket ID: {ticket.id}
            </p>
          </div>

          <Badge className="bg-green-600 hover:bg-green-600">
            {ticket.paymentStatus}
          </Badge>
        </div>

        <div className="space-y-2 text-gray-300">

          <p>
            🎟️ Event ID:
            <span className="text-white">
              {" "} {ticket.eventId}
            </span>
          </p>

          <p>
            📧 Email:
            <span className="text-white">
              {" "} {ticket.userEmail}
            </span>
          </p>

          <p>
            📅 Purchased:
            <span className="text-white">
              {" "}
              {new Date(ticket.purchaseDate).toLocaleDateString()}
            </span>
          </p>

          {event && (
            <>
              <p>
                📍 Location:
                <span className="text-white">
                  {" "} {event.location.en}
                </span>
              </p>

              <p>
                ⏰ Time:
                <span className="text-white">
                  {" "} {event.time}
                </span>
              </p>
            </>
          )}

        </div>
      </CardContent>
    </Card>
  )
}

export default TicketCard