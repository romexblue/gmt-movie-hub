# IMDB Coding Challenge

## **Overview**
This project is an **IMDB-style movie search app** built using **Next.js**. It allows users to:
- Search for movies and TV shows by title.
- View a list of search results.
- Click on a movie or TV show to view detailed information on a separate page.
- Enjoy a responsive, performant, and user-friendly experience.

## **Tech Stack**
- **Frontend & Backend**: Next.js (React + Node.js API routes)
- **Styling**: Tailwind CSS
- **State Management & Caching**: React Query
- **API Source**: [The Movie Database (TMDB)](https://www.themoviedb.org/)

## **Setup Instructions**

### **Prerequisites**
- Node.js (Latest LTS recommended)
- NPM or Yarn

### **Installation**
1. Clone the repository:
   ```sh
   git clone <your-repo-link>
   cd <your-repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   TMDB_LINK=<your_tmdb_api_base_url>
   TMDB_API_KEY=<your_tmdb_api_key>
   NEXT_PUBLIC_TMDB_IMAGE_LINK="https://image.tmdb.org/t/p/w500"
   ```
4. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## **Features**
- **Movie & TV Show Search**: Users can search for both movies and TV shows.
- **Detailed View**: Click on a movie or TV show to view additional details such as release date, synopsis, cast, director, rating, genre, runtime, and poster.
- **Pagination**: Results are paginated for better performance and user experience.
- **Caching**: Implemented using React Query to optimize API calls.
- **Loading Animations**: Animations for loading states.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

## **Limitations**
- **API Restrictions**: Data is sourced from TMDB, and the availability of results depends on their API limitations.
- **No User Authentication**: This implementation does not include user authentication or personalized features.

## **Stretch Goals Implemented**
✅ **Pagination**: Implemented for search results to enhance performance.
✅ **Caching**: Utilized React Query to minimize redundant API calls.
✅ **Loading Animations**: Loading animations while waiting for API calls.
✅ **Responsive Design**: Ensures a seamless experience across devices.
✅ **TV Shows Support**: Users can also search and view details for TV shows.

## **Future Enhancements**
- **User Authentication**: Allow users to save favorite movies.
- **Infinite Scroll**: Improve search result browsing experience.
- **Skeleton Loaders**: Add skeleton loaders for the cards.

## **Author**
Developed by **Gerome**

## **License**
This project is open-source and free to use.

