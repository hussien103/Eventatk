import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateEventAction } from "../../redux/slices/events"

const UpdateEventDialog = ({ open, onClose, event }) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    capacity: "",
    category: "",
    image: "",
  })

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        date: event.date || "",
        time: event.time || "",
        location: event.location || "",
        price: event.price || "",
        capacity: event.capacity || "",
        category: event.category || "",
        image: event.image || "",
      })
    }
  }, [event])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!event?.id) return

    dispatch(
      updateEventAction({
        id: event.id,
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        availableTickets: Number(form.capacity),
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
          <Input name="title" value={form.title} onChange={handleChange} />
          <Input name="date" type="date" value={form.date} onChange={handleChange} />

          <Input name="time" type="time" value={form.time} onChange={handleChange} />
          <Input name="location" value={form.location} onChange={handleChange} />

          <Input name="price" type="number" value={form.price} onChange={handleChange} />
          <Input name="capacity" type="number" value={form.capacity} onChange={handleChange} />

          <Input name="category" value={form.category} onChange={handleChange} className="col-span-2" />
          <Input name="image" value={form.image} onChange={handleChange} className="col-span-2" />

          <Textarea
            name="description"
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