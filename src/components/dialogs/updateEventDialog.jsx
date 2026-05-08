import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateEventAction } from "../../redux/slices/events"

const UpdateEventDialog = ({ open, onClose, event }) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    date: "",
    time: "",
    price: "",
    capacity: "",
    image: "",
  })

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title?.en || "",
        description: event.description?.en || "",
        location: event.location?.en || "",
        category: event.category?.en || "",
        date: event.date || "",
        time: event.time || "",
        price: event.price || "",
        capacity: event.capacity || "",
        image: event.image || "",
      })
    }
  }, [event])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    if (!event?.id) return

    dispatch(
      updateEventAction({
        id: event.id,

        title: {
          en: form.title,
          ar: event.title?.ar || "منتظر ترجمة جوجل",
        },

        description: {
          en: form.description,
          ar: event.description?.ar || "منتظر ترجمة جوجل",
        },

        location: {
          en: form.location,
          ar: event.location?.ar || "منتظر ترجمة جوجل",
        },

        category: {
          en: form.category,
          ar: event.category?.ar || "منتظر ترجمة جوجل",
        },

        date: form.date,
        time: form.time,
        price: Number(form.price),
        capacity: Number(form.capacity),
        availableTickets: Number(form.capacity),
        image: form.image,
      })
    )

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black text-white border-white/10 max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />

          <Input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
          />

          <Input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <Input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={handleChange}
          />

          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="col-span-2"
          />

          <Input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="col-span-2"
          />

          <Textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="col-span-2"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateEventDialog