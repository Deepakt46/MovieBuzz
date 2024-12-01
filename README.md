
# MovieBuzz

**MovieBuzz** is a React Native application that allows users to explore and discover a wide variety of movies. It provides an intuitive and seamless user experience with rich movie data sourced from The Movie Database (TMDb) API and user authentication powered by Firebase.

---

## Features

- **Browse Movies**: Explore movies sorted by popular, top-rated, upcoming, and now-playing categories.
- **Search Functionality**: Search for movies by title or keyword.
- **Movie Details**: Access detailed information about movies, including release dates, overviews, and user ratings.
- **Language-Based Filtering**: Filter upcoming and trending movies based on user-selected languages.
- **Firebase Authentication**: Includes user login and signup functionalities.
- **Pagination for Trending Movies**: Infinite scrolling to load more trending movies efficiently.
- **Drawer Navigation**: 
  - Offers a **Logout** option for users.
  - Streamlined navigation experience with a side menu.
- **GetStarted Screen**: 
  - Displays only on the first launch after installation to provide an introductory overview.
- **Responsive Design**: Optimized for a consistent experience across devices.

---

## Getting Started

### Prerequisites

Ensure the following are set up:

- **Node.js** and **npm**
- **React Native CLI**
- Android Emulator or iOS Simulator (configured)

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Deepakt46/moviebuzz.git
   cd moviebuzz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

### Running the App

#### Start Metro Bundler

Run the following command in the root of the project:

```bash
npm start
```

#### Run on Android

```bash
npm run android
```

#### Run on iOS

```bash
npm run ios
```

---

## Component Architecture

### Splash Screen

- **Description**: Displays a brief animation during the app launch.
- **Purpose**: Enhances the visual appeal while initializing the app.

### Carousel for Upcoming Movies

- **Data Source**: `/movie/upcoming` (TMDb API).
- **Functionality**: Swipeable carousel showcasing posters of upcoming movies.

### FlatList for Trending Movies

- **Data Source**: `/trending/movie/day` (TMDb API).
- **Functionality**: Scrollable list with pagination for trending movies.

### Drawer Navigator

- **Functionality**: 
  - Houses the **Logout** option.
  - Enhances user accessibility with a side navigation menu.

### GetStarted Screen

- **Description**: 
  - Displayed only the first time the app is opened after installation.
  - Introduces the app's key features and functionalities.

---

## TMDb API Endpoints

- **Upcoming Movies**: `/movie/upcoming`
- **Trending Movies**: `/trending/movie/day`
- **Movie Search**: `/search/movie`
- **Movie Details**: `/movie/{id}`

---

## Key Features

1. **Infinite Scroll**: Load more movies as users scroll through the trending movies list.
2. **Bottom Tab Navigation**: Navigate between movie categories like upcoming and trending.
3. **Drawer Navigation**: Simplify access to logout and other features.
4. **Responsive Design**: A consistent experience across Android and iOS devices.
5. **GetStarted Screen**: Welcomes users with an introduction on their first launch.

---

## Troubleshooting

If you face issues during setup or while running the app, refer to the official [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

---

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Documentation](https://reactnative.dev)
- [TMDb API Documentation](https://developers.themoviedb.org/3/getting-started/introduction)
- [Firebase Documentation](https://firebase.google.com/docs)

---
