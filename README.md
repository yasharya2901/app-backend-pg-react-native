# Backend Server for PG Application
This is the backend server for the PG Application. It is built using Node.js and Express.js. It uses MongoDB as the database.

## Installation
1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Create a copy of the `.env.example` file and rename it to `.env` and fill in the details
4. Run `npm start` to start the server

## Routes
<table>

<tr>
<th>Route</th>
<th>Method</th>
<th>Description</th>
</tr>

<tr>
<td>/api/v1/menu</td>
<td>GET</td>
<td>Get all the menus</td>
</tr>

<tr>
<td>/api/v1/menu</td>
<td>POST</td>
<td>Create a new menu</td>
</tr>

<tr>
<td>/api/v1/menu/week</td>
<td>GET</td>
<td>Get all the menus for the current week</td>
</tr>

<tr>
<td>/api/v1/menu/today</td>
<td>GET</td>
<td>Get the menu for today</td>
</tr>
</table>

## Example
1. JSON body for POST `/api/v1/menu`
    ```json
    {
        "date": "20-07-2024 00:00:00",
        "day": "Saturday",
        "meals": [
            {
                "name": "Breakfast",
                "startTime": "20-07-2024 06:30:00",
                "endTime": "20-07-2024 09:00:00",
                "price": 2002,
                "mealItems": [
                    {
                        "name": "Chapati",
                        "type": "common"
                    },
                    {
                        "name": "Dal",
                        "type": "common"
                    },
                    {
                        "name": "Papaya",
                        "type": "common"
                    }
                ]
            },
            {
                "name": "Lunch",
                "startTime": "20-07-2024 06:30:00",
                "endTime": "20-07-2024 09:00:00",
                "price": 1234,
                "mealItems": [
                    {
                        "name": "Chhole",
                        "type": "veg"
                    },
                    {
                        "name": "Bhature",
                        "type": "common"
                    },
                    {
                        "name": "Egg Curry",
                        "type": "non-veg"
                    }
                ]
            }
        ]
    }
    ```
    NOTE: The date should be in the format `DD-MM-YYYY HH:mm:ss`. And, the first date should have the time as `00:00:00`.