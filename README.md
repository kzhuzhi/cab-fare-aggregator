# Cab Fare Aggregator

An application that aggregates real-time ride fare estimates from multiple cab providers in Singapore. 
Enter a start and end destination to get a comparison of fares across providers like **Grab** and **Tada**. 

Future support planned for **Gojek**, **ComfortDelGro**, and others.

---

## Features

- Input start and end locations (text or map based)
- Compare fare estimates from multiple providers
- Show ride types, ETAs, peak pricing, and more
- Optional filters (ride type, ETA, provider preferences)

---

## Tech Stack

Backend: Node.js (API logic), Python (scraping/data)     
Frontend: React (or Vue/Next.js for SSR)                  
Database: Mariadb                            
Scraping: Python (BeautifulSoup, Selenium, Puppeteer)  
Maps: Google Maps API or Mapbox                       

---

### Grab
- Official API available: [Grab Developer Documentation](https://developer.grab.com/docs/partner-farefeed)

### Tada
-  No public developer portal: Will use web scraping or reverse engineering of mobile/web app requests  

---

## User Flow

1. User inputs start and destination locations
2. Backend geocodes locations to latitude/longitude
3. Fare requests are made concurrently to all supported providers
4. Backend aggregates, normalizes, and sends data to the frontend
5. Frontend displays comparative results with fare, ETA, ride type, etc.

---

## MVP Scope

- Providers: Grab + Tada only
- Location input via text
- Basic fare display and comparison
- Responsive web interface
- No login or user persistence required initially

