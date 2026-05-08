import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/layout'
import LandingPage from './pages/landing'

import { ThemeProvider } from './components/ui/theme-provider'
import EventsPage from './pages/events'
import EventDetailsPage from './pages/eventDetails'
import AuthRedirect from './pages/authRedirect'
import SetRole from './pages/setRole'
import Failed from './pages/paymentFailed'
import Success from './pages/paymentSuccess'
import { Provider } from "react-redux";
import store from './redux/store'
import TicketsPage from './pages/tickets'
import OrganizerDashboard from './pages/organizerDashboard'
import NotFoundPage from './pages/notFound'


function App() {
  return (
    <ThemeProvider>
     
     <Provider store ={store}>
    <Router>
       <AuthRedirect />   
        
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="set-role" element={<SetRole />} />


          <Route path="organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="organizer/events" element={<EventsPage />} />
          <Route path="organizer/events/:id" element={<EventDetailsPage />} />

          
          <Route path="attendee/tickets" element={<TicketsPage />} />
          <Route path="attendee/events" element={<EventsPage />} />
          <Route path="attendee/events/:id" element={<EventDetailsPage />} />

          <Route path="paymentSuccess" element={<Success />} />
          <Route path="paymentFailed" element={<Failed />} />
          <Route path="*" element={<NotFoundPage/>}/>

        </Route>
      </Routes>
    </Router>
    </Provider> 
    </ThemeProvider>
  )
}

export default App

