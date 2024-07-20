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

<tr>
<td>/api/v1/user</td>
<td>POST</td>
<td>Create a new user</td>
</tr>

<tr>
<td>/api/v1/user</td>
<td>GET</td>
<td>Get all Users</td>
</tr>

<tr>
<td>/api/v1/user/:id</td>
<td>GET</td>
<td>Get user with that id</td>
</tr>

<tr>
<td>/api/v1/user/:id</td>
<td>DELETE</td>
<td>Delete user with that id</td>
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
2. JSON body for POST `/api/v1/user/`
    ```json
    {
        "name": "Charlie Brown",
        "phoneNumber": "3456789012",
        "alternatePhone": "2987654321",
        "roomNumber": "303",
        "address": {
            "addressLine1": "101 Pine St",
            "addressLine2": "",
            "city": "Sample City",
            "state": "Sample State",
            "pincode": "456456",
            "country": "Sample Country"
        },
        "foodPreference": "veg",
        "foodStatus": "opt-in",
        "userType": "admin"
        }

    
    ```
    
    

## NOTEs

1. **Date Format**:
   - All dates must be in the format `DD-MM-YYYY HH:mm:ss`.
   - The initial date should have the time set to `00:00:00`.

2. **Meal Items**:
   - The `type` in `mealItems` can be one of the following:
     - `common`
     - `veg`
     - `non-veg`

3. **Food Preference**:
   - The `foodPreference` field is an enum with the following values:
     - `veg`
     - `non-veg`

4. **Food Status**:
   - The `foodStatus` field is an enum with the following values:
     - `opt-in`
     - `opt-out`

5. **User Type**:
   - The `userType` field is an enum with the following values:
     - `user`
     - `staff`
     - `admin`