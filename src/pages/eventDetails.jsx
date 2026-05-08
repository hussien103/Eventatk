import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"

import {
  deleteEventAction,
} from "../redux/slices/events"
import LanguageSwitcher from "@/components/languageSwitcher"

const EventDetailsPage = () => {

  const { id } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { t, i18n } = useTranslation()

  const { user } = useUser()

  const role = user?.unsafeMetadata?.role
  const isLoggedIn = !!role

  const isOrganizer = role === "organizer"

  const { events, isLoading, error } = useSelector(
    (state) => state.events
  )

  const event = events.find(
    (e) => e.id === id
  )

  const buyTicket = async (event) => {

    const res = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          eventId: event.id,

          title:
            event.title?.[i18n.language] ,

          eventDate: event.date,

          eventLocation:
            event.location?.[i18n.language] ,

          price: event.price,

          userId: user.id,

          userEmail:
            user.primaryEmailAddress?.emailAddress,
        }),
      }
    )

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    }
  }

  const handleDelete = async () => {
    await dispatch(deleteEventAction(event.id))
    navigate("/events")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        {t("event.loading")}
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {t("event.failed")}
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {t("event.notFound")}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white p-6">

      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />

      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto">
        <LanguageSwitcher />
        <div className="rounded-xl overflow-hidden mb-6 shadow-lg">

          <img
            src={
              event.image ||
              "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200"
            }

            alt={
              event.title?.[i18n.language] 
            }

            className="w-full h-[300px] object-cover"
          />
        </div>

        <h1 className="text-4xl font-bold mb-2">

          {event.title?.[i18n.language] }

        </h1>

        <div className="text-gray-400 mb-4 flex gap-4 flex-wrap">

          <span>
            📅{" "}
            {new Date(event.date).toLocaleDateString(
              i18n.language
            )}
          </span>

          <span>
            ⏰ {event.time}
          </span>

          <span>
            📍{" "}
            {event.location?.[i18n.language] }
          </span>

        </div>

        <p className="text-gray-300 mb-6">

          {event.description?.[i18n.language] }

        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">

          <p>
            💰 {t("event.price")}:

            <span className="text-white">
              {" "}

              {new Intl.NumberFormat(
                i18n.language,
                {
                  style: "currency",
                  currency: "USD",
                }
              ).format(event.price)}

            </span>
          </p>

          <p>
            🎟️ {t("event.availableTickets")}:
            {" "} {event.availableTickets}
          </p>

          <p>
            👥 {t("event.capacity")}:
            {" "} {event.capacity}
          </p>

          <p>
            🏷️ {t("event.category")}:

            {" "}

            {event.category?.[i18n.language] }

          </p>

        </div>

        <div className="flex gap-3">

          {isOrganizer && (
            <>
              <Button
                variant="secondary"
              >
                {t("event.edit")}
              </Button>

              <Button
                onClick={handleDelete}
                variant="destructive"
              >
                {t("event.delete")}
              </Button>
            </>
          )}

          {!isOrganizer && isLoggedIn && (
            <Button
              onClick={() => buyTicket(event)}
            >
              {t("event.book")}
            </Button>
          )}

        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage