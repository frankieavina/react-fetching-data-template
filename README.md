# Getting started with React by building a Pokemon search application

In this application I show different ways about fecthing information from an api. Some are better then others just depeds on the use case. From my expirence React Query has been the best more effective way to fetch/retrieve data so I will be talking about how to set up later.

## How to run this project

```
npm install
npm run start
```

## How to set up React Query

To set up React Query to fetch data from an API in your React app, you'll need to install the library and configure it to manage your data fetching effectively. Here's a step-by-step guide to get started:

1. Install react query
```
npm install @tanstack/react-query
```
2. Set Up React Query Provider
To use React Query in your app, wrap your app's component tree with the QueryClientProvider. This ensures that all components can access React Query functionality.

![Screenshot 2024-10-21 at 1 37 04 PM](https://github.com/user-attachments/assets/a963db2e-0fd3-4314-85bc-911cf4671ac3)

4. Fetching Data with useQuery Hook
To fetch data from an API, you'll use the useQuery hook.
useQuery takes two arguments:
* Query Key: a unique identifier for the query
* Fetcher function: function that performs the data fetching
State provided by useQuery:
* data: contaings api data that was successfully fetched
* isLoading: boolean the indicated wheater the data is being fetched
* error: object that contains any error during the fetch

![Screenshot 2024-10-21 at 1 38 14 PM](https://github.com/user-attachments/assets/f9b9f12c-f92c-4333-a3a2-0b4d9b11b997)
