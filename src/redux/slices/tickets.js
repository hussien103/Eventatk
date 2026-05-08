import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getTicketsAction = createAsyncThunk(
    "tickets/getAllTickets",
    async() => {
        const res = await axios.get("http://localhost:3000/tickets");
        return res.data;
    }
);

export const addTicketAction = createAsyncThunk(
    "tickets/addTicket",
    async(ticket) => {
        const res = await axios.post("http://localhost:3000/tickets", ticket);
        return res.data;
    }
);

export const deleteTicketAction = createAsyncThunk(
    "tickets/deleteTicket",
    async(id) => {
        const res = await axios.delete(`http://localhost:3000/tickets/${id}`);
        return res.data;
    }
);

export const updateTicketAction = createAsyncThunk(
    "tickets/updateTicket",
    async(ticket) => {
        const res = await axios.put(
            `http://localhost:3000/tickets/${ticket.id}`,
            ticket
        );
        return res.data;
    }
);

const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        tickets: [],
        error: false,
        isLoading: true,
    },

    extraReducers: (builder) => {
        builder

            .addCase(getTicketsAction.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })

        .addCase(getTicketsAction.fulfilled, (state, action) => {
            state.tickets = action.payload;
            state.isLoading = false;
        })

        .addCase(getTicketsAction.rejected, (state) => {
            state.error = true;
            state.isLoading = false;
            state.tickets = [];
        })

        .addCase(addTicketAction.fulfilled, (state, action) => {
            state.tickets.push(action.payload);
        })

        .addCase(deleteTicketAction.fulfilled, (state, action) => {
            state.tickets = state.tickets.filter(
                (ticket) => ticket.id !== action.payload.id
            );
        })

        .addCase(updateTicketAction.fulfilled, (state, action) => {
            state.tickets = state.tickets.map((ticket) =>
                ticket.id === action.payload.id ? action.payload : ticket
            );
        });
    },
});

export default ticketsSlice.reducer;