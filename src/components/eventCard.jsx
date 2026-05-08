import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const EventCard = ({ event, role, onEdit, onDelete, onPay }) => {
  const navigate = useNavigate()

  const isOrganizer = role === "organizer"
  const isLoggedIn = !!role

  const handleCardClick = () => {
    navigate(`${event.id}`)
  }

  const handleDetailsClick = (e) => {
    e.stopPropagation()
    navigate(`${event.id}`)
  }

  const handlePayClick = (e) => {
    e.stopPropagation()
    onPay(event)
  }

  const handleEditClick = (e) => {
    e.stopPropagation()
    onEdit(event)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onDelete(event)
  }

  return (
    <Card
      onClick={handleCardClick}
      className="bg-white/5 border-white/10 backdrop-blur text-white overflow-hidden hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200"
          }
          alt={event.title.en}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          {event.title.en}
          <span className="text-xs text-gray-300">{event.date}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {event.description.en}
        </p>

        <p className="text-sm text-gray-400 mb-4">
          💰 Price:{" "}
          <span className="text-white font-semibold">
            ${event.price}
          </span>
        </p>

        

        {isLoggedIn && !isOrganizer && (
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleDetailsClick} variant="secondary">
              Details
            </Button>

            <Button onClick={handlePayClick}>
              Pay Ticket
            </Button>
          </div>
        )}

        {isLoggedIn && isOrganizer && (
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleEditClick} variant="secondary">
              Edit
            </Button>

            <Button onClick={handleDeleteClick} variant="destructive">
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default EventCard