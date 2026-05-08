import { useState } from "react"
import { useDispatch } from "react-redux"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { addEventAction } from "../../redux/slices/events"

const CreateEventDialog = ({ open, onClose }) => {
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    title: { en: "" },
    description:{en: ""},
    date: "",
    time: "",
    location: "",
    price: "",
    capacity: "",
    category:  "",
    image: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    dispatch(
      addEventAction({
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        availableTickets: Number(form.capacity),
      })
    )

    onClose()

    setForm({
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
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black text-white border-white/10 max-w-2xl">

        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
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
            Create
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default CreateEventDialog