import { configureStore } from "@reduxjs/toolkit";
import EventsReducer from "./slices/events"
import TicketsReducer from "./slices/tickets"


const store = configureStore({
    reducer: {

        events: EventsReducer,
        tickets: TicketsReducer
    }
})
export default store;