import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"

import { addTicketAction } from "@/redux/slices/tickets"
import {  getEventsAction, updateEventAction } from "@/redux/slices/events"

const Success = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const { events } = useSelector((state) => state.events)

  useEffect(() => {
    const createTicket = async () => {
      console.log('tesst')
      const sessionId = searchParams.get("session_id")

      if (!sessionId) return

      const res = await fetch(
        `http://localhost:5000/checkout-session/${sessionId}`
      )

      const data = await res.json()

      const eventId = data.metadata?.eventId
      const event = events.find(
        (e) => {
        
          console.log(e)
          return e.id === eventId

        }
      )

      if (!event) return

      const ticket = {
        userId: data.metadata.userId,
        userEmail: data.metadata.userEmail,
        eventId: eventId,
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
      }

      await dispatch(addTicketAction(ticket))

      const updatedEvent = {
        ...event,
        availableTickets:
          event.availableTickets - 1,
      }

      await dispatch(updateEventAction(updatedEvent))

      navigate("/attendee/tickets")
    }
    dispatch(getEventsAction())

    if (events.length > 0) {
      createTicket()
    }
  }, [events])

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Processing payment...
    </div>
  )
}

export default Success