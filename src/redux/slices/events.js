import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getEventsAction = createAsyncThunk(
    "events/getAllEvents",
    async() => {
        const res = await axios.get("http://localhost:3000/events");
        return res.data;
    }
);
export const addEventAction = createAsyncThunk(
    "events/addEvent",
    async(event) => {
        event.title = { en: event.title, ar: "منتظر ترجمة جوجل" }
        event.description = { en: event.description, ar: "منتظر ترجمة جوجل" }
        event.location = { en: event.location, ar: "منتظر ترجمة جوجل" }
        event.category = { en: event.category, ar: "منتظر ترجمة جوجل" }
        const res = await axios.post("http://localhost:3000/events", event);
        return res.data;
    }
);

export const deleteEventAction = createAsyncThunk(
    "events/deleteEvent",
    async(id) => {
        const res = await axios.delete(`http://localhost:3000/events/${id}`);
        return res.data;
    }
);

export const updateEventAction = createAsyncThunk(
    "events/updateEvent",
    async(event) => {

        const res = await axios.put(
            `http://localhost:3000/events/${event.id}`,
            event
        );
        return res.data;
    }
);

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
        error: false,
        isLoading: true,
    },

    extraReducers: (builder) => {
        builder

            .addCase(getEventsAction.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })

        .addCase(getEventsAction.fulfilled, (state, action) => {
            state.events = action.payload;
            state.isLoading = false;
        })

        .addCase(getEventsAction.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
            state.events = [];
        })

        .addCase(addEventAction.fulfilled, (state, action) => {
            state.events.push(action.payload);
        })

        .addCase(deleteEventAction.fulfilled, (state, action) => {
            state.events = state.events.filter(
                (event) => event.id !== action.payload.id
            );
        })

        .addCase(updateEventAction.fulfilled, (state, action) => {
            state.events = state.events.map((event) =>
                event.id === action.payload.id ? action.payload : event
            );
        });
    },
});

export default eventsSlice.reducer;