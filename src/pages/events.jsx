import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import EventCard from "@/components/EventCard"
import { Button } from "@/components/ui/button"
import CreateEventDialog from "@/components/dialogs/createEventDialog"
import UpdateEventDialog from "@/components/dialogs/updateEventDialog"

import { useUser } from "@clerk/clerk-react"

import {
  getEventsAction,
  deleteEventAction,
} from "../redux/slices/events"

const EventsPage = () => {
  const { user,isLoaded } = useUser()

  const role = user?.unsafeMetadata?.role
  const isOrganizer = role === "organizer"

  const dispatch = useDispatch()

  const { events, loading, error } = useSelector(
    (state) => state.events
  )

  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    dispatch(getEventsAction())
  }, [dispatch])

  const handleAdd = () => setOpenCreate(true)

  const handleEdit = (event) => {
    setSelectedEvent(event)
    setOpenEdit(true)
  }

  const handleDelete = (event) => {
    dispatch(deleteEventAction(event.id))
  }

  const handleView = (event) => {
    alert("View " + event.title.en)
  }

  const handlePay = (event) => {
    alert("Pay for " + event.title.en)
  }
if (!isLoaded) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-400">
      Loading...
    </div>
  )
}
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />

      <div className="relative p-6 max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Events</h1>

            <p className="text-gray-400 text-sm mt-1">
              Discover and manage events
            </p>
          </div>

          {isOrganizer && (
            <Button
              onClick={handleAdd}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              + Create Event
            </Button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : error ? (
          <p className="text-red-500">Failed to load events</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                role={role}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onPay={handlePay}
              />
            ))}
          </div>
        )}
      </div>

      <CreateEventDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />

      <UpdateEventDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        event={selectedEvent}
      />
    </div>
  )
}

export default EventsPage